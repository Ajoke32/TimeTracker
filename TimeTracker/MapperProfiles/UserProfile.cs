﻿using AutoMapper;
using TimeTracker.Enums;
using TimeTracker.GraphQL.Types;
using TimeTracker.Models;
using TimeTracker.Models.Dtos;

namespace TimeTracker.MapperProfiles;

public class UserProfile:Profile
{
    public UserProfile()
    {
        CreateMap<UserInputDto, User>()
            .ForMember(x => x.Permissions,
                o =>
                    o.MapFrom(dto => (Permissions)dto.Permissions))
            .ForMember(x=>x.WorkType,
                o=>
                    o.MapFrom(dto=>(WorkType)dto.WorkType));


        CreateMap<User, UserGetDto>()
            .ForMember(u => u.Permissions,
                o =>
                    o.MapFrom(m => (int)m.Permissions))
            .ForMember(u=>u.WorkType,
                o=>
                    o.MapFrom(m=>(int)m.WorkType));

    }
}