import { axiosInstance } from "./axiosInstance";
import axios from "axios";
import { Expense } from "./../features/expenses/expensesSlice";
import { User } from "./../features/users/usersSlice";
import dayjs from "dayjs";
import { date } from "yup";

// General ApiResponse interface
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

// Get all users
export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await axiosInstance.get<ApiResponse<User[]>>('admin/get-users');
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'An error occurred while fetching users.'
      );
    } else {
      throw new Error('An unexpected error occurred.');
    }
  }
};

// Get all expenses
export const getAllExpenses = async (): Promise<Expense[]> => {
  try {
    const response = await axiosInstance.get<ApiResponse<Expense[]>>('admin/get-expenses');
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'An error occurred while fetching expenses.'
      );
    } else {
      throw new Error('An unexpected error occurred.');
    }
  }
};

// Update a user
interface UpdateUserData {
  firstname: string;
  lastname: string;
  budget: number;
}

export const updateUser = async (id: string, data: UpdateUserData): Promise<User> => {
  try {
    const response = await axiosInstance.patch<ApiResponse<User>>(
      `admin/update-user/${id}`,
      data
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'An error occurred while updating the user.'
      );
    } else {
      throw new Error('An unexpected error occurred.');
    }
  }
};

// Delete a user
export const deleteUser = async (id: string): Promise<string> => {
  try {
    const response = await axiosInstance.delete<ApiResponse<null>>(
      `admin/delete-user/${id}`
    );
    if (response.data.success) {
      return response.data.message;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'An error occurred while deleting the user.'
      );
    } else {
      throw new Error('An unexpected error occurred.');
    }
  }
};


export const deleteExpense = async (id: string): Promise<string> => {
  try {
    const response = await axiosInstance.delete<ApiResponse<null>>(`admin/delete-expense/${id}`);
    if (response.data.success) {
      return response.data.message;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'An error occurred while deleting the expense.'
      );
    } else {
      throw new Error('An unexpected error occurred.');
    }
  }
};

// Edit an expense
interface UpdateExpenseData {
  title: string;
  price: number;
  category: string;
  date: string;
}

export const editExpense = async (id: string, data: UpdateExpenseData): Promise<Expense> => {
  const formattedDate = dayjs(data.date).format("DD/MM/YYYY");
  try {
    const response = await axiosInstance.patch<ApiResponse<Expense>>(`admin/update-expense/${id}`, {...data, date: formattedDate});
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'An error occurred while updating the expense.'
      );
    } else {
      throw new Error('An unexpected error occurred.');
    }
  }
};