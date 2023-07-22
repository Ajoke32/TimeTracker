import React, {useEffect, useState} from 'react';
import "./ApproversTable.css"
import moment from "moment";
import {useAppDispatch, useTypedSelector} from "../../hooks";
import {fetchRequests, updateApproverVacationState, updateVacationState} from "../../redux";
import {BaseButton, Checkbox, Loader} from "../UI";





export const VacationsRequestTable = () => {

    const dispatch = useAppDispatch()

    const [approves,setApproveId] = useState<number[]>([]);

    const [selected,setSelected] = useState<number[]>([]);

    const {vacationRequests,updated,error,loading} =
        useTypedSelector(s=>s.approverVacations);

    const userId =
        useTypedSelector(s=>s.auth.user?.id);

    useEffect(()=>{
        dispatch(fetchRequests(userId!))
    },[])

    useEffect(()=>{
        if(updated){
            dispatch(updateVacationState(approves))
        }
    },[updated])

    function approve(ids:number[],state:boolean){
        setApproveId(ids);
        dispatch(updateApproverVacationState({id:ids,isApproved:state,approverId:userId!}))
    }


    function select(id:number){
        if(selected.includes(id)){
            setSelected(selected.filter(s=>s!==id));
            return;
        }
        setSelected([...selected,id]);
    }

    return (
        <div style={{display:"flex",justifyContent:"center",marginTop:"80px"}}>
            <span>{error&&error}</span>
            {loading&&vacationRequests.length===0?<Loader />:
                <div className="requests-wrapper">
                    <div className="search-bar">
                        <input type="text" placeholder="search by email" className="input-search"/>
                        <span>{loading&&"Working on it..."}</span>
                        <div className="btn-group">
                            <BaseButton onClick={()=>approve(selected,true)} text={"Approve selected"}
                                        disabled={selected.length===0} btnStyle={'confirm'} />
                            <BaseButton onClick={()=>approve(selected,false)} text={"Decline selected"}
                                        disabled={selected.length===0} btnStyle={'decline'} />
                        </div>
                    </div>
                    {vacationRequests.map(a=>{
                        const diff = moment(a.vacation.endDate).diff(a.vacation.startDate);
                        return <div key={a.id} className="request-item">
                            <Checkbox
                                value={a.id}
                                optionName={""}
                                isChecked={selected.includes(a.vacation.id)}
                                onChange={()=>{select(a.vacation.id)}}
                                disabled={a.isApproved!==null&&a.isApproved}
                            />
                            <span>{a.vacation.user.firstName} {a.vacation.user.lastName}</span>
                            <span>{a.vacation.user.email}</span>
                            <div className="btn-group">
                                {a.isApproved===null?
                                    <>
                                        <button onClick={()=>approve([a.vacation.id],false)} className="btn-base btn-decline">Decline</button>
                                        <button onClick={()=>approve([a.vacation.id],true)} className="btn-base btn-confirm">Approve</button>
                                    </>:<span className={a.isApproved?"approved":"declined"}>
                                            {a.isApproved?"Approved":"Declined"}</span>
                                }
                            </div>
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


