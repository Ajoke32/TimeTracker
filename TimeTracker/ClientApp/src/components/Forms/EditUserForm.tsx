import { useState, useEffect } from 'react';
import { CheckboxInput, SmallButton, TextInput } from "../UI";
import { RangeInput } from "../UI/Inputs/RangeInput";
import { useAppDispatch, useTypedSelector } from "../../hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { Permission, fetchUser, User, editUser } from '../../redux';
import { useParams } from 'react-router-dom'

type Inputs = {
    hoursPerMonth: number,
    permissions: number,
}

const options: Permission[] = [
    Permission.Create,
    Permission.Update,
    Permission.Delete,
    Permission.Read,
];

export const EditUserForm = () => {
    const { userId } = useParams();
    const dispatch = useAppDispatch();
    const userState = useTypedSelector(state => state.user);

    useEffect(() => {
        dispatch(fetchUser(parseInt(userId!)))
    }, []);

    const [checkedOptions, setCheckedOptions] = useState<number>(userState.user ? userState.user!.permissions : 0);
    const [hoursPerMonthValue, setHoursPerMonthValue] = useState<number>(userState.user ? userState.user!.permissions : 0);

    useEffect(() => {
        setCheckedOptions(userState.user ? userState.user!.permissions : 0);
        setHoursPerMonthValue(userState.user ? userState.user!.hoursPerMonth : 0);
    }, [userState.user])


    const { register, handleSubmit,
        formState: { errors }, reset } = useForm<Inputs>({
            mode: 'onBlur',
            defaultValues: {
                hoursPerMonth: hoursPerMonthValue,
                permissions: checkedOptions,
            }
        });

    const onSubmit: SubmitHandler<Inputs> = () => {
        const editedUser = {
            id: userState.user!.id,
            permissions: checkedOptions,
            hoursPerMonth: parseInt((hoursPerMonthValue).toString())
        }
        dispatch(editUser(editedUser as User));
    }

    return (
        <div className="user-form__wrapper-inner edit-form__wrapper-inner">
            <form onSubmit={handleSubmit(onSubmit)}>
                <span className="user-form__title">Edit user:</span>
                <TextInput name="firstName" placeholder={userState.user?.firstName!} isDisabled={true} />

                <TextInput name="lastName" placeholder={userState.user?.lastName!} isDisabled={true} />

                <TextInput name="email" placeholder={userState.user?.email!} isDisabled={true} />

                <RangeInput title="Select working hours %:" minRange={25} maxRange={100} step={5} value={hoursPerMonthValue} onChange={setHoursPerMonthValue} />

                <CheckboxInput
                    title="Select user permissions:"
                    options={options}
                    register={register('permissions')}
                    selected={checkedOptions}
                    setSelected={setCheckedOptions}
                    isMultipleChoice={true}
                    values={Permission}
                />
                <SmallButton type="submit" value="Confirm" />
            </form>
        </div>
    );
};