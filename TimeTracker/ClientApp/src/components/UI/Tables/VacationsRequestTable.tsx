import React, {useEffect, useState} from 'react';
import {useAppDispatch, useTypedSelector} from "../../../hooks";
import {Loader} from "../Loaders";
import {fetchRequests} from "../../../redux";
import {Checkbox} from "../Checkboxes";
import "./ApproversTable.css"
import moment from "moment";

export const VacationsRequestTable = () => {

    const dispatch = useAppDispatch()

    const selected = useState([]);

    const {requests,error,loading} = useTypedSelector(s=>s.vacations);

    const userId =
        useTypedSelector(s=>s.auth.user?.id);

    useEffect(()=>{
        dispatch(fetchRequests(userId!))
    },[])

    function approve(id:number,state:boolean){

    }

    return (
        <div style={{display:"flex",justifyContent:"center",marginTop:"80px"}}>
            <span>{error}</span>
            {loading?<Loader/>:
               <div className="requests-wrapper">
                   <div className="search-bar">
                       <input type="text" placeholder="search by email" className="input-search"/>
                       <div className="btn-group">
                           <button  className="btn-base btn-confirm">Approve selected</button>
                           <button  className="btn-base btn-decline">Decline selected</button>
                       </div>
                   </div>
                   {requests.map(u=>{
                       return u.user.vacations?.map(v=>{
                           const diff = moment(v.endDate).diff(v.startDate)
                          return <div className="request-item">
                              <Checkbox
                                  value={1}
                                  optionName={null}
                                  isChecked={false}
                                  onChange={()=>{}}
                              />
                              <span>{u.user.firstName} {u.user.lastName}</span>
                              <span>{u.user.email}</span>
                              <div className="btn-group">
                                  {!u.isApproved?<>
                                   <button onClick={()=>approve(u.id,true)} className="btn-base btn-confirm">Approve</button>
                                   <button onClick={()=>approve(u.id,false)} className="btn-base btn-decline">Decline</button>
                                  </>:<>
                                   <button onClick={()=>approve(u.id,false)} className="btn-base btn-decline">Undo</button>
                                  </>}

                              </div>
                              <button className="btn-base btn-info more-btn">more</button>
                              <div className="more-info">
                                  <span>Vacation for: {moment(diff).format("D")} days</span>
                                    <span>Start date: {moment(v.startDate).format("M/D/Y")}</span>
                                    <span>End date: {moment(v.endDate).format("M/D/Y")}</span>
                                     <span>Message: {v.message}</span>
                              </div>
                          </div>
                       });

                   })}


               </div>
            }

            {/*!loading&&requests.length===0?<span>empty</span>:""*/}

        </div>
    );
};


