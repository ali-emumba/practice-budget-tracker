import dayjs from "dayjs";
import { Expense } from "./../features/expenses/expensesSlice";
import { axiosInstance } from "./axiosInstance";

// Generic interface for API responses
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

// Interface for expense payload used in add and edit operations
interface ExpensePayload {
  title: string;
  category: string;
  price: number;
  date: string;
}

// Define the type for delete expense response
interface DeleteResponse {
  success: boolean;
  message: string;
}

// Function to get user expenses
export const getUserExpenses = async (): Promise<Expense[]> => {
  try {
    const response = await axiosInstance.get<ApiResponse<Expense[]>>(
      "/expenses"
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

// Function to add a new expense
export const addExpense = async (
  newExpense: ExpensePayload
): Promise<Expense> => {
  const formattedDate = dayjs(newExpense.date).format("DD/MM/YYYY");
  console.log("formattedDate", formattedDate);

  try {
    const response = await axiosInstance.post<ApiResponse<Expense>>(
      "/expenses",
      { ...newExpense, date: formattedDate }
    );

    if (response.data.success) {
      return response.data.data;
    } else {
      console.log("Error in response of adding expense");
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
  updatedExpense: ExpensePayload
): Promise<Expense> => {
  const formattedDate = dayjs(updatedExpense.date).format("DD/MM/YYYY");
  console.log("formattedDate", formattedDate);

  try {
    const response = await axiosInstance.patch<ApiResponse<Expense>>(
      `/expenses/${id}`,
      { ...updatedExpense, date: formattedDate }
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
export const deleteExpense = async (id: string): Promise<string> => {
  try {
    const response = await axiosInstance.delete<DeleteResponse>(
      `/expenses/${id}`
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
