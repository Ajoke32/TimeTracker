import React, {useEffect} from 'react';
import StepsElement from "../UI/Misc/StepsElement";
import ApproversTable from "../UI/Tables/ApproversTable";
import {fetchUsers} from "../../redux";
import "./AddUserForms.css"
import {Loader, SmallButton} from "../UI";
import {useAppDispatch, useTypedSelector} from "../../hooks";
import {addApprovers} from "../../redux/slices/approversSlice";

const AddApproversForm = () => {
    const username = "John Doe";

    const usersState = useTypedSelector(state => state.users);

    const approversState  = useTypedSelector(s=>s.approvers);

    const userState = useTypedSelector(s=>s.user);

    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(fetchUsers());
    },[])

    function handleSubmit(){
        if(userState.userId!==null)
        dispatch(addApprovers({approvers:approversState.approvers,userId:userState.userId}));
    }

    return (
        <div className="user-form__wrapper-inner">
            {approversState.loading?<Loader/>:""}
            <form>
                <StepsElement title="Step 2/2" currentStep={2}/>

                <span className="user-form__title">Select vacations approver(s) for {username}</span>
                {usersState.loading?<Loader/>:<ApproversTable users={usersState.users}/>}
                <div className="user-form__btn-wrapper">
                    <a href="/team">Later</a>
                    <SmallButton handleClick={handleSubmit} type="submit" value="Submit"/>
                </div>
            </form>
        </div>
    );
};

export default AddApproversForm;