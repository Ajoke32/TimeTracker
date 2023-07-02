using GraphQL.Types;
using TimeTracker.GraphQL.Mutations;

namespace TimeTracker.GraphQL;

public sealed class RootMutation:ObjectGraphType
{
    public RootMutation()
    {
        Field<UserMutations>("userMutation")
            .Resolve(_ => new { });

        Field<ApproverMutations>("approveMutation")
            .Resolve(_=>new { });

        Field<VacationMutations>("vacationMutation")
            .Resolve(_ => new { });
    }
}