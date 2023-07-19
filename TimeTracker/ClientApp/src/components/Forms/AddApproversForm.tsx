import { useState, useEffect } from 'react';
import { ApproversTable } from "../Tables";
import { fetchApprovers, addApprovers } from "../../redux";
import { SmallButton, StepsElement, Loader } from "../UI";
import { useAppDispatch, useTypedSelector } from "../../hooks";

import "./AddUserForms.css"

const AddApproversForm = () => {
    const dispatch = useAppDispatch();
    const userState = useTypedSelector(state => state.user);
    const approversState = useTypedSelector(state => state.approvers);

    const currentUser = `John Doe`

    const [approvers, setApprovers] = useState<number[]>([]);
    const [fetched, setFetched] = useState<number>(0);

    const handleClick = () => {
        dispatch(addApprovers({approvers: approvers, userId: userState.userId!}))
    }

    const loadMore = () => {
        dispatch(fetchApprovers({ take: 5, skip: fetched, activated: true, userId: userState.userId!}));
    }

    useEffect(() => {
        loadMore();
    }, [])

    useEffect(() => {
        setFetched(approversState.approversList.length)
    }, [approversState.approversList.length])

    return (
        <div className="user-form__wrapper-inner">
            <form onSubmit={(e) => { e.preventDefault() }}>
                <StepsElement title="Step 2/2" currentStep={2} />
                
                {/*<span className="user-form__title">Select vacations approver(s) for {`${userState.user?.firstName} ${userState.user?.lastName}`}</span>*/}
                {approversState.loading ?
                    <Loader /> :
                    <>
                        <ApproversTable users={approversState.approversList} onChange={setApprovers} approvers={approvers} />
                        <button onClick={()=>{loadMore()}}>Load more</button>
                    </>
                }
                <div className="user-form__btn-wrapper">
                    <a href="/team">Later</a>
                    <SmallButton type="submit" value="Submit" handleClick={handleClick} />
                </div>
            </form>
        </div>
    );
};

export default AddApproversForm;