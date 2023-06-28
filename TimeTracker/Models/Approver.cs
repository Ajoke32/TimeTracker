using System.ComponentModel.DataAnnotations.Schema;

namespace TimeTracker.Models;

public class Approver
{
    public int Id { get; set; }

    public bool IsApproved { get; set; }

    public int UserSenderId { get; set; }
    public User UserSender { get; set; } = null!;

    public int UserApproverId { get; set; }
    public User UserApprover { get; set; } = null!;
}