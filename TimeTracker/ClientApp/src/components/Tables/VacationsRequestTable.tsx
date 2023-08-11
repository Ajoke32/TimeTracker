import {useEffect} from 'react';
import "./ApproversTable.css"
import "./Table.css"
import {useAppDispatch, useTypedSelector} from "../../hooks";
import {fetchRequests} from "../../redux";
import {Loader} from "../UI";
import MessageModal from "@components/UI/Modals/MessageModal.tsx";
import {getApproverVacationString} from "../../utils/vacationHelper.ts";
import {VacationStateEnum} from "@redux/types";

export const VacationsRequestTable = () => {

    const dispatch = useAppDispatch()

    const {vacationRequests,error,loading} =
        useTypedSelector(s=>s.approverVacations);
    const userId =
        useTypedSelector(s=>s.auth.user?.id);

    useEffect(()=>{
        dispatch(fetchRequests(userId!))
    },[])


    return (
        <div style={{display:"flex",justifyContent:"center",marginTop:"80px"}}>
            <MessageModal />
            <span>{error&&error}</span>
            {loading&&vacationRequests.length===0?<Loader />:
                <div className="table-wrapper">
                    <div className="search-bar">
                        <input type="text" placeholder="search by email" className="input-search"/>
                        <span>{loading&&"Working on it..."}</span>
                    </div>
                    {vacationRequests.length===0&&<div className="empty info">You have no requests</div>}
                    {vacationRequests.map(a=>{
                        return <div key={a.id} className="request-item">
                            <span>{a.vacation.user.firstName} {a.vacation.user.lastName}</span>
                            <span>{a.vacation.user.email}</span>
                            <span className={a.isDeleted?"archived"
                                :a.vacation.vacationState==VacationStateEnum.Declined
                                    ?'declined':getApproverVacationString(a.isApproved!,'pending')}>
                                        {(!a.isDeleted&&a.vacation.vacationState!==VacationStateEnum.Declined)
                                            ?getApproverVacationString(a.isApproved!,'Pending',true)
                                            :a.vacation.vacationState==VacationStateEnum.Declined?"Declined":"Archived"}
                                    </span>
                            <a style={{textDecoration:"none"}} className="btn-base btn-info more-btn"
                               href={`/vacation/details/${a.id}`}>
                                Details
                            </a>
                        </div>
                    })}

                </div>
            }

        </div>
    );
};