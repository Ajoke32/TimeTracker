import React from 'react';
import {Loader, SmallButton, TextInput} from "../UI";
import {SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch, useTypedSelector} from "../../hooks";
import {createVacation} from "../../redux";
import {H5} from "../Headings";


interface VacationInput{
    startDate:Date,
    endDate:Date,
    message?:string
}

const AddVacationForm = () => {

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

    const {loading,error} = useTypedSelector(s=>s.vacations);

    const dispatch = useAppDispatch();
    const onSubmit: SubmitHandler<VacationInput> = (data) => {
        dispatch(createVacation({...data,userId:user?.id!}))
        reset()
    }

    return (
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100%"}}>
            <form onSubmit={handleSubmit(onSubmit)} style={{display:"flex",gap:"10px",flexDirection:"column",marginBottom:"120px",width:"50%"}}>
                <H5 value={`Available vacation days ${user?.vacationDays}`} />
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

export default AddVacationForm;
