import React, {useState} from 'react';
import './SettingsCard.css'
import {useAppDispatch, useTypedSelector} from "@hooks/customHooks.ts";
import {updateTwoStepAuth} from "@redux/slices";

const SettingsCard = () => {

    const dispatch = useAppDispatch();

    const {user} = useTypedSelector(s=>s.auth);

    const {loading,error} = useTypedSelector(s=>s.user);

    const [value,setValue] = useState<string>("");

    const [showAuthTypes,setShowAuthTypes] = useState<boolean>(false);

    const [authType,setAuthType] = useState<string>("");

    const [addPhoneNumber,setAddPhoneNumber] = useState<boolean>(false);

    const [save,setSave] = useState<boolean>(false);

    const twoStepAuthMessage = user?.isTwoStepAuthEnabled?"Disable two step authentication"
        :"Enable two step authentication"

    const [inputError,setError] = useState<string>("");

    function onChecked(e:React.ChangeEvent<HTMLInputElement>){
        setShowAuthTypes(e.target.checked);
    }

    function handleAuthTypeSelect(e:React.ChangeEvent<HTMLInputElement>){
        setAuthType(e.target.id);
        if(e.target.id==="phone"||e.target.id==="whatsapp"){
            setAddPhoneNumber(true);
            return;
        }

        setAddPhoneNumber(false);
    }

    function onInputChange(e:React.ChangeEvent<HTMLInputElement>){
        setValue(e.target.value);
    }
    function handleSave(){

        const auth = authType==="email"?4:authType==="whatsapp"?2:1;

        if(auth===2||auth===1)
        {
            if(value===""&&user?.phoneNumber!=="-1"){
                setError("Please, enter phone number")
                return;
            }
        }

        dispatch(updateTwoStepAuth({
            isEnabled:true,
            phoneNumber:value,
            userId:user?.id!,
            authType:auth
        }));

        setSave(true);
    }

    return (
        <div className="card-wrapper">
            <div className="card">
                {save?<h2 style={{width:"100%",textAlign:"center"}}>{loading?"loading...":""} {error?error:"Two step authentication enabled"}</h2>
                    :showAuthTypes?<div className="choose-type">
                        <h2 style={{marginBottom:"10px"}}>Which method you want to use?</h2>
                        <div  className="menu-option">
                            <input onChange={(e)=>handleAuthTypeSelect(e)} id="whatsapp" name="auth" type="radio"/>
                            <span>WhatsApp</span>
                        </div>
                        <div className="menu-option">
                            <input onChange={(e)=>handleAuthTypeSelect(e)} id="phone" name="auth" type="radio"/>
                            <span>Phone sms</span>
                        </div>
                        <div className="menu-option">
                            <input onChange={(e)=>handleAuthTypeSelect(e)} id="email" name="auth" type="radio"/>
                            <span>Email</span>
                        </div>
                            {addPhoneNumber?<div>
                                <input onChange={(e)=>onInputChange(e)} value={value} className="input-search" type="text" placeholder="Phone number"/>
                                <span style={{color:"red"}}>{inputError}</span>
                            </div>:""}
                        <button onClick={handleSave} className="btn-base btn-confirm" style={{width:"100px"}}>Save</button>
                    </div>:<div className="menu-option">
                        <input onChange={(e)=>onChecked(e)} type="checkbox"/>
                        <span>{twoStepAuthMessage}</span>
                    </div>}
            </div>
        </div>
    );
};

export default SettingsCard;
