import React from 'react';
import "./misc.css"

const ProfileAvatar = ({initials} : {initials:string}) => {
    
    return (
        <div className="profile-avatar__wrapper">
            <span>{initials}</span>
        </div>
    );
};

export default ProfileAvatar;