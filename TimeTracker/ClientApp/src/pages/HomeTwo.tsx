import React, {useEffect, useState} from 'react';
import {useAppDispatch, useTypedSelector} from "@hooks/customHooks.ts";
import {fetchWorkedHoursStatistic, fetchWorkPlans} from "@redux/slices";
import {Loader} from "@components/UI";
import ProgressCircle from "@components/Graphics/ProgressCircle.tsx";
import "./HomePage.css"
import moment from "moment";
import Chart from "./Chart.tsx";


interface HoursStatistic{
    need:number,
    actuallyWorked:number
}
const HomeTwo = () => {
    console.log("home rendedr");
    const stats:HoursStatistic = {
        need:0,
        actuallyWorked:0
    }

    const dispatch = useAppDispatch();
    const {user} = useTypedSelector(s => s.auth);
    const {hoursToWork, loading} = useTypedSelector(s => s.workedHours);
    const {workPlans, loading: plansLoading} = useTypedSelector(s => s.calendar)
    useEffect(() => {
        dispatch(fetchWorkedHoursStatistic({userId: user?.id!, date: new Date()}));
        dispatch(fetchWorkPlans({
            userIds: [user?.id!], dateRange: {
                startDate: moment().format("YYYY-MM-DDT00:00:00"),
                endDate: moment().add(7,"days").format("YYYY-MM-DDT00:00:00"),
            }
        }))
    }, []);
    useEffect(() => {
        if(hoursToWork){
            setHoursFor({
                need:Number(hoursToWork?.needToWorkToday!),
                actuallyWorked:Number(hoursToWork?.actuallyWorkedToday!)
            })
        }
    }, [hoursToWork]);


    const [hoursFor,setHoursFor] = useState<HoursStatistic>(stats);
    const [selectValue,setSelectValue] = useState<string>("today");
    function handleSelectChange(e:React.ChangeEvent<HTMLSelectElement>){
        if (e.currentTarget.value==="today"){
            setHoursFor({
                need:Number(hoursToWork?.needToWorkToday!),
                actuallyWorked:Number(hoursToWork?.actuallyWorkedToday!)
            });
            setSelectValue("today");
        }else{
            setHoursFor({
                need:Number(hoursToWork?.needToWork!),
                actuallyWorked:Number(hoursToWork?.actuallyWorked!)
            });
            setSelectValue("month");
        }
    }

    return (
        <div className="home-wrapper">
            <div className={"progress-wrapper"} style={{justifyContent:`${loading?"center":""}`}}>
                {loading ? <Loader/> :
                    <>
                        <div className={"worked-hours-options"}>
                            <h2>Hours worked for</h2>
                            <select onChange={(e)=>handleSelectChange(e)}
                                    value={selectValue}>
                                <option value="today">today</option>
                                <option value="month">month</option>
                            </select>
                        </div>
                        {<ProgressCircle
                            percents={hoursFor.actuallyWorked * 100 / hoursFor.need} dependency={selectValue}/>}
                    </>
                }
            </div>
            <div className={"work-plans-wrapper"}>
                <h2>Today plans</h2>
                {plansLoading ? <Loader/> :<div className="work-plans">
                    {workPlans.currentMonth.map(c => {
                        return c.workPlans.filter(wp=>moment(wp.date).isSame(new Date(),'day')).map(w => {
                            return <div className="work-plan" key={w.id}>
                                <div>{moment(w.startTime, 'hh:mm').format("hh:mm")} -- {moment(w.endTime, 'hh:mm').format("hh:mm")} </div>
                            </div>
                        })
                    })}
                    {workPlans.currentMonth.length==0?
                        <div className="work-plan" style={{fontFamily:"sans-serif",fontSize:"18px"}}>you have no plans for today</div>:""}
                </div> }
                <div className={"push-plan"}>
                    <form action="">
                        <input style={{padding:"5px"}} className={"time-input"} type="time"/>
                         <span>-</span>
                        <input style={{padding:"5px"}} className={"time-input"} type="time"/>
                        <input style={{border:"none",borderRadius:"15px",padding:"5px 10px",color:'white',cursor:"pointer"}}
                               className={"btn-confirm"} type="submit" value="push plan"/>
                    </form>
                </div>
            </div>

            <div className={"vacation-wrapper"}>
                <form>
                    <input  name="startDate" className="input-search" type="date" placeholder="Start date"/>
                    <input  name="endDate" className="input-search" type="date" placeholder="End date"/>
                    <textarea placeholder="Message" className="input-search" ></textarea>
                    <input className="btn-base btn-confirm" type="submit"  value="Create vacation"/>
                </form>
            </div>

            <div className={"vacation-wrapper all"}>
                {plansLoading?<Loader />:<Chart arr={workPlans.currentMonth} />}
            </div>
        </div>
    );
};

export default HomeTwo;
