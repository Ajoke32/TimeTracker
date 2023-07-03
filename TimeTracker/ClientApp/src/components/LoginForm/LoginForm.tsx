import { useForm, SubmitHandler } from 'react-hook-form';
import { LargeButton } from "../UI/Buttons";
import { InputTooltip } from "../UI/Tooltips";
import { H1, H2 } from "../Headings"
import "./LoginForm.css"
import { PasswordInput, TextInput } from "../UI/Inputs";
import { useAppDispatch, useTypedSelector } from "../../hooks";
import { login } from "../../redux";

type Inputs = {
    email: string
    password: string
}

export const LoginForm = () => {
    const dispatch = useAppDispatch();
    const { loading, error } = useTypedSelector(state => state.user);
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

                <H1 value="Sign in" />

                <H2 value={loading ? "loading.." : ""}></H2>
                <H2 value={error !== "" ? error : ""}></H2>

                <div className="login-inputs__wrapper">
                    <TextInput name="email" placeholder="Enter your work email" register={register("email", { required: "Email can't be empty!" })} errors={errors.email} />

                    <div className="password-input__wrapper">
                        <PasswordInput name="password" placeholder="Password" register={register("password", { required: "Password can't be empty!" })} errors={errors.password} />

                        <InputTooltip title="Forgot your password?" url="/" urlTitle="Click here" />
                    </div>
                </div>

                <LargeButton type="submit" value="Submit" />

                <div className="tooltip-wrapper__bold">
                    <InputTooltip title="Don't have an account?" url="/auth" urlTitle="Get started" />
                </div>

            </form>
        </div>
    );
}