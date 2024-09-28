import React, {useState, useEffect} from 'react';

import { 
  getFormattedTicketsAndUsersData,
  getGroupedAndOrderedCardData,
  storeInLocalStorage,
  getFromLocalStorage
} from './utils/index'
import {
  GROUPING_METHODS,
  SORTING_METHODS
} from './utils/constants'

import GroupList from './containers/GroupList'
import DisplaySheet from './components/DisplaySheet'

import DisplayIcon from './assets/Display.svg'
import DownIcon from './assets/down.svg'
import './App.css';

function App() {
  /**
   * Loading and error related states
   */
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  /**
   * State variable for storing raw tickets
   * and users data from the response of API
   * endpoint.
   * Initially, both tickets and users are
   * empty arrays
   */
  const [rawTicketsAndUsersData, setRawTicketsAndUsersData] = useState({
    tickets: [],
    users: []
  })

  /**
   * Grouping and sorting method related states
   * Default value for grouping is by status
   * Default value for sorting is by priority
   */
  const [groupingMethod, setGroupingMethod] = useState(
    getFromLocalStorage('groupingMethod') ||
    GROUPING_METHODS.STATUS
  )
  const [sortingMethod, setSortingMethod] = useState(
    getFromLocalStorage('sortingMethod') ||
    SORTING_METHODS.PRIORITY
  )

  /**
   * State to store the tickets and users data
   * on the basis of groupingMethod and sortingMethod
   */
  const [orderedTicketsData, setOrderedTicketsData] = useState([])

  /**
   * State for showing/hiding the display
   * to chose grouping and ordering
   */
  const [showDisplayContainer, setShowDisplayContainer] = useState(false)

  useEffect(() => {
    /**
     * Need to initalize the tickets and users data
     * as soon as the page renders
     */
    initializeDashboard()
  },[])

  useEffect(() => {
    /**
     * Need to set the orderedTicketsData
     * everytime grouping OR sorting method 
     * changes
     */
    const groupedAndSortedTicketsData = getGroupedAndOrderedCardData(rawTicketsAndUsersData, groupingMethod, sortingMethod)
    setOrderedTicketsData(groupedAndSortedTicketsData)

    /**
     * Also, we need to store the grouping and
     * sorting method in local stoarge to preserve them
     * if user reloads the page or comes again to the app
     */
    storeInLocalStorage('groupingMethod', groupingMethod)
    storeInLocalStorage('sortingMethod', sortingMethod)

  }, [rawTicketsAndUsersData, groupingMethod, sortingMethod])

  const initializeDashboard = async() => {
    /**
     * This function will try to get the
     * formatted tickets and users data from 
     * quicksell API endpoint. 
     * It will then set the data in respective states
     */
    try {
      const formattedTicketsAndUsersData = await getFormattedTicketsAndUsersData()

      if(
        formattedTicketsAndUsersData.tickets &&
        formattedTicketsAndUsersData.users
      ) {
        setRawTicketsAndUsersData(formattedTicketsAndUsersData)
      } else {
        setErrorMessage("An error occured in geting data, please try again in some time")
      }
    } catch (error) {
      setErrorMessage("An error occured, please try again in some time")
    } finally {
      setLoading(false)
    }
  }

  const toggleDisplayShow = () => {
    setShowDisplayContainer(prev => !prev)
  }

  if (loading) {
    return (
      <div className='loader-full-screen'>
        <div className='loader'/>
      </div>
    )
  }

  if(errorMessage) {
    return (
      <div className='error-full-screen'>
        <div className='error-text'>
          {errorMessage}
        </div>
      </div>
    )
  }

  return (
    <div className="App">
      <div className="header">
        <div className='display-box'>
          <img src={DisplayIcon}/>
          <div className='display-text'>Display</div>
          <img src={DownIcon} onClick={toggleDisplayShow}/>
          {
            showDisplayContainer &&
            <div className='display-sheet'>
              <DisplaySheet
                groupingMethod={groupingMethod}
                setGroupingMethod={setGroupingMethod}
                sortingMethod={sortingMethod}
                setSortingMethod={setSortingMethod}
              />
            </div>
          }
        </div>
      </div>
      <div className="groups-container" onClick={() => setShowDisplayContainer(false)}>
        {
          orderedTicketsData?.map((groupData, index) => {
            return (
              <GroupList
                key={index}
                groupData={groupData.data}
                groupingMethod={groupingMethod}
                groupKey={groupData.groupKey}
              />
            )
          })
        }
      </div>
      
    </div>
  )
}

export default App
