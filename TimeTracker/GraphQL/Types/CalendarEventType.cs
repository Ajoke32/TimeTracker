using GraphQL.Types;
using TimeTracker.Models;

namespace TimeTracker.GraphQL.Types;

public sealed class CalendarEventType:ObjectGraphType<CalendarEvent>
{
    public CalendarEventType()
    {
        Field(x=>x.Id).Description("Id of the calendar event");
        
        Field(x=>x.Title).Description("Title of the calendar event");
        
        Field(x=>x.Description).Description("Description of the calendar event");
        
        Field(x=>x.Date)
            .Resolve(context => context.Source.Date.Date)
            .Description("Date of the calendar event");
    }
}