using AutoMapper;
using GraphQL;
using GraphQL.Types;
using TimeTracker.Absctration;
using GraphQL.Validation;
using TimeTracker.Models;
using TimeTracker.Models.Dtos;
using TimeTracker.Utils.Errors;
using TimeTracker.Enums;
using TimeTracker.GraphQL.Types.InputTypes.WorkPlanInput;


namespace TimeTracker.GraphQL.Mutations;

public sealed class WorkPlanMutations : ObjectGraphType
{
    public WorkPlanMutations(IUnitOfWorkRepository uow, IMapper mapper)
    {
        Field<WorkPlan>("create")
            .Argument<WorkPlanInputType>("workPlan")
            .ResolveAsync(async ctx =>
            {
                var wp = ctx.GetArgument<WorkPlanInputDto>("workPlan");

                var created = await uow.GenericRepository<WorkPlan>().CreateAsync(mapper.Map<WorkPlan>(wp));

                await uow.SaveAsync();

                return created;
            });
    }
}