using GraphQL.Types;
using TimeTracker.GraphQL.Queries;

namespace TimeTracker.GraphQL;

public sealed class RootQuery:ObjectGraphType
{
    public RootQuery()
    {
        
        Field<UserQuery>()
            .Name("userQuery")
            .Resolve(_ => new { });
        
        Field<ApproverVacationQuery>()
            .Name("approverVacationQuery")
            .Resolve(_ => new { });
    }
}