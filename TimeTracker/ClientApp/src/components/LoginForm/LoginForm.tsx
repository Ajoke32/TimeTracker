import { useDispatch } from "react-redux"
import { useForm, SubmitHandler } from 'react-hook-form';
import TextInput from "../UI/Inputs/TextInput";
import LargeButton from "../UI/Buttons/LargeButton";
import InputTooltip from "../UI/Tooltips/InputTooltip";
import H1 from "../Headings/H1"
import "./LoginForm.css"
import PasswordInput from "../UI/Inputs/PasswordInput";
import {useAppDispatch, useCurrentSelector} from "../../hooks";
import {login} from "../../redux";
import H2 from "../Headings/H2";

type Inputs = {
    email: string
    password: string
}

export const LoginForm = () => {
    const dispatch = useAppDispatch();
    const {loading,error} = useCurrentSelector(state=>state.user);
    const { register, handleSubmit,
        formState: { errors }, reset } = useForm<Inputs>({
        mode: 'onBlur',
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(login(data));
        reset();
    }

    

    return (
        <div className="login-form__wrapper">

            <form onSubmit={handleSubmit(onSubmit)}>

                <H1 value="Sign in"/>

                <H2 value={loading?"loading..":""}></H2>
                <H2 value={error!==""?error:""}></H2>

                <div className="login-inputs__wrapper">
                    <TextInput name="email" placeholder="Enter your work email" register={register("email", { required: "Login can't be empty!" })} errors={errors.email} />

                    <div className="password-input__wrapper">
                        <PasswordInput name="password" placeholder="Password" register={register("password", { required: "Password can't be empty!" })} errors={errors.password}/>

                        <InputTooltip title="Forgot your password?" url="/" urlTitle="Click here"/>
                    </div>
                </div>

                <LargeButton type="submit" value="Submit"/>

                <div className="tooltip-wrapper__bold">
                    <InputTooltip title="Don't have an account?" url="/auth" urlTitle="Get started"/>
                </div>

            </form>
        </div>
    );
}