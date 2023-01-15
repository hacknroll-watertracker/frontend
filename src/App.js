import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Slider from '@mui/material/Slider';

import Indicator from './Indicator';

const URL = 'https://hnr2023-watertracker-backend.onrender.com/api/v1/watertracker'

function App() {
  const [goalAmount, setGoalAmount] = React.useState(3.7);
  const [totalAmount, setTotalAmount] = React.useState(0.0);
  const [amountDrank, setAmountDrank] = React.useState(0.0);

  const handleGoalSliderChange = (event, newGoal) => {
    setGoalAmount(newGoal);
  };

  const handleAmountDrankChange = (event) => {
    setAmountDrank(event.target.value);
  }

  const handleGoalInputChange = (event) => {
    setGoalAmount(event.target.value === '' ? '' : Number(event.target.value));
  };

  const onEnter = (event) => {
    if (event.key === 'Enter') {
      const currentDate = new Date().toISOString().slice(0, 10)
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amountDrank, date: currentDate })
      };

      fetch(URL, requestOptions)
        .then(response => console.log(response.json()))
        .then(calculateAmountDrank)
    }
  }

  const calculateAmountDrank = () => {
    const currentDate = new Date().toISOString().slice(0, 10)

    fetch(URL + '?' + new URLSearchParams({
      date: currentDate
    })).then(res => {
      if (res.status === 200) {
        return res.json()
      }
      console.log("shit")
    }).then(data => {
      const amt = data.record.reduce((sum, rec) => sum + rec.amount, 0)
      setTotalAmount(amt)
    })
  }

  React.useEffect(calculateAmountDrank, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="false" disableGutters={true}>
        <Box 
          sx={{ 
            bgcolor: '#cfe8fc', 
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '15px'
            }}
          >
            <Indicator amount={totalAmount / 1000} totalAmount={goalAmount}/>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '5px',
                flexDirection: 'column',
                height: '200px'
              }}
            >
              <Slider
                orientation="vertical"
                value={typeof goalAmount === 'number' ? goalAmount : 0}
                onChange={handleGoalSliderChange}
                valueLabelDisplay="auto"
                min={0}
                max={7}
                step={0.1}
              />
              <OutlinedInput
                sx={{
                  width: '50px'
                }}
                value={goalAmount}
                onChange={handleGoalInputChange}
                size="small"
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              gap: '20px'
            }}
          >
            <FormControl variant="outlined" onChange={handleAmountDrankChange} onKeyDown={onEnter}>
              <InputLabel>Amount drank</InputLabel>
              <OutlinedInput 
                endAdornment={<InputAdornment position="end">&#13206;</InputAdornment>}
                label="Amount drank"
              />
            </FormControl>
            <div>
              You have consumed {totalAmount / 1000}&#8467; of water
            </div>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default App;
