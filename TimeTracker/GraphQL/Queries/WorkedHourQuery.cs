using AutoMapper;
using GraphQL;
using GraphQL.Execution;
using GraphQL.MicrosoftDI;
using GraphQL.Types;
using GraphQL.Validation;
using TimeTracker.Absctration;
using TimeTracker.Enums;
using TimeTracker.GraphQL.Types;
using TimeTracker.GraphQL.Types.InputTypes;
using TimeTracker.Models;
using TimeTracker.Models.Dtos;
using TimeTracker.Utils.Auth;
using TimeTracker.Utils.Email;
using TimeTracker.Utils.Errors;
using TimeTracker.Utils.Filters;
using TimeTracker.Visitors;
using TimeTracker.GraphQL.Types.InputTypes.CalendarEventInput;

namespace TimeTracker.GraphQL.Queries;

public sealed class WorkedHourQuery : ObjectGraphType
{
    public WorkedHourQuery(IUnitOfWorkRepository uow, IGraphQlArgumentVisitor visitor)
    {
        Field<ListGraphType<WorkedHourType>>("workedHours")
            .Argument<int>("userId")
            .Argument<DateRangeInputType>("dateRange")
            .ResolveAsync(async ctx =>
            {
                var userId = ctx.GetArgument<int>("userId");
                var dateRange = ctx.GetArgument<DateRangeInputDto>("dateRange");

                var workedHours = await uow.GenericRepository<WorkedHour>()
                                    .GetAsync(w => w.UserId == userId
                                                && w.Date.Date >= dateRange.StartDate.Date
                                                && w.Date.Date <= dateRange.EndDate.Date);

                workedHours = workedHours.OrderByDescending(w => w.Id);

                return visitor.VisitPaging(workedHours, ctx);
            })
            .Description("gets all user's worked hours");

        Field<int>("getWorkedHoursInMonth")
                .Argument<DateOnlyGraphType>("date")
                .Resolve(c =>
                {
                    var date = c.GetArgument<DateOnly>("date");
                    return 8 * GetWorkedDaysInMonth(date.Year, date.Month);
                });



        Field<HoursWorkedGraphType>("getStatistic")
            .Argument<int>("userId")
            .Argument<DateOnlyGraphType>("date")
            .ResolveAsync(async _ =>
            {
                var id = _.GetArgument<int>("userId");
                var date = _.GetArgument<DateOnly>("date");
                var user = await uow.GenericRepository<User>()
                    .FindAsync(u => u.Id == id, relatedData: "WorkedHours") ?? throw new Exception("not found");

                var needToWork = user.HoursPerMonth * 8 * GetWorkedDaysInMonth(date.Year, date.Month) / 100;

                var actuallyWorked = user.WorkedHours
                    .Aggregate(TimeSpan.Zero, (current, wh) => current + wh.TotalTime.ToTimeSpan());

                return new HoursWorked()
                {
                    ActuallyWorked = (actuallyWorked.TotalHours * 100 / needToWork).ToString("F2"),
                    ActuallyWorkedHours = actuallyWorked.TotalHours.ToString("F2"),
                    NeedToWork = needToWork.ToString("F2")
                };
            });
    }


    private int GetWorkedDaysInMonth(int year, int month)
    {
        var workDays = 0;
        var daysInMonth = DateTime.DaysInMonth(year, month);
        for (var day = 1; day <= daysInMonth; day++)
        {
            var currentDay = new DateTime(year, month, day);
            if (currentDay.DayOfWeek != DayOfWeek.Saturday && currentDay.DayOfWeek != DayOfWeek.Sunday)
            {
                workDays++;
            }
        }

        return workDays;
    }
}