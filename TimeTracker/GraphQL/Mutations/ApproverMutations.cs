using GraphQL;
using GraphQL.Types;
using TimeTracker.Absctration;
using TimeTracker.GraphQL.Types;
using TimeTracker.GraphQL.Types.InputTypes.ApproveInput;
using TimeTracker.Models;

namespace TimeTracker.GraphQL.Mutations;

public sealed class ApproverMutations:ObjectGraphType
{
    public ApproverMutations(IUnitOfWorkRepository uof)
    {
        Field<bool>("create")
            .Argument<ApproveInputType>("approve")
            .ResolveAsync(async ctx =>
            {
                var approveInput = ctx.GetArgument<ApproveGetType>("approve");

                var approvers = approveInput.ApproversId;

                if (approvers.Any())
                {
                    foreach (var id in approvers)
                    {
                        await uof.GenericRepository<Approver>().CreateAsync(new Approver()
                        {
                                UserApproverId = int.Parse(id),
                                UserSenderId = approveInput.UserSenderId,
                        });
                    }

                    await uof.SaveAsync();
                    return true;
                }

                await uof.GenericRepository<Approver>().CreateAsync(new Approver()
                {
                    UserApproverId = approveInput.ApproverId,
                    UserSenderId = approveInput.UserSenderId
                });
                await uof.SaveAsync();

                return true;
            }).AuthorizeWithPolicy("Create");


        Field<bool>("removeUserApprover")
            .Argument<int>("userId")
            .Argument<int>("approverId")
            .ResolveAsync(async ctx =>
            {
                var userId = ctx.GetArgument<int>("userId");
                var approverId = ctx.GetArgument<int>("approverId");
                var approveRecord = await uof.GenericRepository<Approver>()
                    .FindAsync(a => a.UserSenderId == userId && a.UserApproverId == approverId);
                
                if (approveRecord == null) { return false; }
                
                return await uof.GenericRepository<Approver>().DeleteAsync(approveRecord);
            });

        
    }
}