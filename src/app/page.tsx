'use client'

import Image from 'next/image';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import React  from 'react';

import useAbsDeaths from './data/AbsDeaths';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: true,
      text: 'Fatal road traffic injuries over time',
    },
  },
};

const labels = ['2016', '2017', '2018', '2019'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Road Deaths by Year',
      data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    }
  ],
};


export default function Home() {
  const absDeathsData = useAbsDeaths();
  console.log('absDeathsData Arr', absDeathsData);

  return (
    <main className="">
      <div>
        <h1>NaviStats</h1>
      </div>

      <div className="">
        <br></br>
        <p>Visualize data for global and US road traffic injuries and fatalities</p>
        <p>Promote funding and development of autonomous driving</p>
      </div>

      <div>
      </div>
      <Bar options={options} data={data} />
    </main>
  )
}













/**

  // useEffect(() => {
  //   const absDeaths = async () => {
  //     const res = await fetch('/api/data');
  //     const jsonData = await res.json();
  //     setAbsDeathsData(jsonData.data);
  //   };

  //   absDeaths();
  // }, []);


*/