import React, {ChangeEvent, useEffect, useState} from 'react';
import {Navigate, useParams} from "react-router-dom";
import {useAppDispatch, useTypedSelector} from "@hooks/customHooks.ts";
import {
    deleteByVacationId,
    fetchApproverVacationById,
    updateApproverVacationState,
    updateVacationState
} from "@redux/slices";
import './VacationDetails.css'
import moment from "moment";
import {VacationStateEnum} from "@redux/types";
import {getApproverVacationString, isVacationAnswered, vacationNotEqual} from "../../utils/vacationHelper.ts";

const VacationDetails = () => {

    const dispatch = useAppDispatch();
    const { id } = useParams();
    const [message,setMessage] = useState<string>("");
    const [error,setError]= useState<string>("");
    const [approveId,setApproveId] = useState<number>();
    const userId = useTypedSelector(s=>s.auth.user?.id);
    const {updated,deleted,approverVacation:av,loading}
        = useTypedSelector(s=>s.approverVacations);
    function notFound(){
        if(!id){
            return <Navigate to="/notFound" />
        }
    }
    function messageInputHandle(e:ChangeEvent<HTMLTextAreaElement>){
        setMessage(e.target.value)
    }

    useEffect(()=>{
        if(updated){
            dispatch(updateVacationState(approveId!));
        }
    },[updated])

    useEffect(() => {
        notFound();
        if(id) {
            dispatch(fetchApproverVacationById(parseInt(id)));
        }
    }, [deleted]);
    function approve(id:number,state:boolean){
        setApproveId(id);
        if(!state&&message===""){
            setError("message field required")
            return;
        }
        dispatch(updateApproverVacationState({
            approverId:userId!,vacationId:av?.vacation.id!,
            isApproved:state!,message:message}));
        setMessage("");
    }

    function archive(vacationId:number){
        dispatch(deleteByVacationId(vacationId))
    }

    return (
        <>
            {<div className="vacation-card-wrapper">
                    <div className="vacation-card">
                        <div className="user-info">
                            <div className="vacation-days">
                            <span>{av?.vacation?.user.firstName} {av?.vacation?.user.lastName}</span>
                                <span style={{color:"#006494"}}>({av?.vacation?.user.email})</span>
                            </div>
                            <span className={getApproverVacationString(av?.isApproved!,av?.vacation?.vacationState.toLowerCase()!)}>
                                {getApproverVacationString(av?.isApproved!,av?.vacation?.vacationState.toLowerCase()!)}
                                {(!isVacationAnswered(av?.vacation?.vacationState!)
                                        &&vacationNotEqual(VacationStateEnum.Pending,av?.vacation?.vacationState!)&&av?.isApproved===null)&&' by user'}
                                {av?.isDeleted&&<span style={{color:"#0aa9ff"}}> (archived) </span>}
                            </span>
                        </div>
                        <div className="vacation-info">
                            <div className="vacation-days">
                                <span>Vacation for: {moment(moment(av?.vacation?.endDate).diff(av?.vacation?.startDate)).format("D")} days</span>
                                <span style={{color:"#006494"}}>({moment(av?.vacation?.startDate).format("M/D/Y")} - {moment(av?.vacation?.endDate).format("M/D/Y")})</span>
                            </div>
                            <span>Message: {av?.vacation?.message===''?"empty":av?.vacation?.message}</span>
                            <span>Available vacation days: {av?.vacation?.user.vacationDays}</span>
                        </div>
                        {(av?.isApproved===null&&!av.isDeleted&&av.vacation.vacationState!==VacationStateEnum.Declined)&&
                          <>
                              <textarea value={message} onChange={messageInputHandle} style={{height:"150px"}} placeholder="Message"></textarea>
                              <span>{error}</span>
                              <div className="btn-group" style={{alignSelf:"self-end"}}>
                                  {(av?.vacation?.vacationState===VacationStateEnum.Canceled)?
                                      <button onClick={()=>archive(av?.vacation?.id)} className="btn-base bth-archive">
                                          Archive
                                      </button>
                                      : <>
                                          <button onClick={()=>approve(av?.vacation?.id!,false)} className="btn-base btn-decline">
                                              Decline
                                          </button>
                                          <button onClick={()=>approve(av?.vacation?.id!,true)} className="btn-base btn-confirm">
                                              Approve
                                          </button>
                                      </>}
                              </div>
                          </>
                        }

                    </div>
                </div>}
        </>
    );
};

export default VacationDetails;
