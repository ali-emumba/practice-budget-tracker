import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Expense {
  _id: string;
  title: string;
  price: number;
  date: string;
  category: string;
  user:  {
    _id: string;
    firstname: string;
    lastname: string;
} | null ;
}

interface ExpensesState {
  expenses: Expense[];
}

const initialState: ExpensesState = {
  expenses: [],
};

export const expensesSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        setExpenses: (state, action: PayloadAction<Expense[]> ) => {
            console.log("action payload", action.payload);
            state.expenses = action.payload
        },
        addExpense: (state, action: PayloadAction<Expense>) => {
            console.log(action.payload)
            state.expenses.push(action.payload);
        },
        deleteExpense: (state, action: PayloadAction<string>) => {
            state.expenses = state.expenses.filter(expense => expense._id !== action.payload);
        },
        editExpense: (state, action: PayloadAction<Expense>) => {
            state.expenses = state.expenses.map(expense => {
                if (expense._id === action.payload._id) {
                    return action.payload;
                }
                return expense;
            });
        },
    },    
})

export const { addExpense, deleteExpense, editExpense, setExpenses } = expensesSlice.actions;
export default expensesSlice.reducer;