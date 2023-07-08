using GraphQL.Types;
using TimeTracker.Models;

namespace TimeTracker.GraphQL.Types;

public sealed class LoginResponseType:ObjectGraphType<LoginResponse>
{
    public LoginResponseType()
    {
        Field<int>(x=>x.Code);

        Field<string>(x=>x.Message);
    }
}