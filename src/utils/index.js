import { getTicketsAndUsersDataAPI } from '../services/Api/todo'
import {
    GROUPING_METHODS,
    SORTING_METHODS,
    PRIORITY_IMAGES
} from './constants'

export const getFormattedTicketsAndUsersData = async() => {
    /**
     * It takes response from getTicketsAndUsersDataAPI
     * and returns the formatted tickets ans users 
     * data
     */
    const rawTicketsAndUsersData = await getTicketsAndUsersDataAPI()
    if (rawTicketsAndUsersData) {
        return {
            tickets: rawTicketsAndUsersData?.tickets || [],
            users: rawTicketsAndUsersData?.users || [],
        }
    }

    return null
}

const findAndGetUserData = (userData = [], userId = '') => {
    if(!userId) {
        return {}
    }

    return userData?.find(user => user.id === userId) || {}
}

export const getGroupedAndOrderedCardData = (
    rawTicketsAndUsersData,
    groupingMethod = GROUPING_METHODS.STATUS, 
    sortingMethod = SORTING_METHODS.PRIORITY
) => {
    if(!rawTicketsAndUsersData) {
        return []
    }

    const usersData = rawTicketsAndUsersData.users
    let groupedAndOrderedCardDataObj = {}

    /**
     * First group the data based on grouping method
     */
    if (groupingMethod === GROUPING_METHODS.USER) {
        rawTicketsAndUsersData.tickets.forEach((ticketItem) => {
            if(!groupedAndOrderedCardDataObj[ticketItem.userId]) {
                groupedAndOrderedCardDataObj[ticketItem.userId] = []
            }

            const ticketUserData = findAndGetUserData(usersData, ticketItem.userId)

            groupedAndOrderedCardDataObj[ticketItem.userId].push(
                {
                    ...ticketItem,
                    userInfo: ticketUserData
                }
            )
        })
    } else if (groupingMethod === GROUPING_METHODS.PRIORITY) {
        
        rawTicketsAndUsersData.tickets.forEach((ticketItem) => {
            if(!groupedAndOrderedCardDataObj[ticketItem.priority]) {
                groupedAndOrderedCardDataObj[ticketItem.priority] = []
            }

            const ticketUserData = findAndGetUserData(usersData, ticketItem.userId)

            groupedAndOrderedCardDataObj[ticketItem.priority].push(
                {
                    ...ticketItem,
                    userInfo: ticketUserData
                }
            )
        })
    } else {
        /** Consider STATUS for others */
        rawTicketsAndUsersData.tickets.forEach((ticketItem) => {
            if(!groupedAndOrderedCardDataObj[ticketItem.status]) {
                groupedAndOrderedCardDataObj[ticketItem.status] = []
            }

            const ticketUserData = findAndGetUserData(usersData, ticketItem.userId)

            groupedAndOrderedCardDataObj[ticketItem.status].push(
                {
                    ...ticketItem,
                    userInfo: ticketUserData
                }
            )
        })
    }

    /**
     * Creating an array of groups
     */
    const groupedAndOrderedCardDataArray = Object.keys(groupedAndOrderedCardDataObj).map((groupKey) => ({
        groupKey,
        data: groupedAndOrderedCardDataObj[groupKey]
    }))

    /**
     * Now we need to sort the data for 
     * each group based on sortingMethod
     */
    if (sortingMethod === SORTING_METHODS.TITLE) {
        groupedAndOrderedCardDataArray.forEach(group => {
            group.data.sort((a, b) => a.title.localeCompare(b.title))
        })
    } else {
        /** Consider all other as PRIORITY */
        groupedAndOrderedCardDataArray.forEach(group => {
            group.data.sort((a, b) => b.priority - a.priority)
        })
    }

    return groupedAndOrderedCardDataArray
}

export const getIconForGroup = (groupingMethod, groupData) => {
    if (GROUPING_METHODS.PRIORITY) {
        return PRIORITY_IMAGES[groupData?.[0]?.priority || 0]
    } else if (GROUPING_METHODS.STATUS) {

    }

    return null
}

export const storeInLocalStorage = (key, value) => {
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, value.toString())
    }
}

export const getFromLocalStorage = (key) => {
    if (typeof localStorage !== 'undefined') {
        const value = localStorage.getItem(key)
        if(value) {
            return value
        }
        return null
    }
}