
import PlanList, {PlansListProps} from "@components/Home/PlanList.tsx";
import {empty} from "rxjs";
import {ChangeEvent, useState} from "react";
import moment from "moment";
import {useAppDispatch, useTypedSelector} from "@hooks/customHooks.ts";
import {setWorkPlan} from "@redux/slices";
import {SetWorkPlanType} from "@redux/types";
import {GetFormattedUTCTimeString} from "../../utils";

interface PlansProps extends  PlansListProps{
    title:string,
    addPlans?:boolean,
    emptyMessage:string
}
const Plans = ({plans,title,loading,emptyMessage,addPlans=false}:PlansProps) => {
    const dispatch = useAppDispatch();
    const {user} = useTypedSelector(s => s.auth);
    const [startTime,setStartTime] = useState(moment().format("hh:mm"));
    const [endTime,setEndTime] = useState(moment().add(1,'hour').format("hh:mm"));


    function handlePushPlan(){
         const startTimeStr = moment(startTime,"HH:mm:ss").format("hh:mm:ss");
         const endTimeStr = moment(endTime,"HH:mm:ss").format("hh:mm:ss");
         dispatch(setWorkPlan({
             userId: user?.id!,
             startTime:GetFormattedUTCTimeString(startTimeStr,moment().format("YYYY-MM-DD")),
             endTime:GetFormattedUTCTimeString(endTimeStr,moment().format("YYYY-MM-DD")),
             date:moment().format("YYYY-MM-DD")
         } as SetWorkPlanType))
    }
    function  onStartTimeInput(e:ChangeEvent<HTMLInputElement>) {
        setStartTime(e.target.value);
    }
    function  onEndTimeInput(e:ChangeEvent<HTMLInputElement>) {
        setEndTime(e.target.value);
    }
    return (
        <div className={"work-plans-wrapper"}>
            <h2>{title}</h2>


            <PlanList emptyMessage={emptyMessage} plans={plans} loading={loading} />
            {addPlans&&<div className={"push-plan"}>
                <form>
                    <input onChange={(e)=>onStartTimeInput(e)} value={startTime} style={{padding: "5px"}} className={"time-input"} type="time"/>
                    <span>-</span>
                    <input onChange={e=>onEndTimeInput(e)} value={endTime} style={{padding: "5px"}} className={"time-input"} type="time"/>
                    <input style={{
                        border: "none",
                        borderRadius: "15px",
                        padding: "5px 10px",
                        color: 'white',
                        cursor: "pointer"
                    }}
                      onClick={handlePushPlan}    className={"btn-confirm"} type="button" value="push plan"/>
                </form>
            </div>}
        </div>
    );
};

export default Plans;
