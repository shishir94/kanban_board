const headers = {
    'content-type': 'application/json',
    accept: 'application/json, text/plain, */*'
}
  
export const getTicketsAndUsersDataAPI = async () => {
try {
    /**
     * Trying to get the data for
     * tickets and users from 
     * quicksell endpoint
     */
    const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment', {
        headers,
        method: 'GET',
    })

    /**
     * Check if the response status is not OK 
     * and throw an error if it's not
     */
    if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`)
    }

    /**
     * Extracting and parsing the JSON body from the response
     */
    const data = await response.json()
    return data
} catch (error) {
    /**
     * Logging the error and throwing it
     */
    console.error('Error fetching data:', error)
    throw error // throw the error after logging it
}
};
  