import { Navigate } from "react-router-dom"
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState, useEffect } from "react";
import { H5, InputTooltip, Loader, PasswordInput, LargeButton } from "../../components";
import { useTypedSelector, useAppDispatch } from "../../hooks";
import { userVerify } from "../../redux";
import "./UserVerify.css"

type Inputs = {
    password: string
}

export const UserVerify = () => {

    const dispatch = useAppDispatch();
    const param = window.location.search.substring("?verify=".length)

    const { register, handleSubmit,
        formState: { errors }, reset } = useForm<Inputs>({
            mode: 'onBlur',
            defaultValues: {
                password: ''
            }
        });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(userVerify({ token: param, password: data.password }));
        reset();
    }

    switch (param) {
        case null:
            return (<Navigate to='/' />)
        default:
            return (
                <div className="user-verify-page-wrapper">
                    <form className="user-password-form" onSubmit={handleSubmit(onSubmit)}>
                        <PasswordInput name="password" placeholder="Password" register={register("password", { required: "Password can't be empty!" })} errors={errors.password} />
                        <LargeButton type="submit" value="Confirm" />
                    </form>
                </div>
            );
    }
}