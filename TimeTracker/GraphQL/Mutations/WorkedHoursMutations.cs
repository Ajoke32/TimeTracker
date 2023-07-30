using AutoMapper;
using GraphQL;
using GraphQL.Types;
using TimeTracker.Absctration;
using TimeTracker.GraphQL.Types;
using TimeTracker.GraphQL.Types.InputTypes.WorkedHourInput;
using TimeTracker.Models;
using TimeTracker.Models.Dtos;
using TimeTracker.Utils.Errors;
using TimeTracker.Enums;

namespace TimeTracker.GraphQL.Mutations;

public sealed class WorkedHoursMutations : ObjectGraphType
{
    public WorkedHoursMutations(IUnitOfWorkRepository uow, IMapper mapper)
    {
        Field<WorkedHour>("set")
            .Argument<WorkedHourInputType>("workedHours")
            .ResolveAsync(async ctx =>
            {
                var wh = ctx.GetArgument<WorkedHourInputDto>("workedHours");

                var currentValue = await uow.GenericRepository<WorkedHour>().FindAsync(w =>
                           (w.UserId == wh.UserId && w.Date == wh.Date));

                currentValue = (currentValue is null)
                ? await uow.GenericRepository<WorkedHour>().CreateAsync(mapper.Map<WorkedHour>(wh))
                : await uow.GenericRepository<WorkedHour>().UpdateAsync(mapper.Map<WorkedHourInputDto, WorkedHour>(wh, currentValue));

                await uow.SaveAsync();

                return currentValue;
            });

        Field<WorkedHour>("create")
            .Argument<WorkedHourInputType>("workedHours")
            .ResolveAsync(async ctx =>
            {
                var wh = ctx.GetArgument<WorkedHourInputDto>("workedHours");

                if(await uow.GenericRepository<WorkedHour>()
                    .FindAsync(w =>
                           (w.UserId == wh.UserId && w.Date == wh.Date)) is not null)
                            throw new QueryError(Error.ERR_EMAIL_EXISTS); // Temp error

                var created = await uow.GenericRepository<WorkedHour>().CreateAsync(mapper.Map<WorkedHour>(wh));

                await uow.SaveAsync();

                return created;
            });

        Field<bool>("delete")
            .Argument<int>("id")
            .ResolveAsync(async ctx =>
            {
                var id = ctx.GetArgument<int>("id");

                var wh = await uow.GenericRepository<WorkedHour>().FindAsync(u => u.Id == id)
                    ?? throw new QueryError(Error.ERR_USER_NOT_FOUND); // Temp error

                var result = await uow.GenericRepository<WorkedHour>().DeleteAsync(wh);

                await uow.SaveAsync();

                return result;
            });

        Field<WorkedHour>("update")
            .Argument<UpdateWorkedHourInputType>("workedHours")
            .ResolveAsync(async ctx =>
            {
                var wh = ctx.GetArgument<WorkedHourUpdateDto>("workedHours");

                var currentValue = await uow.GenericRepository<WorkedHour>().FindAsync(w => w.Id == wh.Id)
                            ?? throw new QueryError(Error.ERR_EMAIL_EXISTS); // Temp error

                var updated = await uow.GenericRepository<WorkedHour>().UpdateAsync(mapper.Map<WorkedHourUpdateDto, WorkedHour>(wh, currentValue));

                await uow.SaveAsync();

                return updated;
            });
    }
}