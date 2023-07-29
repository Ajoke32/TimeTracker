using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TimeTracker.Enums;
using TimeTracker.Models;
using TimeTracker.Utils.SoftDelete;

namespace TimeTracker.AppContext;

public class TimeTrackerContext:DbContext
{
    public TimeTrackerContext(DbContextOptions<TimeTrackerContext> options) : base(options)
    {
    }
    
    public DbSet<User> Users { get; set; }
    
    public DbSet<Vacation> Vacations { get; set; }
    
    public DbSet<UserApprover> Approvers { get; set; }
    
    public DbSet<ApproverVacation> ApproversVacation { get; set; }

    public DbSet<WorkedHour> WorkedHours { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<UserApprover>()
            .HasOne(a => a.Approver)
            .WithMany(u => u.Senders)
            .HasForeignKey(a => a.ApproverId)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<UserApprover>()
            .HasOne(a => a.User)
            .WithMany(u => u.Approvers)
            .HasForeignKey(a => a.UserId)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<User>()
            .HasQueryFilter(u => !u.IsDeleted);

        modelBuilder.Entity<WorkedHour>()
            .HasOne(a => a.User)
            .WithMany(u => u.WorkedHours)
            .HasForeignKey(a => a.UserId);
        
        modelBuilder.Entity<WorkedHour>()
            .Property(a => a.Date)
            .HasConversion(
                v => v.ToDateTime(new TimeOnly()),
                v => DateOnly.FromDateTime(v)
            );
        
        modelBuilder.Entity<WorkedHour>()
            .Property(a => a.WorkedTime)
            .HasConversion(
                v => v.ToTimeSpan(),
                v => TimeOnly.FromTimeSpan(v)
            );
        
        base.OnModelCreating(modelBuilder);
    }


    
}