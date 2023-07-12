import { Navigate } from "react-router-dom"
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState, useEffect } from "react";
import { H5, InputTooltip, Loader, PasswordInput, LargeButton } from "../../components";
import { useTypedSelector, useAppDispatch } from "../../hooks";
import { verify, userVerify } from "../../redux";
import "./UserVerify.css"

type Inputs = {
    password: string
}

export const UserVerify = () => {
    const dispatch = useAppDispatch();
    const { loading, error } = useTypedSelector(state => state.auth);
    const [param, setParam] = useState<string | null>('');

    const urlParams = new URLSearchParams(window.location.search)

    const tokenParam = urlParams.get('token')
    const verifyParam = urlParams.get('verify')

    useEffect(() => {
        if (!urlParams.has('token') && !urlParams.has('verify'))
            setParam(null)

        if (tokenParam) {
            setParam('token')
            dispatch(verify(tokenParam));
        }

        if (verifyParam) {
            setParam('verify')
        }

    }, []);

    const { register, handleSubmit,
        formState: { errors }, reset } = useForm<Inputs>({
            mode: 'onBlur',
            defaultValues: {
                password: ''
            }
        });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        //dispatch(userVerify(verifyParam));

        reset();
    }

    switch (param) {
        case 'token':
            return (
                <div className="user-verify-page-wrapper">
                    <div className="login-form__messages-wrapper">
                        {loading ? <Loader /> : ""}
                        <H5 value={error ? error : !loading ? 'Successfully verified' : ''} />
                    </div>
                    <InputTooltip description="Return to the" url="/" urlTitle="Login" />
                </div>
            );

        case 'verify':
            return (
                <div className="user-verify-page-wrapper">
                    <form className="user-password-form" onSubmit={handleSubmit(onSubmit)}>
                        <PasswordInput name="password" placeholder="Password" register={register("password", { required: "Password can't be empty!" })} errors={errors.password}/>
                        <LargeButton type="submit" value="Confirm" />
                    </form>
                </div>
            );
        case null:
            return (<Navigate to='/' />)
        default:
            return (<></>)
    }
}