import React, {useEffect} from 'react';
import {useAppDispatch, useTypedSelector} from "../../../hooks";
import {fetchRequests} from "../../../redux";
import {Loader} from "../Loaders";

export const VacationsRequestTable = () => {

    const dispatch = useAppDispatch()

    const {requests,error,loading} = useTypedSelector(s=>s.vacations);

    const userId = useTypedSelector(s=>s.auth.user?.id);

    useEffect(()=>{
        dispatch(fetchRequests(userId!))
    },[])

    function approve(id:number,state:boolean){

    }

    return (
        <div style={{display:"flex",justifyContent:"center"}}>
            {loading?<Loader/>:
                <table style={{borderCollapse:"collapse",textAlign:"center",marginTop:"50px",width:"80%"}}>
                    <thead>
                     <tr>
                         <td style={{padding:"5px",border:"1px solid black"}}>User</td>
                         <td style={{padding:"5px",border:"1px solid black"}}>Vacation state</td>
                         <td style={{padding:"5px",border:"1px solid black"}}>Actions</td>
                     </tr>
                    </thead>
                    <tbody>
                        {requests.map(r=>{
                            return <tr>
                                <td style={{padding:"5px",border:"1px solid black"}} key={r.user.id}>{r.user.firstName}</td>
                                <td style={{padding:"5px",border:"1px solid black"}} key={`${r.user.id}-2`}>
                                    {r.isApproved?"approved":"not approved"}
                                </td>
                                <td style={{padding:"5px",border:"1px solid black"}}>
                                    <button onClick={()=>{
                                        approve(r.id,true);
                                    }}>Approve</button>

                                    <button style={{marginLeft:"5px"}} onClick={()=>{
                                        approve(r.id,false);
                                    }}>Decline
                                    </button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            }

            {!loading&&requests.length===0?<span>empty</span>:""}

        </div>
    );
};


