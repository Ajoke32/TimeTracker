import React, {useEffect, useState} from 'react';
import {useAppDispatch, useTypedSelector} from "../../hooks";
import {Loader} from "../UI";
import './Table.css'
import './VacationsTable.css'
import {
    addVacationFilter,
    changeVacationState,
    fetchUserVacations, setVacationRequestPerPage, setVacationsPerPage, setVacationsSkip, setVacationsTake,
    updateToDefault,
    updateVacation,
    vacationFiltersToDefault
} from "../../redux";
import moment from "moment/moment";
import {getStringVacationState} from "../../utils/vacationHelper.ts";
import {Vacation, VacationStateEnum, WorkedFetchType} from "@redux/types";
import CancelVacationModal from "@components/UI/Modals/CancelVacationModal.tsx";
import {H4} from "@components/Headings";
import Filter from "@components/Tables/Filters.tsx";
import Pager from "@components/Paging/Pager.tsx";
import PerPageChanger from "@components/UI/Inputs/PerPageChanger.tsx";
import warningImg from '../../assets/images/warning.png'
import info from '../../assets/images/info.png'
import info_two from '../../assets/images/info2.png'
import {AddVacationForm} from "@components/VacationForms";

export const VacationsTable = () => {

    const {error,group,take,skip,perPage,extensions,updated,loading,vacations}
        = useTypedSelector(s=>s.vacations);


    const dispatch = useAppDispatch();
    const userId = useTypedSelector(u=>u.auth.user?.id);
    const [isOpen,setIsOpen]=useState<boolean>(false);

    const [isAddVacationOpen,setIsAddVacationOpen]=useState<boolean>(false);

    const [clicked,setClicked] = useState<Vacation>();
    const [selected,setSelected] = useState<string>("all")
    useEffect(()=>{
        dispatch(fetchUserVacations({userId:userId!,take:take,skip:skip,group:group} as WorkedFetchType))
    },[group,take]);

    useEffect(() => {
        if(updated!==null){
            dispatch(updateToDefault(clicked?.id!));
        }
    }, [updated]);
    function handleSelect(vacation:Vacation){
        setClicked(vacation);
        setIsOpen(true);
    }
    function handleCancel(){
        dispatch(changeVacationState({id:clicked?.id!,state:VacationStateEnum.Canceled}));
        setIsOpen(false);
    }

    function handleVacationEdit(){
        dispatch(updateVacation({...clicked!,userId:userId!}));
        setIsOpen(false);
    }

    function handleYearFilter(e:React.ChangeEvent<HTMLSelectElement>){
        if(e.target.value=="all"){
            dispatch(vacationFiltersToDefault());
            setSelected(e.currentTarget.value);
            return;
        }
        dispatch(addVacationFilter({
            operator:"contains",
            value:e.currentTarget.value,
            property:"StartDate",
            connector:"and"
        }));
        setSelected(e.currentTarget.value);
    }
    function handleVacationCreateClick(){
        setIsAddVacationOpen(true);
    }
    return (
        <>
        <CancelVacationModal clicked={clicked!} setIsOpen={setIsOpen} setVacation={setClicked} vacation={clicked!} onEdit={handleVacationEdit} onSuccess={handleCancel} isOpen={isOpen} />
            <AddVacationForm setIsOpen={setIsAddVacationOpen} isOpen={isAddVacationOpen} />
            <div className="vacations-content__wrapper">

                <div className="requests-wrapper">
                    <div className="search-bar">
                        <div style={{display:"flex",gap:"5px",alignItems:"center"}}>
                            <select className="input-search" value={selected} onChange={(e)=>handleYearFilter(e)}>
                                <option value="all">all</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                            </select>
                            <PerPageChanger setPerPage={setVacationsPerPage} perPage={perPage} count={extensions?.count!} />
                        </div>
                        <a  className='btn-small' onClick={handleVacationCreateClick}>Create vacation</a>
                    </div>
                </div>
                {vacations.length === 0 && <div className="empty info"><H4 value="You have no active vacations"/></div>}
                {loading?<Loader/>:vacations.map(v=>{
                    return (
                        <div key={v.id} className="vacation-item">
                            <span>{moment(v.startDate).format("M/D/Y")}</span>
                            <span>{moment(v.endDate).format("M/D/Y")}</span>
                            <span style={{display:"flex",position:"relative",alignItems:'center',gap:"8px"}} className={`${v.vacationState===VacationStateEnum.Edited?"pending":v.vacationState.toLowerCase()}`}>
                                {v.vacationState===VacationStateEnum.Edited?"Pending":getStringVacationState(v.vacationState)}
                                {v.approverMessage&&<>
                                    <img className="tooltip" style={{width:"25px",height:"25px"}} src={info} alt="info"/>
                                    <span className="tooltip-text">{v.approverMessage}</span>
                                </>}

                            </span>
                            {v.vacationState!==VacationStateEnum.Declined
                            &&v.vacationState!==VacationStateEnum.Canceled
                                ?<button onClick={() => handleSelect(v)} style={{marginRight: "5px"}}
                                         className="btn-base btn-decline">
                                    Cancel
                                </button>
                                :<span style={{color:"#001d3d"}} className={"btn-base"}>No action</span>}
                        </div>
                    )
                })}


                {extensions?.count!>perPage&&
                    <Pager capacity={2} take={take} skip={skip} perPage={perPage}  setSkip={setVacationsSkip} extensions={extensions} setTake={setVacationsTake} />}
            </div>
        </>
    );
};


