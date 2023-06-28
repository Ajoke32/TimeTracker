import { useDispatch } from "react-redux"
import { useForm, SubmitHandler } from 'react-hook-form';

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
        reset();
    }

    

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input type='text' placeholder='Login' {...register("email", { required: `Login can't be empty!` })} className=""/>
                {errors.email && (
                    <div>{errors.email.message}</div>
                )}
            </div>
            <div>
                <input type='text' placeholder='Password' {...register("password", { required: `Password can't be empty!` })} className=""/>
                {errors.password && (
                    <div>{errors.password.message}</div>
                )}
            </div>
            <div>
                <input type='submit' value="Submit" />
            </div>
        </form>
    );
}