import React from 'react'

import { GROUPING_METHODS, PRIORITY_VALUES } from '../../utils/constants'

import dotMenuIcon from '../../assets/3-dot-menu.svg'
import plusIcon from '../../assets/add.svg'

import ProfileIcon from '../ProfileIcon'

import './GroupListHeader.css';

function GroupListHeader({
    groupKey = '',
    groupingMethod = GROUPING_METHODS.STATUS,
    userName = '',
    status = false,
    icon,
    groupTicketsCount = 0
}) {
    return (
        <div className='group-list-header-container'>
            <div className='container-left'>
                {
                   groupingMethod ===  GROUPING_METHODS.USER ?
                    <ProfileIcon
                        userName={userName}
                        status={status}
                    />
                    :
                    <img src={icon} alt="icon"/>
                }
                <div className='header-title'>
                    {groupingMethod ===  GROUPING_METHODS.USER 
                        ? userName 
                            : groupingMethod ===  GROUPING_METHODS.PRIORITY 
                                ?  PRIORITY_VALUES[groupKey]
                                :  groupKey
                    }
                </div>
                <div className='header-count'>{groupTicketsCount}</div>
                
            </div>
            <div className='container-right'>
                <img src={dotMenuIcon} alt="dot_menu_icon"/>
                <img src={plusIcon} alt="plusicon"/>
            </div>
        </div>
    )
}

export default GroupListHeader;
