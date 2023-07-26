using GraphQL;
using GraphQL.Types;
using GraphQL.Validation;
using TimeTracker.Absctration;
using TimeTracker.GraphQL.Types;
using TimeTracker.GraphQL.Types.InputTypes.ApproveInput;
using TimeTracker.Models;
using TimeTracker.Models.Dtos;


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
            .Argument<ApproverVacationUpdateType>("approverVacation")
            .ResolveAsync(async ctx =>
            {
                var av = ctx.GetArgument<ApproverVacationUpdateDto>("approverVacation");
            
                var approverVacation = await uow.GenericRepository<ApproverVacation>()
                    .FindAsync(a => a.VacationId==av.VacationId && a.UserId == av.ApproverId
                    ,relatedData:"Vacation.User")??throw new ValidationError("ApproverVacation not found");
                
                
                approverVacation.IsApproved = av.IsApproved;
                approverVacation.Message = av.Message;
                
                
                await uow.SaveAsync();
                
                return approverVacation;
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

