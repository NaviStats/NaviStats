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

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    }
  ],
};

export default function Home() {
  return (
    <main className="">
      <div className="">
        <h1>NaviStats</h1>
      </div>

      <div className="">
        <p>Visualize data for global and US road traffic injuries and fatalities</p>
        <p>Promote funding and development of autonomous driving</p>
      </div>

      <Bar options={options} data={data} />;
    </main>
  )
}
