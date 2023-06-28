import React, { useState, useEffect } from 'react';

export default function useAbsDeaths() {
  const [absDeathsData, setAbsDeathsData] = useState(null);

  useEffect(() => {
    const fetchAbsDeaths = async () => {
      const res = await fetch('/api/who-data');
      const jsonData = await res.json();
      // console.log(jsonData.data.value[0]);
      setAbsDeathsData(jsonData.data);
    };

    fetchAbsDeaths();
  }, []);

  // if (absDeathsData) console.log('absDeathsData.value[0].NumericValue', absDeathsData.value[0].NumericValue);
  let absDeathsDataArray = absDeathsData ? absDeathsData.value : []
  return absDeathsDataArray;
}
