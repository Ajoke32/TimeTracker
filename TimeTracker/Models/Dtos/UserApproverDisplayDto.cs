namespace TimeTracker.Models.Dtos;

public class UserApproverDisplayDto
{
    public int Id { get; set; }
    public bool IsApproved { get; set; }
    
    public UserDisplayDto? User { get; set; }
    
    public UserDisplayDto? Approver { get; set; }

    public UserApproverDisplayDto()
    {
        IsApproved = false;
    }
}