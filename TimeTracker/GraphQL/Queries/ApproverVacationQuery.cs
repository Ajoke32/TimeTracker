using AutoMapper;
using GraphQL.Types;
using TimeTracker.Absctration;
using TimeTracker.GraphQL.Types;
using TimeTracker.Models;
using TimeTracker.Models.Dtos;

namespace TimeTracker.GraphQL.Queries;

public sealed class ApproverVacationQuery:ObjectGraphType
{
    public ApproverVacationQuery(IUnitOfWorkRepository uow,IMapper mapper)
    {
        Field<ListGraphType<ApproverVacationType>>("fetch")
            .ResolveAsync(async context =>
            {

                var vac =
                    await uow.GenericRepository<ApproverVacation>().GetAsync(includeProperties:"Vacation.User");


                return vac;
            });
    }
}