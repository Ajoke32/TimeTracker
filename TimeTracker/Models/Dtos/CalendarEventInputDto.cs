namespace TimeTracker.Models.Dtos;

public class CalendarEventInputDto
{
    
    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;
    
    public DateTime Date { get; set; }
}