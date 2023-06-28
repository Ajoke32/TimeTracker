using GraphQL.Types;
using TimeTracker.GraphQL.Mutations;

namespace TimeTracker.GraphQL;

public class RootMutation:ObjectGraphType
{
    public RootMutation()
    {
        Field<UserMutations>("userMutation")
            .Resolve(_ => new { });
    }
}