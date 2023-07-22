using GraphQL;
using GraphQL.Types;
using GraphQL.Validation;
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

        Field<ListGraphType<ApproverVacationType>>("updateState")
            .Argument<int>("approverId")
            .Argument<bool>("state",nullable:true)
            .Argument<List<int>>("vacations")
            .ResolveAsync(async ctx =>
            {
                var state = ctx.GetArgument<bool>("state");
                var approverId = ctx.GetArgument<int>("approverId");
                var vacations = ctx.GetArgument<List<int>>("vacations");

            
                var approverVacations = await uow.GenericRepository<ApproverVacation>()
                    .GetAsync(a => vacations.Contains(a.VacationId) && a.UserId == approverId
                    ,includeProperties:"Vacation.User");
                        
                
                if (!approverVacations.Any())
                {
                    throw new ValidationError("not found");
                }

                foreach (var vac in approverVacations)
                {
                    vac.IsApproved = state;
                }
                
                await uow.SaveAsync();
                
                return approverVacations;
            });

        Field<bool>("updateApproversVacations")
            .Argument<ApproverVacationInputType>("approverVacation")
            .ResolveAsync(async ctx =>
            {
                var av = ctx.GetArgument<ApproverVacation>("approverVacation");
             
                var user = await uow.GenericRepository<User>()
                    .FindAsync(u => u.Id == av.UserId,relatedData:"Approvers.Approver");
                
                var approvers = new List<ApproverVacation>();
                if (user == null)
                {
                    return false;
                }
                
                foreach (var userApprover in user.Approvers)
                {
                    approvers.Add(new ApproverVacation
                    {
                        UserId =userApprover.Approver.Id,
                        VacationId = av.VacationId
                    });
                }

                var result = await uow.GenericRepository<ApproverVacation>()
                    .AddRangeAsync(approvers);

                await uow.SaveAsync();
                
                return result;
            });
    }
}

