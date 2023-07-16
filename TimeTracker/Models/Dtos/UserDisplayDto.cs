using AutoMapper;
using TimeTracker.MapperProfiles;
using TimeTracker.Utils.SoftDelete;

namespace TimeTracker.Models.Dtos;


public class UserDisplayDto:SoftDeleteBase
{
    public int Id { get; set; }
    
    public string FirstName { get; set; } = string.Empty;
    
    public string LastName { get; set; } = string.Empty;
    
    public string Email { get; set; } = string.Empty;
    
    public string Password { get; set; } = string.Empty;
    
    public int WorkType { get; set; }
    
    public bool IsEmailActivated { get; set; }
    
    public int Permissions { get; set; }
    
    public int HoursPerMonth { get; set; }
    
    public int VacationDays { get; set; }
    
    public List<Vacation> Vacations { get; } = new();
    
    public List<UserApproverDisplayDto> Approvers { get; } = new();
    
    public List<UserApproverDisplayDto> Senders { get; } = new();
}