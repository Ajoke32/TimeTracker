using GraphQL;
using GraphQL.Types;
using TimeTracker.Absctration;
using TimeTracker.GraphQL.Types;
using TimeTracker.GraphQL.Types.InputTypes.ApproveInput;
using TimeTracker.Models;

namespace TimeTracker.GraphQL.Mutations;

public sealed class ApproverVacationMutations:ObjectGraphType
{
    public ApproverVacationMutations(IUnitOfWorkRepository uow)
    {
        Field<ApproverVacationType>("createApproverVacation")
            .Argument<ApproverVacationInputType>("approverVacation")
            .ResolveAsync(async ctx =>
            {
                var approverVacation = ctx.GetArgument<ApproverVacation>("approverVacation");
                
                var created = await uow.GenericRepository<ApproverVacation>()
                    .CreateAsync(approverVacation);
                
                await uow.SaveAsync();
                return created;
            });
    }
}