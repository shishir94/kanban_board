import React from 'react'

import { GROUPING_METHODS } from '../../utils/constants'
import { getIconForGroup } from '../../utils'

import Ticket from '../../components/Ticket'
import GroupListHeader from '../../components/GroupListHeader'
import './GroupList.css';

function GroupList({
    groupData = [],
    groupingMethod = GROUPING_METHODS.STATUS,
    groupKey
}) {

    return (
        <div>
            <div className='group-list-header'>
                <GroupListHeader
                    groupKey={groupKey}
                    groupingMethod={groupingMethod}
                    userName={groupData?.[0]?.userInfo?.name}
                    status={groupData?.[0]?.userInfo?.available}
                    icon={getIconForGroup(groupingMethod, groupData)}
                    groupTicketsCount={groupData?.length}
                />
            </div>
            <div className='group-list-container'>
                {
                    groupData.map((ticketData, index) => {
                        return (
                            <Ticket
                                key={index}
                                ticketData={ticketData}
                                groupingMethod={groupingMethod}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default GroupList;
