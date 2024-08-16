import axios from "axios";
import dayjs from "dayjs";
import { Expense } from "./../features/expenses/expensesSlice";

// Define the type for the response data
interface GetUserExpensesApiResponse {
  success: boolean;
  data: Expense[];
  message: string;
}

// Define the type for the new expense data
interface NewExpense {
  title: string;
  category: string;
  price: number;
  date: string;
}

interface AddUserExpenseApiResponse {
  success: boolean;
  data: Expense;
  message: string;
}

interface EditExpenseApiResponse {
  success: boolean;
  data: Expense;
  message: string;
}

interface EditExpenseData {
  title: string;
  category: string;
  price: number;
  date: string;
}

interface DeleteExpenseApiResponse {
  success: boolean;
  message: string;
}

export const getUserExpenses = async (
  accessToken?: string
): Promise<Expense[]> => {
  try {
    const response = await axios.get<GetUserExpensesApiResponse>(
      "http://localhost:8000/api/v1/expenses",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("response", response);
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to fetch expenses");
  }
};

export const addExpense = async (
  newExpense: NewExpense,
  accessToken?: string
): Promise<Expense> => {
  const formattedDate = dayjs(newExpense.date).format("DD/MM/YYYY");
  console.log("formattedDate", formattedDate);

  try {
    const response = await axios.post<AddUserExpenseApiResponse>(
      "http://localhost:8000/api/v1/expenses",
      { ...newExpense, date: formattedDate },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.data.success) {
      return response.data.data;
    } else {
      console.log("error in response of adding expense");
      throw new Error(response.data.message);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(error?.response?.data?.message || "Failed to add expense");
  }
};

// Function to edit an existing expense
export const editExpense = async (
  id: string,
  updatedExpense: EditExpenseData,
  accessToken?: string
): Promise<Expense> => {
  // Format the date to DD/MM/YYYY
  const formattedDate = dayjs(updatedExpense.date).format("DD/MM/YYYY");
  console.log("formattedDate", formattedDate);
  try {
    const response = await axios.patch<EditExpenseApiResponse>(
      `http://localhost:8000/api/v1/expenses/${id}`,
      { ...updatedExpense, date: formattedDate },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.data.success) {
      return response.data.data;
    } else {
      console.log("Error in response of editing expense");
      throw new Error(response.data.message);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(error?.response?.data?.message || "Failed to edit expense");
  }
};

// Function to delete an existing expense
export const deleteExpense = async (
  id: string,
  accessToken?: string
): Promise<string> => {
  try {
    const response = await axios.delete<DeleteExpenseApiResponse>(
      `http://localhost:8000/api/v1/expenses/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.data.success) {
      return response.data.message;
    } else {
      console.log("Error in response of deleting expense");
      throw new Error(response.data.message);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(error?.response?.data?.message || "Failed to delete expense");
  }
};
