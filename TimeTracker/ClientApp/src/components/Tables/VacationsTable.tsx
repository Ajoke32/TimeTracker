import {useEffect, useState} from 'react';
import {useAppDispatch, useTypedSelector} from "../../hooks";
import {Loader} from "../UI";
import './Table.css'
import './VacationsTable.css'
import {changeVacationState, fetchUserVacations, updateVacation} from "../../redux";
import moment from "moment/moment";
import {getStringVacationState} from "../../utils/vacationHelper.ts";
import {Vacation, VacationStateEnum} from "@redux/types";
import CancelVacationModal from "@components/UI/Modals/CancelVacationModal.tsx";


export const VacationsTable = () => {

    const {error,loading,vacations} = useTypedSelector(s=>s.vacations);
    const dispatch = useAppDispatch();
    const userId = useTypedSelector(u=>u.auth.user?.id);
    const [isOpen,setIsOpen]=useState<boolean>(false);
    const [clicked,setClicked] = useState<Vacation>();

    useEffect(()=>{
        dispatch(fetchUserVacations(userId!))
    },[]);

    function handleSelect(vacation:Vacation){
        setIsOpen(true);
        setClicked(vacation);
    }
    function handleCancel(){
        dispatch(changeVacationState({id:clicked?.id!,state:VacationStateEnum.Canceled}));
        setIsOpen(false);
    }

    function handleVacationEdit(){
        dispatch(updateVacation({...clicked!,userId:userId!}));
        setIsOpen(false);
    }


    return (
        <div style={{display:"flex",justifyContent:"center",marginTop:"80px"}}>
            <CancelVacationModal setVacation={setClicked} vacation={clicked!} onEdit={handleVacationEdit} onSuccess={handleCancel} isOpen={isOpen} />
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
                            <span>Action</span>
                    </div>
                    {vacations.map(v=>{
                        return (
                        <div key={v.id} className="vacation-item">
                            <span>{moment(v.startDate).format("M/D/Y")}</span>
                            <span>{moment(v.endDate).format("M/D/Y")}</span>
                            <span className={v.vacationState.toLowerCase()}>{getStringVacationState(v.vacationState)}</span>
                            <button onClick={()=>handleSelect(v)} style={{marginRight:"5px"}} className="btn-base btn-decline">
                                Cancel
                            </button>
                        </div>
                        )
                    })}
                </div>
            }
        </div>
    );
};


