import axios from 'axios';
import { Expense } from "./../features/expenses/expensesSlice";
import { User } from "./../features/users/usersSlice";

// Define types and interfaces for responses
interface ApiResponse<T> {
  status: number;
  data: T;
  message: string;
}

interface GetAllExpensesApiResponse {
  success: boolean;
  data: Expense[];
  message: string;
}

interface GetAllUsersApiResponse {
  success: boolean;
  data: User[];
  message: string;
}

// Function to get all users
export const getAllUsers = async (accessToken?: string): Promise<User[]> => {
  try {
    const response = await axios.get<GetAllUsersApiResponse>('http://localhost:8000/api/v1/admin/get-users', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
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

// Function to get all expenses
export const getAllExpenses = async (accessToken?: string): Promise<Expense[]> => {
  try {
    const response = await axios.get<GetAllExpensesApiResponse>('http://localhost:8000/api/v1/admin/get-expenses', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });
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

// Function to update a user
interface UpdateUserData {
  firstname: string;
  lastname: string;
  budget: number;
}

export const updateUser = async (id: string, data: UpdateUserData, accessToken?: string): Promise<ApiResponse<User>> => {
  try {
    const response = await axios.patch<ApiResponse<User>>(
      `http://localhost:8000/api/v1/admin/update-user/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
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


export const deleteUser = async (id?: string, accessToken?: string): Promise<string> => {
  try {
    const response = await axios.delete(`http://localhost:8000/api/v1/admin/delete-user/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.data.success) {
      return response.data.message;
    }
    else{
      console.log("Error in response of deleting user");
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
}