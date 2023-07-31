'use client'

import React  from 'react';
import { Bar, Line } from 'react-chartjs-2';
import Image from 'next/image';
import useProcessedData from './panel-one/page';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

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

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


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
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
        bgcolor: 'background.paper',
        pt: 8,
        pb: 6,

      }}
      >
        <main className="main">
          <Box>
            <Box>
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                NaviStats
              </Typography>
              <Typography
                variant="h6" 
                align="center" 
                color="text.secondary" 
                paragraph
              >
                Visualize data for global and US road traffic injuries and fatalities
              </Typography>
            </Box>
          </Box>
          <Container>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Card
                  sx={{
                  p: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 250,
                  }}
                >
                  <p>About 1.3 million people die from road traffic crashes every year</p>
                  <br></br>
                  <p>20-50 million people suffer non-fatal injuries, many with resulting disabilities</p>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Paper
                  sx={{
                  p: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 250,
                  }}
                >
                  <p>Road traffic injuries are the leading cause of deaths among children and young adults</p>
                  <br></br>
                  <p>Over half of road traffic deaths occur among vulnerable road users (pedestrians, cyclists, motorcyclists, etc.)</p>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper
                  sx={{
                  p: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 250,
                  }}
                >
                  <p>Risk factors for road traffic crashes</p>
                  <p>- Speeding</p>
                  <p>- Driving under influence</p>
                  <p>- Distracted driving</p>
                  <p>- Nonuse of seat belts, child restraints, motorcycle helmets</p>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper 
                  sx={{
                    p: 0,
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >              
                  <Bar 
                    options={options} 
                    data={data} 
                  />
                </Paper>    
              </Grid>
            </Grid>
          </Container>
        </main>
      </Box>
    </ThemeProvider>
  )
}