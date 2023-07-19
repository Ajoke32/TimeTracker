import React, {useEffect, useState} from 'react';
import {useAppDispatch, useTypedSelector} from "../../../hooks";
import {Loader} from "../Loaders";
import {Checkbox} from "../Checkboxes";
import "./ApproversTable.css"
import moment from "moment";
import {fetchRequests, updateApproverVacationState} from "../../../redux";



export const VacationsRequestTable = () => {

    const dispatch = useAppDispatch()

    const selected = useState([]);

    const {vacationRequests,error,loading} =
        useTypedSelector(s=>s.approverVacations);

    const userId =
        useTypedSelector(s=>s.auth.user?.id);

    useEffect(()=>{
        dispatch(fetchRequests(userId!))
    },[])


    function approve(id:number,state:boolean){
        dispatch(updateApproverVacationState({id:id,isApproved:state,approverId:userId!}))
    }

    return (
        <div style={{display:"flex",justifyContent:"center",marginTop:"80px"}}>
            <span>{error&&error}</span>
            {loading&&vacationRequests.length===0?<Loader />:
               <div className="requests-wrapper">
                   <div className="search-bar">
                       <input type="text" placeholder="search by email" className="input-search"/>
                       <div className="btn-group">
                           <button  className="btn-base btn-confirm disabled" disabled={true}>Approve selected</button>
                           <button  className="btn-base btn-decline disabled" disabled={true}>Decline selected</button>
                       </div>
                   </div>
                   {vacationRequests.map(a=>{
                           const diff = moment(a.vacation.endDate).diff(a.vacation.startDate);
                          return <div key={a.id} className="request-item">
                              <Checkbox
                                  value={1}
                                  optionName={null}
                                  isChecked={false}
                                  onChange={()=>{}}
                              />
                              <span>{a.vacation.user.firstName} {a.vacation.user.lastName}</span>
                              <span>{a.vacation.user.email}</span>
                              <span className={a.isApproved?"approved":"declined"}>{a.isApproved?"Approved":"Declined"}</span>
                              <div className="btn-group">
                                   <button onClick={()=>approve(a.vacation.id,true)} className="btn-base btn-confirm">Approve</button>
                                   <button onClick={()=>approve(a.vacation.id,false)} className="btn-base btn-decline">Decline</button>
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

            {/*!loading&&requests.length===0?<span>empty</span>:""*/}

        </div>
    );
};


