import React, {useEffect} from 'react';
import {Loader, SmallButton, TextInput} from "../UI";
import {SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch, useTypedSelector} from "../../hooks";
import {H5} from "../Headings";
import {createVacation, fetchVacationDays, updateApproversVacations} from "../../redux";


interface VacationInput{
    startDate:Date,
    endDate:Date,
    message?:string
}

export const AddVacationForm = () => {

    const { register,handleSubmit,
        formState: { errors }, reset } = useForm<VacationInput>({
        mode: 'onBlur',
        defaultValues: {
            startDate:new Date(),
            endDate:new Date(),
            message:''
        }
    });
    const user = useTypedSelector(u=>u.auth.user);
    const {vacationDays,loading:userLoading}
        = useTypedSelector(s=>s.user);
    const {loading,error,created,createdId}
        = useTypedSelector(s=>s.vacations);



    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(fetchVacationDays(user?.id!))
        if(created){
            dispatch(updateApproversVacations({vacationId:createdId!,userId:user?.id!}))
        }
    },[created])


    const onSubmit: SubmitHandler<VacationInput> = (data) => {
        dispatch(createVacation({...data,userId:user?.id!}))
        reset()
    }

    return (
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:'80px',height:"100%"}}>
            <form onSubmit={handleSubmit(onSubmit)} style={{display:"flex",gap:"10px",flexDirection:"column",width:"50%"}}>
                <H5 value={`Available vacation days ${userLoading?"loading..":vacationDays}`} />
                <div className="login-form__messages-wrapper">
                    {loading?<Loader/>:""}
                    <H5 value={error} />
                </div>
                <label style={{marginLeft:"5px"}}>Start date</label>
                <input {...register("startDate")} name="startDate" className="text-input" type="date" placeholder="Start date"/>
                <label style={{marginLeft:"5px"}}>End date</label>
                <input {...register("endDate")} name="endDate" className="text-input" type="date" placeholder="End date"/>
                <TextInput name="message" register={register("message")} placeholder="Message"/>
                <SmallButton type="submit" value="Create vacation"/>
            </form>
        </div>
    );
};