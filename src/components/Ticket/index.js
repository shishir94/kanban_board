import React, {useState} from 'react'

import { GROUPING_METHODS } from '../../utils/constants'
import {PRIORITY_IMAGES, TICKET_IMAGES} from '../../utils/constants'

import ProfileIcon from '../../components/ProfileIcon'
import './Ticket.css';

function Ticket({
    ticketData = {},
    groupingMethod = GROUPING_METHODS.STATUS
}) {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(prevChecked => !prevChecked);
    }

    return (
        <div className='ticket-container'>
            <div className='ticket-container-left'>
                <div className='ticket-id'>
                    {ticketData.id || 'ID'}
                </div>
                <div className='ticket-title-container'>
                    <input
                        type="checkbox"
                        id={`ticket-${ticketData.id}`}
                        name={`ticket-${ticketData.id}`} 
                        className='ticket-radio'
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                    <div className='ticket-title-text'>
                        {ticketData.title || 'Title Missing!'}
                    </div>
                </div>
                <div className='ticket-tags-wrapper'>
                    <img 
                        src={PRIORITY_IMAGES[ticketData.priority || 0]}
                        className='priority-icon'
                    />
                    {
                        ticketData?.tag?.map((tag) => {
                            return (
                                <div key={tag} className='single-tag'>
                                    <div className='filled-dot'/>
                                    <div className='tag-text'>{tag}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {
                groupingMethod !== GROUPING_METHODS.USER &&
                ticketData?.userInfo?.name &&
                <div className='ticket-container-right'>
                    <ProfileIcon
                        userName={ticketData?.userInfo?.name}
                        status={ticketData?.userInfo?.available}
                    />
                </div>
            }
        </div>
    )
}

export default Ticket;
