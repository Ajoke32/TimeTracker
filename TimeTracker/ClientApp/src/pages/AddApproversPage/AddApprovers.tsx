import { useTypedSelector, useAppDispatch } from '@hooks/customHooks';
import { useEffect } from 'react';
import { AddApproversForm } from "@components/UserForms";
import { useParams } from 'react-router-dom'
import { fetchUser } from '@redux/slices';


export const AddApprovers = () => {
    const dispatch = useAppDispatch();
    const { user } = useTypedSelector(state => state.user)
    const { userId } = useParams();

    useEffect(() => {
        if (!user)
            dispatch(fetchUser(parseInt(userId!)))
    }, [])

    return (
        <div className="user-form__wrapper">
            <AddApproversForm />
        </div>
    )

};