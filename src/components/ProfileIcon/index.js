import React from 'react'

import { RANDOM_COLORS } from '../../utils/constants'
import './ProfileIcon.css';

function ProfileIcon({userName, status}) {
    const randomBgColor = RANDOM_COLORS[Math.floor(Math.random() * RANDOM_COLORS.length)]

    const getInitials = (fullName) => {
        const namesArray = fullName.split(' ')
        const initials = namesArray.slice(-2).map(name => name.charAt(0).toUpperCase()).join('')
        return initials
    }

    return (
        <div className='profile-icon' style={{backgroundColor: randomBgColor}}>
            <div className='profile-icon-text'>
                {getInitials(userName)}
            </div>
            <div 
                className='status' 
                style={
                    {backgroundColor: status ? '#3ba464' : '#e3dce3'}
                }
            />
        </div>
    )
}

export default ProfileIcon;
