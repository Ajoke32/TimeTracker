﻿using GraphQL;
using GraphQL.Types;
using TimeTracker.Absctration;
using TimeTracker.GraphQL.Types;
using TimeTracker.GraphQL.Types.InputTypes.VacationInput;
using TimeTracker.Models;

namespace TimeTracker.GraphQL.Mutations;

public sealed class VacationMutations:ObjectGraphType
{
    public VacationMutations(IUnitOfWorkRepository uow)
    {
        Field<VacationType>("create")
            .Argument<VacationInputType>("vacation")
            .ResolveAsync(async _ =>
            {
                var vacation = _.GetArgument<Vacation>("vacation");

                var res = await uow.GenericRepository<Vacation>().CreateAsync(vacation);
                await uow.SaveAsync();
                return res;
            });

        Field<VacationType>("updateState")
            .Argument<bool>("state",nullable:true)
            .Argument<int>("id")
            .ResolveAsync(async _ =>
            {
                var state = _.GetArgument<bool>("state");
                var id = _.GetArgument<int>("id");

                var vacation = await uow.GenericRepository<Vacation>()
                    .FindAsync(v => v.Id == id);
                if (vacation == null)
                {
                    throw new Exception("vacation not found");
                }

                vacation.VacationState = state;
                var updated = await uow.GenericRepository<Vacation>().UpdateAsync(vacation);
                await uow.SaveAsync();

                return updated;
            });


        Field<VacationType>("update")
            .Argument<VacationInputType>("vacation")
            .ResolveAsync(async _ =>
            {
                var vacation = _.GetArgument<Vacation>("vacation");

                var updated = await uow.GenericRepository<Vacation>().UpdateAsync(vacation);
                await uow.SaveAsync();
                return updated;
            });
    }
} 