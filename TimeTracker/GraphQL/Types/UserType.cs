using GraphQL.Types;
using TimeTracker.Models;


namespace TimeTracker.GraphQL.Types;

public sealed class UserType:ObjectGraphType<User>
{
    public UserType()
    {
        Field(x => x.Id).Description("Id");

        Field(x => x.Email).Description("user email");

        Field(x => x.FirstName).Description("user first name");

        Field(x => x.LastName).Description("");

        Field(x => x.Password).Description("");

        Field(x => x.Permissions).Description("");

        Field(x => x.VacationDays).Description("");

        Field(x => x.WorkType).Description("");
        
        Field(x => x.Approvers).Description("user vacation approved requests");

        Field(x => x.Senders).Description("user vacation requests");

        Field(x => x.Vacations).Description("user vacations");

    }
}