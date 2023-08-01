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
        
        Field<VacationsQuery>()
            .Name("vacationQuery")
            .Resolve(_ => new { });
        
        Field<WorkedHourQuery>()
            .Name("workedHourQuery")
            .Resolve(_ => new { });

        Field<CalendarEventQuery>()
            .Name("calendarEventQuery")
            .Resolve(_ => new { });
    }
}