using GraphQL;
using GraphQL.Types;
using TimeTracker.Absctration;
using TimeTracker.GraphQL.Types;
using TimeTracker.GraphQL.Types.InputTypes.ApproveInput;
using TimeTracker.Models;

namespace TimeTracker.GraphQL.Mutations;

public sealed class ApproverMutations:ObjectGraphType
{
    private readonly IUnitOfWorkRepository _uof;
    public ApproverMutations(IUnitOfWorkRepository uof)
    {
        _uof = uof;

        Field<bool>("create")
            .Argument<int>("approverId",nullable:true)
            .Argument<int>("userSenderId")
            .Argument<List<int>>("approvers",nullable:true)
            .ResolveAsync(async ctx =>
            {
                
                var approverId= ctx.GetArgument<int>("approverId");

                var userSenderId = ctx.GetArgument<int>("userSenderId");

                var approvers = ctx.GetArgument<List<int>>("approvers");
                
                if (approvers!=null)
                {
                    foreach (var id in approvers)
                    {
                        await _uof.GenericRepository<UserApprover>().CreateAsync(new UserApprover
                        {
                                ApproverId = id,
                                UserId = userSenderId,
                        });
                    }

                    await _uof.SaveAsync();
                    return true;
                }

                await _uof.GenericRepository<UserApprover>().CreateAsync(new UserApprover()
                {
                    ApproverId = approverId,
                    UserId = userSenderId
                });
                await _uof.SaveAsync();

                return true;
            });


        Field<bool>("deleteUserApprover")
            .Argument<int>("userId")
            .Argument<int>("approverId")
            .ResolveAsync(async ctx =>
            {
                var userId = ctx.GetArgument<int>("userId");
                var approverId = ctx.GetArgument<int>("approverId");
                var approveRecord = await uof.GenericRepository<UserApprover>()
                    .FindAsync(a => a.UserId == userId && a.ApproverId == approverId);
                
                if (approveRecord == null) { return false; }

                var result = await uof.GenericRepository<UserApprover>().DeleteAsync(approveRecord);
                
                await uof.SaveAsync();
                return result;
            }).AuthorizeWithPolicy("Delete");
        
    }
}