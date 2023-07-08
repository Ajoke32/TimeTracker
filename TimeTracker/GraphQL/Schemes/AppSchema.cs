

using GraphQL.Types;
using TimeTracker.GraphQL.Types;
using TimeTracker.GraphQL.Types.InputTypes;
using TimeTracker.GraphQL.Types.InputTypes.ApproveInput;
using TimeTracker.Models;
using TimeTracker.Models.Dtos;

namespace TimeTracker.GraphQL.Schemes;

public class AppSchema:Schema
{
    public AppSchema(IServiceProvider provider):base(provider)
    {
        RegisterTypeMapping(typeof(Vacation),typeof(VacationType));
        RegisterTypeMapping(typeof(UserApprover),typeof(ApproveType));
        //RegisterTypeMapping(typeof(UserGetDto),typeof(UserType));
        RegisterTypeMapping(typeof(User),typeof(UserType));
        RegisterTypeMapping(typeof(LoginResponse),typeof(LoginResponseType));
        Query = provider.GetRequiredService<RootQuery>();
        Mutation = provider.GetRequiredService<RootMutation>();
    }
}