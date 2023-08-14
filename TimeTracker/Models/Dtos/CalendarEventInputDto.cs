namespace TimeTracker.Models.Dtos;

public class CalendarEventInputDto
{
    public DateOnly Date { get; set; }

    public string Title { get; set; }
    
    public int EventType { get; set; }
}