import React, { useEffect, useState } from 'react';
import useAbsDeaths from '../data/AbsDeaths';


const useProcessedData = () => {
    const absDeathsData = useAbsDeaths();
    // console.log('absDeathsData Arr', absDeathsData);

    const [globalDeathsByYear, setglobalDeathsByYear] = useState({})

    useEffect(() => {
        if (absDeathsData) {
            let totalDeaths2019: number = Math.round(getTotalsByYear(absDeathsData, 2019, 'mean'));
            let totalDeaths2018: number = Math.round(getTotalsByYear(absDeathsData, 2018, 'mean'));
            let totalDeaths2017: number = Math.round(getTotalsByYear(absDeathsData, 2017, 'mean'));
            let totalDeaths2016: number = Math.round(getTotalsByYear(absDeathsData, 2016, 'mean'));

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


//create total # deaths / year object
function getTotalsByYear (array: any, year: number, quartile: string) {
    //SpatialDim: "AFG", TimeDim: 2019, NumericValue: xxx, SpatialDimType: COUNTRY | BTSX = both sex
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