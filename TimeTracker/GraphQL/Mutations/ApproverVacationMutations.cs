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

        Field<ApproverVacationType>("updateState")
            .Argument<bool>("state")
            .Argument<int>("vacationId")
            .ResolveAsync(async ctx =>
            {
                var id = ctx.GetArgument<int>("vacationId");
                var state = ctx.GetArgument<bool>("state");
                
                var approverVacation = await uow.GenericRepository<ApproverVacation>()
                    .FindAsync(a=>a.VacationId==id,relatedData:"Vacation");
                
                if (approverVacation == null)
                {
                    throw new ArgumentException("vacation not exist");
                }
                
                approverVacation.IsApproved = state;
                await uow.SaveAsync();
                
                return approverVacation;
            });
    }
}