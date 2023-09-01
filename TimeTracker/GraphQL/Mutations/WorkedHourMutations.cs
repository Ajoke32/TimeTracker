using AutoMapper;
using GraphQL;
using GraphQL.Types;
using TimeTracker.Absctration;
using GraphQL.Validation;
using TimeTracker.GraphQL.Types.InputTypes.WorkedHourInput;
using TimeTracker.Models;
using TimeTracker.Models.Dtos;
using TimeTracker.Utils.Errors;
using TimeTracker.Enums;

namespace TimeTracker.GraphQL.Mutations;

public sealed class WorkedHourMutations : ObjectGraphType
{
    public WorkedHourMutations(IUnitOfWorkRepository uow, IMapper mapper)
    {
        Field<WorkedHour>("create")
            .Argument<WorkedHourInputType>("workedHour")
            .ResolveAsync(async ctx =>
            {
                var wh = ctx.GetArgument<WorkedHourInputDto>("workedHour");

                if (wh.Date.Date >= DateTime.UtcNow.Date
                && (wh.StartTime > TimeOnly.FromDateTime(DateTime.UtcNow)
                || wh.EndTime > TimeOnly.FromDateTime(DateTime.UtcNow)))
                {
                    throw new ValidationError("Can't create worked hour for future");
                }

                var exists = await uow.GenericRepository<WorkedHour>()
                            .FindAsync(p => p.Date.Date == wh.Date.Date 
                                        && p.UserId == wh.UserId 
                                        && p.StartTime < wh.EndTime 
                                        && wh.StartTime < p.EndTime);

                if (exists is not null)
                    throw new ValidationError("Worked hours intersect!");

                var created = await uow.GenericRepository<WorkedHour>()
                    .CreateAsync(mapper.Map<WorkedHour>(wh));

                await uow.SaveAsync();

                return created;
            });

        Field<int>("delete")
            .Argument<int>("id")
            .ResolveAsync(async ctx =>
            {
                var id = ctx.GetArgument<int>("id");

                var wh = await uow.GenericRepository<WorkedHour>().FindAsync(u => u.Id == id)
                    ?? throw new ValidationError("Record not found"); // Temp error

                var result = await uow.GenericRepository<WorkedHour>().DeleteAsync(wh);

                await uow.SaveAsync();

                return result ? id : throw new ValidationError("Failed to delete");
            });

        Field<WorkedHour>("update")
            .Argument<UpdateWorkedHourInputType>("workedHour")
            .ResolveAsync(async ctx =>
            {
                var wh = ctx.GetArgument<WorkedHourUpdateDto>("workedHour");

                var currentValue = await uow.GenericRepository<WorkedHour>().FindAsync(w => w.Id == wh.Id)
                            ?? throw new ValidationError("Record not found"); // Temp error

                if (currentValue.Date >= DateTime.UtcNow
                && (wh.StartTime > TimeOnly.FromDateTime(DateTime.UtcNow)
                || wh.EndTime > TimeOnly.FromDateTime(DateTime.UtcNow)))
                {
                    throw new ValidationError("Can't create worked hour for future");
                }

                var exists = await uow.GenericRepository<WorkedHour>()
                            .FindAsync(p => p.Date.Date == currentValue.Date.Date 
                                        && p.UserId == currentValue.UserId 
                                        && p.StartTime < wh.EndTime 
                                        && wh.StartTime < p.EndTime);

                if (exists is not null)
                    throw new ValidationError("Worked hours intersect!");

                var updated = await uow.GenericRepository<WorkedHour>()
                    .UpdateAsync(mapper.Map(wh, currentValue));

                await uow.SaveAsync();

                return updated;
            });
    }
}