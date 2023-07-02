import { useDispatch } from "react-redux"
import { useForm, SubmitHandler } from 'react-hook-form';
import TextInput from "../UI/Inputs/TextInput";
import LargeButton from "../UI/Buttons/LargeButton";
import InputTooltip from "../UI/Tooltips/InputTooltip";
import H1 from "../Headings/H1"
import "./LoginForm.css"
import PasswordInput from "../UI/Inputs/PasswordInput";

type Inputs = {
    email: string
    password: string
}

export const LoginForm = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>({
        mode: 'onBlur',
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch({ type: 'USER_LOGIN', payload: data });
        console.log(data)
        reset();
    }

    

    return (
        <div className="login-form__wrapper">
            <form onSubmit={handleSubmit(onSubmit)}>

                <H1 value="Sign in"/>
                

                <div className="login-inputs__wrapper">
                    <TextInput name="email" placeholder="Enter your work email" register={register("email", { required: "Login can't be empty!" })} errors={errors.email} />

                    <div className="password-input__wrapper">
                        <PasswordInput name="password" placeholder="Password" register={register("password", { required: "Password can't be empty!" })} errors={errors.password}/>

                        <InputTooltip title="Forgot your password?" url="/" urlTitle="Click here"/>
                    </div>
                </div>

                <LargeButton type="submit" value="Login"/>

                <div className="tooltip-wrapper__bold">
                    <InputTooltip title="Don't have an account?" url="/auth" urlTitle="Get started"/>
                </div>

            </form>
        </div>
    );
}