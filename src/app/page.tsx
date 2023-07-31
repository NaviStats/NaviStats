'use client'

import React  from 'react';
import { Bar, Line } from 'react-chartjs-2';
import Image from 'next/image';
import useProcessedData from './panel-one/page';
import { faker } from '@faker-js/faker';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';



ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
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
  scales: {
    y: {
      min: 1200000,
      max: 1300000
    },
  },
  layout: {
    padding: 100,
  },
  maintainAspectRatio: true,
  barPercentage: 0.2,
};


export default function Home() {
  const globalDeathsByYear = useProcessedData();

  const data = {
    labels: ['2016', '2017', '2018', '2019'],
    datasets: [
      {
        label: 'Absolute road deaths by year',
        data: [globalDeathsByYear[2016], globalDeathsByYear[2017], globalDeathsByYear[2018], globalDeathsByYear[2019]],
        borderColor: 'rgba(52, 152, 219)',
        backgroundColor: 'rgba(52, 152, 219, 0.7)',
        barThickness: 70, 
        barPercentage: 1.0,
      }, 
    ],
  };
  

  return (
    <main className="main">
      <div>
        <h1>NaviStats</h1>
      </div>

      <div className="">
        <br></br>
        <p>Visualize data for global and US road traffic injuries and fatalities</p>
        <p>Promote funding and development of autonomous driving</p>
      </div>

      <Bar 
        options={options} 
        data={data} 
      />
    </main>
  )
}