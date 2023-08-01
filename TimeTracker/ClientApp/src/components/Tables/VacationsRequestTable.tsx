import {useEffect, useState} from 'react';
import "./ApproversTable.css"
import "./Table.css"
import moment from "moment";
import {useAppDispatch, useTypedSelector} from "../../hooks";
import {fetchRequests, updateVacationState} from "../../redux";
import { Loader} from "../UI";
import MessageModal from "@components/UI/Modals/MessageModal.tsx";
import {modalOpen} from "@redux/slices/messageModalSlice.ts";
import {AiOutlineCheck,AiOutlineClose} from  "react-icons/ai";
import {getStringVacationState} from "../../utils/vacationHelper.ts";


export const VacationsRequestTable = () => {

    const dispatch = useAppDispatch()

    const [approveId,setApproveId] = useState<number>();

    const {vacationRequests,updated,error,loading} =
        useTypedSelector(s=>s.approverVacations);

    const userId =
        useTypedSelector(s=>s.auth.user?.id);

    useEffect(()=>{
        dispatch(fetchRequests(userId!))
    },[])

    useEffect(()=>{
        if(updated){
            dispatch(updateVacationState(approveId!));
        }
    },[updated])


    function approve(id:number,state:boolean){
        setApproveId(id);
        dispatch(modalOpen({userId:userId!,vacationId:id,state:state}));
    }



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
                        const diff = moment(a.vacation.endDate).diff(a.vacation.startDate);
                        return <div key={a.id} className="request-item">
                            <span>{a.vacation.user.firstName} {a.vacation.user.lastName}</span>
                            <span>{a.vacation.user.email}</span>
                            <div className="btn-group">
                                        <button onClick={()=>approve(a.vacation.id,false)} className="btn-base btn-decline">
                                            Decline
                                        </button>
                                        <button onClick={()=>approve(a.vacation.id,true)} className="btn-base btn-confirm">
                                            Approve
                                        </button>
                            </div>
                            <span className={getStringVacationState(a.vacation.vacationState)}>
                                        {getStringVacationState(a.vacation.vacationState)}
                                    </span>
                            <button className="btn-base btn-info more-btn">more</button>
                            <div className="more-info">
                                <span>Vacation for: {moment(diff).format("D")} days</span>
                                <span>Start date: {moment(a.vacation.startDate).format("M/D/Y")}</span>
                                <span>End date: {moment(a.vacation.endDate).format("M/D/Y")}</span>
                                <span>Message: {a.vacation.message}</span>
                            </div>
                        </div>
                    })}

                </div>
            }

        </div>
    );
};


