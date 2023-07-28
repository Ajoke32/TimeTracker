using GraphQL.Types;
using TimeTracker.Models;

namespace TimeTracker.GraphQL.Types.InputTypes;

public sealed class CalendarEventInputType:InputObjectGraphType<CalendarEvent>
{
    public CalendarEventInputType()
    {
        Field(x=>x.Title).Description("Title of the event");
        
        Field(x=>x.Description,nullable:true).Description("Description of the event");
        
        Field(x=>x.Date)
            .Type(new DateGraphType())
            .Description("Date of the event");
    }
}