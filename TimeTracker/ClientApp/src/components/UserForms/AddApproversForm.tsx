import { useState, useEffect } from 'react';
import { ApproversTable } from "../Tables";
import { fetchApprovers, addApprovers, fetchUser, users } from "../../redux";
import { SmallButton, StepsElement, Loader } from "../UI";
import { useAppDispatch, useTypedSelector } from "../../hooks";

import "./AddUserForms.css"

export const AddApproversForm = ({ step }: { step?: number }) => {
    const dispatch = useAppDispatch();
    const { user } = useTypedSelector(state => state.user);
    const approversState = useTypedSelector(state => state.approvers);

    const [approvers, setApprovers] = useState<number[]>([]);
    const [fetched, setFetched] = useState<number>(0);
    const  {filters} = useTypedSelector(s=>s.userFilters);
    const handleClick = () => {
        dispatch(addApprovers({ approvers: approvers, userId: user!.id! }))
    }

    const loadMore = () => {
        dispatch(fetchApprovers({ take: 5, skip: fetched,
            userId: user!.id!,group:filters.group }));
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
                {step ? <StepsElement title="Step 2/2" currentStep={2} /> : <></>}

                <span className="user-form__title">Select vacations approver(s) for {`${user?.firstName} ${user?.lastName}`}</span>
                {approversState.loading ?
                    <Loader /> :
                    <>
                        <ApproversTable users={approversState.approversList} onChange={setApprovers} approvers={approvers} />
                        <button onClick={() => { loadMore() }}>Load more</button>
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