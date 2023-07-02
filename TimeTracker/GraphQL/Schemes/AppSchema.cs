

using GraphQL.Types;
using TimeTracker.GraphQL.Types;
using TimeTracker.GraphQL.Types.InputTypes;
using TimeTracker.GraphQL.Types.InputTypes.ApproveInput;
using TimeTracker.Models;

namespace TimeTracker.GraphQL.Schemes;

public class AppSchema:Schema
{
    public AppSchema(IServiceProvider provider):base(provider)
    {
        RegisterTypeMapping(typeof(Vacation),typeof(VacationType));
        RegisterTypeMapping(typeof(UserApprover),typeof(ApproveType));
        RegisterTypeMapping(typeof(User),typeof(UserType));
        Query = provider.GetRequiredService<RootQuery>();
        Mutation = provider.GetRequiredService<RootMutation>();
    }
}