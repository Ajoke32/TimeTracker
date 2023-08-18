using Quartz;
using TimeTracker.Absctration;
using TimeTracker.Models;

namespace TimeTracker.Utils.BackgroundTasks;

public class AccrualOfVacationDays:IJob
{
    private readonly IUnitOfWorkRepository _uow;
    
    public AccrualOfVacationDays(IUnitOfWorkRepository repos)
    {
        _uow = repos;
    }
    
    public async Task Execute(IJobExecutionContext context)
    {
        var users = await _uow.GenericRepository<User>().GetAsync();

        foreach (var user in users)
        {
            user.AvailableVacationDays += user.VacationDays / 12;
        }
    }
}