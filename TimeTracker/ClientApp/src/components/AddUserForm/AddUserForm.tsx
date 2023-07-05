import "./AddUserForm.css"
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextInput, CheckboxInput, SmallButton } from "../UI";
import { useAppDispatch, useTypedSelector } from "../../hooks";
import { RadioButton } from "../UI/RadioButtons"

type Inputs = {
    email: string
    firstName: string
    lastName: string
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

export const AddUserForm = () => {
    const dispatch = useAppDispatch();
    const { register, handleSubmit,
        formState: { errors }, reset } = useForm<Inputs>({
            mode: 'onBlur',
            defaultValues: {
                email: '',
                firstName: '',
                lastName: ''
            }
        });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        //dispatch(login(data));
        reset();
    }
    return (
        <div className="user-form__wrapper-inner">
            <form>
                <TextInput name="firstName" placeholder="First name" />

                <TextInput name="lastName" placeholder="Last name" />

                <TextInput name="email" placeholder="Enter email" />
                
                <RadioButton title="Select working hours percentage:" options={[ '50%', '60%', '70%', '80%', '90%', '100%', ]}/>
                
                <CheckboxInput title="Select user permissions:" options={options}/>


                <SmallButton type="submit" value="Add user" />
            </form>
        </div>
    );
};