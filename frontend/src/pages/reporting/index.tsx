import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'; // Example for Recharts
import { useAppDispatch, useAppSelector } from './../../app/hooks';
import { Expense, setExpenses } from './../../features/expenses/expensesSlice';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { getUserExpenses } from './../../services/expenseServices';
import { toast } from 'react-toastify';

dayjs.extend(customParseFormat);

const Reporting = () => {
  const expenses = useAppSelector((state) => state.expenses.expenses);

  const [timePeriod, setTimePeriod] = useState('lastMonth');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching
      try {
        const fetchedExpenses = await getUserExpenses();
        dispatch(setExpenses(fetchedExpenses));
        // toast.success('Expenses fetched successfully!');
      } catch (err: any) {
        setError(err.message);
        toast.error(`Failed to fetch expenses: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [accessToken, dispatch]);

  const groupExpensesByMonth = (
    filteredExpenses: Expense[],
    months: string[]
  ) => {
    const grouped = filteredExpenses.reduce((acc, expense) => {
      const month = dayjs(expense.date, 'DD/MM/YYYY').format('MMMM');
      acc[month] = (acc[month] || 0) + expense.price;
      return acc;
    }, {} as Record<string, number>);

    // Ensure all months are represented in the x-axis, even if they have no expenses.
    return months.map((month) => ({
      month,
      total: grouped[month] || 0,
    }));
  };

  const getLastMonths = (numOfMonths: number) => {
    const currentDate = dayjs();
    return Array.from({ length: numOfMonths }, (_, i) =>
      currentDate.subtract(i, 'month').format('MMMM')
    ).reverse();
  };

  const getFilteredData = (): { xAxisData: string[]; yAxisData: number[] } => {
    let filteredExpenses: Expense[] = [];
    let xAxisData: string[] = [];
    let yAxisData: number[] = [];

    switch (timePeriod) {
      case 'lastMonth':
        filteredExpenses = expenses.filter((expense) =>
          dayjs(expense.date, 'DD/MM/YYYY').isSame(dayjs(), 'month')
        );

        const daysInMonth = dayjs().daysInMonth();
        xAxisData = Array.from({ length: daysInMonth }, (_, i) =>
          dayjs()
            .date(i + 1)
            .format('DD')
        );

        yAxisData = xAxisData.map((day) =>
          filteredExpenses
            .filter(
              (expense) =>
                dayjs(expense.date, 'DD/MM/YYYY').format('DD') === day
            )
            .reduce((total, expense) => total + expense.price, 0)
        );
        break;

      case 'last6Months':
        filteredExpenses = expenses.filter((expense) =>
          dayjs(expense.date, 'DD/MM/YYYY').isAfter(
            dayjs().subtract(6, 'month'),
            'month'
          )
        );

        const last6Months = getLastMonths(6);
        const groupedByMonth6 = groupExpensesByMonth(
          filteredExpenses,
          last6Months
        );
        xAxisData = groupedByMonth6.map((item) => item.month);
        yAxisData = groupedByMonth6.map((item) => item.total);
        break;

      case 'last12Months':
        filteredExpenses = expenses.filter((expense) =>
          dayjs(expense.date, 'DD/MM/YYYY').isAfter(
            dayjs().subtract(12, 'month'),
            'month'
          )
        );

        const last12Months = getLastMonths(12);
        const groupedByMonth12 = groupExpensesByMonth(
          filteredExpenses,
          last12Months
        );
        xAxisData = groupedByMonth12.map((item) => item.month);
        yAxisData = groupedByMonth12.map((item) => item.total);
        break;

      default:
        break;
    }

    return { xAxisData, yAxisData };
  };

  const [xAxisData, setXAxisData] = useState<string[]>([]);
  const [yAxisData, setYAxisData] = useState<number[]>([]);
  useEffect(() => {
    const { xAxisData, yAxisData } = getFilteredData();
    setXAxisData(xAxisData);
    setYAxisData(yAxisData);
  }, [timePeriod, expenses]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: 'white',
        m: 2,
        borderRadius: 3,
        width: '100%',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: isSmallScreen ? 'column' : 'row',
          gap: 2,
          justifyContent: 'space-between',
          mb: isSmallScreen ? 2 : 0,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: {
              xs: '1.25rem',
              sm: '1.5rem',
              md: '2rem',
              lg: '2.125rem',
            },
            mb: isSmallScreen ? 1 : 0, // Add margin bottom on small screens
          }}
        >
          Analysis
        </Typography>
        <FormControl sx={{ minWidth: isSmallScreen ? '100%' : 200, mb: 2 }}>
          <InputLabel>Time Period</InputLabel>
          <Select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            label="Time Period"
            fullWidth={isSmallScreen}
          >
            <MenuItem value="lastMonth">Last Month</MenuItem>
            <MenuItem value="last6Months">Last 6 Months</MenuItem>
            <MenuItem value="last12Months">Last 12 Months</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {error && <Alert severity="error">{error}</Alert>}
      {loading ? (
        <CircularProgress />
      ) : (
        <Box sx={{ overflowX: 'auto', overflowY: 'hidden', mt: 2 }}>
          {' '}
          {/* Container to make chart scrollable */}
          <LineChart
            width={isSmallScreen ? 600 : 1200}
            height={isSmallScreen ? 300 : 600}
            style={{ margin: '0 auto' }}
            data={xAxisData.map((label, index) => ({
              name: label,
              value: yAxisData[index],
            }))}
          >
            <CartesianGrid strokeDasharray="0" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis
              label={{
                value: 'Value',
                angle: -90,
                position: 'left',
                style: { fontWeight: 'bold', fontSize: '16px' },
              }}
            />
            <Tooltip formatter={(value) => [`PKR ${value}`]} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#7539FF"
              strokeWidth={2}
            />
          </LineChart>
        </Box>
      )}
    </Box>
  );
};

export default Reporting;
