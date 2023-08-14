using GraphQL.Types;
using TimeTracker.Models.Dtos;


namespace TimeTracker.GraphQL.Types.InputTypes.CalendarEventInput;

public sealed class CalendarEventInputType: InputObjectGraphType<CalendarEventInputDto>
{
    public CalendarEventInputType()
    {
        Field(x => x.Date).Description("working date");

        Field(x => x.Title).Description("title");

        Field(x => x.EventType).Description("event type");
    }
}