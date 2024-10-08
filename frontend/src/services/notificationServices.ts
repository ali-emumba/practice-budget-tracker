import axios, { AxiosResponse } from 'axios';

// Define the Notification interface to type the response data
interface Notification {
  _id: string;
  title: string;
  message: string;
  user: string;
  createdAt: string;
  // Add other fields that your notification object might have
}

// Define the API response structure
interface GetNotificationApiResponse {
    success: boolean;
    data: Notification[];
    message: string;
}

// Function to retrieve user notifications
export const getUserNotifications = async (
  accessToken?: string
): Promise<Notification[]> => {
  try {
    const response: AxiosResponse<GetNotificationApiResponse> = await axios.get(
      'http://localhost:8000/api/v1/notifications',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message);
      }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
