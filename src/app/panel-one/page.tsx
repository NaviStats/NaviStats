import React, { useEffect, useState } from 'react';
import useAbsDeaths from '../data/AbsDeaths';


const useProcessedData = () => {
    const absDeathsData = useAbsDeaths();

    const [globalDeathsByYear, setglobalDeathsByYear] = useState({})

    useEffect(() => {
        if (absDeathsData) {
            let totalDeaths2019 = Math.round(getTotalsByYear(absDeathsData, 2019, 'mean'));
            let totalDeaths2018 = Math.round(getTotalsByYear(absDeathsData, 2018, 'mean'));
            let totalDeaths2017 = Math.round(getTotalsByYear(absDeathsData, 2017, 'mean'));
            let totalDeaths2016 = Math.round(getTotalsByYear(absDeathsData, 2016, 'mean'));

            let newGlobalDeathsByYear = {
                '2016': totalDeaths2016,
                '2017': totalDeaths2017,
                '2018': totalDeaths2018,
                '2019': totalDeaths2019,
            };

            setglobalDeathsByYear(newGlobalDeathsByYear);

        }
    }, [absDeathsData])

    return globalDeathsByYear;
}

interface DeathData {
    TimeDim: number, 
    NumericValue: number,
    low: number, 
    high: number,
    Dim1: string,
    SpatialDimType: string,
}; 

type Quartile = 'mean' | 'lower' | 'upper';


/**
 * Calculates total global deaths for a given year
 * @param array - An array of objects. Each object includes NumericValue = # deaths, TimeDim = year, SpatialDimType = country, Dim1 = BTSX (both sex)
 * @param year - Year to filter by. This should be a four-digit year
 * @param quartile - Quartile to use. Should be mean, lower, or upper
 * @returns  - Total deaths for the specified year and quartile
 */
function getTotalsByYear (array: DeathData[], year: number, quartile: Quartile): number {
    let total: number = 0;
    let absDeaths: number = 0;
    for (let i = 0; i < array.length; i++) {
        let dataYear = array[i].TimeDim;
        if (quartile === "mean") absDeaths = array[i].NumericValue
        else if (quartile === "lower") absDeaths = array[i].low
        else if (quartile === "upper") absDeaths = array[i].high;
      
      if (dataYear === year && array[i].Dim1 === "BTSX" && array[i].SpatialDimType === "COUNTRY") {
        total += absDeaths;
      }
    }

    return total;

}


export default useProcessedData;