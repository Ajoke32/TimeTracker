using GraphQL.Types;
using TimeTracker.Models;

namespace TimeTracker.GraphQL.Types;

public sealed class WorkedHourType: ObjectGraphType<WorkedHour>
{
    public WorkedHourType()
    {
        Field(x => x.Id).Description("id");

        Field(x=>x.UserId).Description("user id");

        Field(x => x.Date).Description("working date");

        Field(x => x.StartTime).Description("start time");

        Field(x => x.EndTime).Description("end time");

        Field(x => x.TotalTime).Description("user's total worked time");
    }
}