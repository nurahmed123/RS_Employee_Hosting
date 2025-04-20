import { useState, useEffect } from 'react';
import axios from 'axios';

function useFetchData(apiEndpoint) {
  const [alldata, setAlldata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (initialLoad) {
      // Set initialLoad to false to prevent the API call on subsequent renders
      setInitialLoad(false);
      setLoading(false); // Set loading to false to show components initially
      return; // Exit useEffect
    }

    // Set loading to true to indicate data fetching
    setLoading(true);

    // Make API call only after initial load or after navigating back to the page

    // axios.get(apiEndpoint).then(res => {
    //   setAlldata(res.data);
    //   setLoading(false); // Set loading to false after data is fetched
    // });
    // Function to fetch blog data
    const fetchAllData = async () => {
      try {
        const res = await axios.get(apiEndpoint);
        const alldata = res.data;
        setAlldata(alldata);
        setLoading(false); // Set loading state to false after data is fetched
      } catch (error) {
        console.error('Error fetching blog data:', error);
        setLoading(false); // Set loading state to false even if there's an error
      }
    };

    // Fetch blog data only if category exists
    if (apiEndpoint) {
      fetchAllData();
    }

  }, [initialLoad, apiEndpoint]); // Depend on initialLoad and apiEndpoint to trigger API call

  return { alldata, loading };
}

export default useFetchData;
