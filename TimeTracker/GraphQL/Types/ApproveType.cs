using GraphQL.Types;
using GraphQLParser.AST;
using TimeTracker.Models;

namespace TimeTracker.GraphQL.Types;

public sealed class ApproveType:ObjectGraphType<UserApprover>
{
    public ApproveType()
    {
        Field(x => x.Id).Description("approve id");

        Field(x => x.Approver).Description("user approver");

        Field(x => x.User).Description("user sender");

        Field(x => x.UserId).Description("user sender id");

        Field(x => x.ApproverId).Description("user approver id");

        Field(x => x.IsApproved).Description("approve state");
        
    }
}