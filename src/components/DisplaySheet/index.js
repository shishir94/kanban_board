import React from 'react'

import { RANDOM_COLORS, GROUPING_METHODS, SORTING_METHODS } from '../../utils/constants'
import './DisplaySheet.css';

function DisplaySheet({
    groupingMethod,
    setGroupingMethod,
    sortingMethod,
    setSortingMethod
}) {
    const handleGroupingChange = (event) => {
        const selectedValue = event.target.value
        setGroupingMethod(selectedValue)
    }

    const handleOrderingChange = (event) => {
        const selectedValue = event.target.value
        setSortingMethod(selectedValue)
    }

    return (
        <div className='display-sheet'>
            <div className='options-row'>
                <div className='options-title'>Grouping</div>
                <select className='options-select' value={groupingMethod} onChange={handleGroupingChange}>
                    {Object.values(GROUPING_METHODS).map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                    ))}
                </select>
            </div>
            <div className='options-row'>
                <div className='options-title'>Ordering</div>
                <select className='options-select' value={sortingMethod} onChange={handleOrderingChange}>
                    {Object.values(SORTING_METHODS).map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default DisplaySheet;
