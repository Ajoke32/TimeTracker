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

                var created = await uow.GenericRepository<WorkedHour>().CreateAsync(mapper.Map<WorkedHour>(wh));

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

                var updated = await uow.GenericRepository<WorkedHour>().UpdateAsync(mapper.Map<WorkedHourUpdateDto, WorkedHour>(wh, currentValue));

                await uow.SaveAsync();

                return updated;
            });
    }
}