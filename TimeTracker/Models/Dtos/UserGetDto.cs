using AutoMapper;

namespace TimeTracker.Models.Dtos;


public class UserGetDto
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
    
    public List<UserApprover> Approvers { get; } = new();
    
    public List<UserApprover> Senders { get; } = new();
}