using GraphQL.Types;
using GraphQLParser.AST;
using TimeTracker.Models;

namespace TimeTracker.GraphQL.Types;

public sealed class ApproveType:ObjectGraphType<Approver>
{
    public ApproveType()
    {
        Field(x => x.Id).Description("approve id");

        Field(x => x.UserApprover).Description("user approver");

        Field(x => x.UserSender).Description("user sender");

        Field(x => x.IsApproved).Description("approve state");
        
    }
}