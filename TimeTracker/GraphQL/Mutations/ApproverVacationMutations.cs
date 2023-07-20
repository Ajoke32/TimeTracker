using AutoMapper;
using GraphQL;
using GraphQL.Types;
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
            .Argument<int>("approverId")
            .Argument<bool>("state",nullable:true)
            .Argument<int>("vacationId")
            .ResolveAsync(async ctx =>
            {
                var id = ctx.GetArgument<int>("vacationId");
                var state = ctx.GetArgument<bool>("state");
                var approverId = ctx.GetArgument<int>("approverId");
                
                var approverVacation = await uow.GenericRepository<ApproverVacation>()
                    .FindAsync(a=>a.VacationId==id&&a.UserId==approverId
                        ,relatedData:"Vacation");
                
                if (approverVacation == null)
                {
                    throw new ArgumentException("vacation not exist");
                }
                
                approverVacation.IsApproved = state;

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

