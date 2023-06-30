import {RegisterOptions, UseFormRegister} from 'react-hook-form';

export interface TextInputProps {
    name: string;
    placeholder: string;
    register: any;
    errors: any;
}

export interface PasswordInputProps {
    name: string;
    placeholder: string;
    register: any;
    errors: any;
}