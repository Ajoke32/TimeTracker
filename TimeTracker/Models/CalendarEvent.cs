using TimeTracker.Enums;
namespace TimeTracker.Models;

public class CalendarEvent
{
    public int Id { get; set; }

    public DateTime Date { get; set; }

    public string Title { get; set; } = string.Empty;
    
    public EventType EventType { get; set; }
}