﻿import {RegisterOptions, UseFormRegister} from 'react-hook-form';

export interface TextInputProps {
    name: string;
    placeholder: string;
    register?: any;
    errors?: any;
}

export enum Permissions
{
    Create = 1,
    Update = 2,
    Delete = 4,
    Read = 8,
}

export interface CheckboxInputProps {
    options: Permissions[],
}