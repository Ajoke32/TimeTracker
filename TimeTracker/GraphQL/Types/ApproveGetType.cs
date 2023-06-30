namespace TimeTracker.GraphQL.Types;

public class ApproveGetType
{
    public List<string> ApproversId { get; set; } = new();
    
    public int ApproverId { get; set; }
    
    public int UserSenderId { get; set; }
}