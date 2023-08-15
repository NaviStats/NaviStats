'use client'

import React, { useEffect, useState }  from 'react';
import { Bar, Line } from 'react-chartjs-2';
import useProcessedData from './panel-one/page';
import { 
  Box, Card, Container, Typography, Grid, Paper, Select, MenuItem, InputLabel, FormControl, ThemeProvider, createTheme
} from '@mui/material';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend
);

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

//Chart appearance options, for smaller and larger Y-axes
export const optionsBig = {
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
      min: 1000000,
      max: 1500000
    },
  },
  layout: {
    padding: 50,
  },
  maintainAspectRatio: true,
  barPercentage: 0.2,
};

export const optionsSmall = {
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
      min: 0,
      max: 100000
    },
  },
  layout: {
    padding: 50,
  },
  maintainAspectRatio: true,
  barPercentage: 0.2,
};

//Dropdown menu to select region
function SelectRegion({region, setRegion}) {
  const handleChange = (event: SelectChangeEvent) => {
    setRegion(event.target.value as string);
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel>Select Region</InputLabel>
        <Select
          label="Region"
          value={region}
          onChange={handleChange}
        >
          <MenuItem value={'USA'}>USA</MenuItem>
          <MenuItem value={'global'}>Global</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}


function LoadingComponent() {
  return(
    <Typography>
      Loading data...
    </Typography>
  )
}

export default function Home() {
  const [region, setRegion] = useState('USA');
  const totalDeathsByYear = useProcessedData(region);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (totalDeathsByYear && Object.keys(totalDeathsByYear).length > 0) {
      setIsLoading(false);
    }
  }, [totalDeathsByYear])

  const data = {
    labels: ['2016', '2017', '2018', '2019'],
    datasets: [
      {
        label: `Absolute road deaths by year, ${region}`,
        data: [totalDeathsByYear[2016], totalDeathsByYear[2017], totalDeathsByYear[2018], totalDeathsByYear[2019]],
        borderColor: 'rgba(52, 152, 219)',
        backgroundColor: 'rgba(52, 152, 219, 0.7)',
        barThickness: 70, 
        barPercentage: 1.0,
      }, 
    ],
  }

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
                {isLoading ? <LoadingComponent /> : 
                  <Bar 
                    data={data}
                    options={region === "USA" ? optionsSmall : optionsBig} 
                  />
                }              
                </Paper>
                <br></br>
                <Grid item xs={2}>
                  <SelectRegion region={region} setRegion={setRegion}/>
                </Grid>    
              </Grid>
            </Grid>
          </Container>
        </main>
      </Box>
    </ThemeProvider>
  )
}