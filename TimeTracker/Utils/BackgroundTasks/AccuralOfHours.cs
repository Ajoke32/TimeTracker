using Quartz;
using TimeTracker.Absctration;
using TimeTracker.Enums;
using TimeTracker.Models;

namespace TimeTracker.Utils.BackgroundTasks;

public class AccuralOfHours:IJob
{
    private readonly IUnitOfWorkRepository _uow;
    public AccuralOfHours(IUnitOfWorkRepository repos)
    {
        _uow = repos;
    }
    public async Task Execute(IJobExecutionContext context)
    {
        var fullTimers = await _uow.GenericRepository<User>()
            .GetAsync(u => u.WorkType == WorkType.FullTime);

        // foreach (var user in fullTimers)
        // {
        //     user.WorkedHours += 8;
        // }

        await _uow.SaveAsync();
    }
}