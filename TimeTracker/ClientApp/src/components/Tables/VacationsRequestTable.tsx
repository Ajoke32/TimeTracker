import React, {useEffect} from 'react';
import "./ApproversTable.css"
import "./Table.css"
import {useAppDispatch, useTypedSelector} from "../../hooks";
import {fetchRequests, setVacationRequestSkip, setVacationRequestsTake} from "../../redux";
import {Loader} from "../UI";
import MessageModal from "@components/UI/Modals/MessageModal.tsx";
import {getApproverVacationString} from "../../utils/vacationHelper.ts";
import {H4} from "@components/Headings";
import Pager from "@components/Paging/Pager.tsx";

export const VacationsRequestTable = () => {

    const dispatch = useAppDispatch()

    const {vacationRequests,take,perPage,extensions,skip,error,loading} =
        useTypedSelector(s=>s.approverVacations);
    const userId =
        useTypedSelector(s=>s.auth.user?.id);

    useEffect(()=>{
        dispatch(fetchRequests({userId:userId!,take:take,skip:skip}))
    },[take,skip])

    
    
    return (
        <div  className="vacations-content__wrapper">
            <MessageModal />
            <span>{error && error}</span>
            {loading && vacationRequests.length === 0 ? <Loader />:
                <div className="vacations-content__inner">
                    <div className="search-bar">
                        <input type="text" placeholder="search by email" className="input-search"/>
                        <span>{loading&&"Working on it..."}</span>
                    </div>
                    {vacationRequests.length === 0 && <div className="empty info"><H4 value="You have no vacation requests"/></div>}
                    {vacationRequests.map(a=>{
                        return (
                            <div key={a.id} className="request-item">
                                <span>{a.vacation.user.firstName} {a.vacation.user.lastName}</span>
                                <span>{a.vacation.user.email}</span>
                                <span className={a.isDeleted?"archived":getApproverVacationString(a.isApproved!,'pending')}>
                                    {!a.isDeleted?getApproverVacationString(a.isApproved!,'Pending',true):"Archived"}
                                </span>
                                <a style={{textDecoration:"none"}} className="btn-base btn-info more-btn"
                                   href={`/vacation/details/${a.id}`}>
                                    Details
                                </a>
                            </div>)
                    })}
                </div>
            }
            {extensions?.count!>perPage&&<Pager take={take} skip={skip} setSkip={setVacationRequestSkip} setTake={setVacationRequestsTake}
                                               extensions={extensions} perPage={perPage}
            />}
        </div>
    );
};