import  {useEffect} from 'react';
import {useAppDispatch, useTypedSelector} from "../../hooks";
import {Loader} from "../UI";
import './Table.css'
import './VacationsTable.css'
import {fetchUserVacations} from "../../redux";
import moment from "moment/moment";


export const VacationsTable = () => {

    const {error,loading,vacations} = useTypedSelector(s=>s.vacations);
    const dispatch = useAppDispatch();
    const userId = useTypedSelector(u=>u.auth.user?.id);

    useEffect(()=>{
        dispatch(fetchUserVacations(userId!))
    },[]);

    return (
        <div style={{display:"flex",justifyContent:"center",marginTop:"80px"}}>
            <span>{error&&error}</span>
            {loading?<Loader/>:
                <div className="table-wrapper">
                    <div className="requests-wrapper">
                        <div className="search-bar">
                            <input type="text" placeholder="search by date" className="input-search"/>
                            <a href="/vacation/create" className='btn-small'>Create vacation</a>
                        </div>
                    </div>
                    <div className="vacation-item head">
                            <span>Start date</span>
                            <span>End date</span>
                            <span>State</span>
                    </div>
                    {vacations.map(v=>{
                        const style = v.vacationState==null?"pending":v.vacationState?"approved":"declined";
                        return (
                        <div className="vacation-item">
                            <span>{moment(v.startDate).format("M/D/Y")}</span>
                            <span>{moment(v.endDate).format("M/D/Y")}</span>
                            <span className={style}>{v.vacationState==null?"Pending":v.vacationState?"Approved":"Declined"}</span>
                        </div>
                        )
                    })}
                </div>
            }
        </div>
    );
};


