import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

interface ExpenseData {
  month: string;
  year: number;
  amount: number;
}

// Sample data for expenses (monthly)
const expenseData: ExpenseData[] = [
  { month: 'January', year: 2023, amount: 400 },
  { month: 'February', year: 2023, amount: 600 },
  { month: 'March', year: 2023, amount: 300 },
  { month: 'April', year: 2023, amount: 500 },
  { month: 'May', year: 2023, amount: 700 },
  { month: 'June', year: 2023, amount: 200 },
  { month: 'July', year: 2023, amount: 800 },
  { month: 'August', year: 2023, amount: 400 },
  { month: 'September', year: 2023, amount: 600 },
  { month: 'October', year: 2023, amount: 300 },
  { month: 'November', year: 2023, amount: 500 },
  { month: 'December', year: 2023, amount: 700 },
];

const Reporting = () => {
  const [timePeriod, setTimePeriod] = useState('lastMonth');

  // Filter expense data based on the selected time period
  const getFilteredData = (): ExpenseData[] => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // Current month index (0-based)

    switch (timePeriod) {
      case 'lastMonth':
        return expenseData.slice(currentMonth - 1, currentMonth); // Last month
      case 'last6Months':
        return expenseData.slice(
          Math.max(currentMonth - 6, 0),
          currentMonth + 1
        ); // Last 6 months
      case 'last12Months':
        return expenseData; // Last 12 months (full year)
      default:
        return [];
    }
  };

  const filteredData = getFilteredData();
  const xAxisData = filteredData.map((data) => `${data.month} ${data.year}`);
  const yAxisData = filteredData.map((data) => data.amount);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        About
      </Typography>

      {/* Filter Section */}
      <FormControl sx={{ minWidth: 200, mb: 2 }}>
        <InputLabel>Time Period</InputLabel>
        <Select
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
          label="Time Period"
        >
          <MenuItem value="lastMonth">Last Month</MenuItem>
          <MenuItem value="last6Months">Last 6 Months</MenuItem>
          <MenuItem value="last12Months">Last 12 Months</MenuItem>
        </Select>
      </FormControl>

      {/* Line Chart */}
      <LineChart
        xAxis={[{ data: xAxisData }]}
        series={[
          {
            data: yAxisData,
          },
        ]}
        width={500}
        height={300}
      />
    </Box>
  );
};

export default Reporting;
