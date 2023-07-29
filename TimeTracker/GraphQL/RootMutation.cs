using GraphQL.Types;
using TimeTracker.GraphQL.Mutations;

namespace TimeTracker.GraphQL;

public sealed class RootMutation:ObjectGraphType
{
    public RootMutation()
    {
        Field<UserMutations>("userMutation")
            .Resolve(_ => new { });

        Field<ApproverMutations>("approverMutation")
            .Resolve(_=>new { });

        Field<VacationMutations>("vacationMutation")
            .Resolve(_ => new { });
        
        Field<ApproverVacationMutations>("approverVacationMutation")
            .Resolve(_ => new { });

        Field<WorkedHoursMutations>("WorkedHoursMutations")
            .Resolve(_ => new { });
    }
}