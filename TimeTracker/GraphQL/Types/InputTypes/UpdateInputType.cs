using GraphQL.Types;
using TimeTracker.Models;

namespace TimeTracker.GraphQL.Types.InputTypes;

public sealed class UpdateInputType:InputObjectGraphType<User>
{
    public UpdateInputType()
    {
        Field(x => x.Id).Description("user id");
        
        Field(x => x.Email).Description("user email");

        Field(x => x.FirstName).Description("user first name");

        Field(x => x.LastName).Description("");
        
        Field(x => x.Password).Description("");
        
        Field(x => x.WorkType).Description("");
    }
}