import React, {useState} from 'react';
import {CheckboxInput, SmallButton, TextInput} from "../UI";
import {RangeInput} from "../UI/Inputs/RangeInput";
import {useAppDispatch} from "../../hooks";
import {SubmitHandler, useForm} from "react-hook-form";
import {UserAddType} from "../../redux/types";

type Inputs = {
    firstName: string,
    lastName: string,
    email: string,
    hoursPerMonth: number,
    permissions: number,
    vacationDays: number,
}


enum Permissions {
    Create = 1,
    Update = 2,
    Delete = 4,
    Read = 8,
}

const options: Permissions[] = [
    Permissions.Create,
    Permissions.Update,
    Permissions.Delete,
    Permissions.Read,
];

const EditUserForm = (user : UserAddType) => {
    const dispatch = useAppDispatch();
    const [checkedOptions, setCheckedOptions] = useState<number>(user.permissions);
    const [hoursPerMonthValue, setHoursPerMonthValue] = useState<number>(user.hoursPerMonth);


    const { register, handleSubmit,
        formState: { errors }, reset } = useForm<Inputs>({
        mode: 'onBlur',
        defaultValues: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            hoursPerMonth: hoursPerMonthValue,
            permissions: checkedOptions,
            vacationDays: user.vacationDays,
        }
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        data.permissions = checkedOptions;
        data.hoursPerMonth = parseInt((hoursPerMonthValue).toString())
        console.log(data)
        reset();

    }
    
    return (
        <div className="user-form__wrapper-inner edit-form__wrapper-inner">
            <form onSubmit={handleSubmit(onSubmit)}>
                <span className="user-form__title">Edit user:</span>
                <TextInput name="firstName" placeholder="First name"
                           register={register("firstName", { required: "First name can't be empty!" })}
                           errors={errors.firstName} isDisabled={true}/>

                <TextInput name="lastName" placeholder="Last name"
                           register={register("lastName", { required: "Last name can't be empty!" })}
                           errors={errors.lastName} isDisabled={true}/>

                <TextInput name="email" placeholder="Enter email"
                           register={register("email", { required: "Email name can't be empty!" })}
                           errors={errors.email} isDisabled={true}/>

                {/*<RadioButton title="Select working hours percentage:" options={radioOptions}
                    name="hoursPerMonth"
                    register={register("hoursPerMonth")} />*/}

                <RangeInput title="Select working hours %:" minRange={25} maxRange={100} step={5} value={hoursPerMonthValue} register={register("hoursPerMonth")} onChange={setHoursPerMonthValue}/>

                <CheckboxInput 
                    title="Select user permissions:" 
                    options={options}
                    register={register('permissions')}
                    selected={checkedOptions}
                    setSelected={setCheckedOptions}
                    isMultipleChoice={true}
                    values={Permissions}
                />
                <SmallButton type="submit" value="Confirm"/>
            </form>
        </div>
    );
};

export default EditUserForm;