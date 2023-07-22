using System.ComponentModel.DataAnnotations;
using TimeTracker.Enums;

namespace TimeTracker.Models.Dtos;

public class UserUpdateDto
{
     public int Id { get; set; }

     public int Permissions { get; set; }
     
     public int HoursPerMonth { get; set; }
}