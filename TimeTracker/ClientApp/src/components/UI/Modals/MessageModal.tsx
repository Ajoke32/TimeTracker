import {BaseButton} from "@components/UI";
import './messageModal.css'
import '@components/Tables/Table.css'
import {useAppDispatch, useTypedSelector} from "@hooks/customHooks.ts";
import {modalClose} from "@redux/slices/messageModalSlice.ts";
import {updateApproverVacationState} from "@redux/slices";
import {ChangeEvent, useState} from "react";

const MessageModal = () => {

    const [message,setMessage] = useState<string>("");
    const [error,setError] = useState<string>("");

    const {isOpen,userId,
        vacationId,state} = useTypedSelector(s=>s.messageModal)

    const dispatch = useAppDispatch();

    function messageInputHandle(e:ChangeEvent<HTMLTextAreaElement>){
        setMessage(e.target.value)
    }

    function handleClose(){
        dispatch(modalClose());
        setMessage("");
    }

    function handleSuccess(){
        if(!state&&message===""){
            setError("Message field required");
            return;
        }
        dispatch(updateApproverVacationState({approverId:userId!,vacationId:vacationId!,isApproved:state!,message:message}));
        dispatch(modalClose());
        setMessage("");
    }

    return (
        <div className="msg-wrapper" style={{display:isOpen?'flex':'none'}}>
            <h2 style={{color:"#ffaa00"}}>This is unreversible action</h2>
            <span>{error}</span>
            <textarea placeholder="explanation" value={message} onChange={(e)=>messageInputHandle(e)}></textarea>
            <div className="btn-group">
            <BaseButton disabled={false} onClick={handleSuccess} btnStyle={'confirm'} text={"Save my answer"}/>
            <BaseButton disabled={false} onClick={handleClose} btnStyle={'decline'} text={"Discard"}/>
            </div>
        </div>
    );
};

export default MessageModal;
