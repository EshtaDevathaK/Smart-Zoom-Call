
import { toast } from "sonner";

// Base API URL - replace with your actual MongoDB API endpoint
const API_BASE_URL = "https://your-mongodb-api.com/api";

// Types
export interface Meeting {
  _id?: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  aiEvents: AIEvent[];
}

export interface AIEvent {
  id: string;
  type: 'mic' | 'camera';
  timestamp: Date;
  message: string;
}

// API functions
export const saveMeetingToDb = async (meeting: Meeting): Promise<Meeting | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/meetings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...meeting,
        startTime: meeting.startTime.toISOString(),
        endTime: meeting.endTime.toISOString(),
        aiEvents: meeting.aiEvents.map(event => ({
          ...event,
          timestamp: event.timestamp.toISOString()
        }))
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to save meeting: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error saving meeting to MongoDB:", error);
    toast.error("Failed to save meeting data to database");
    return null;
  }
};

export const getMeetingsFromDb = async (): Promise<Meeting[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/meetings`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch meetings: ${response.statusText}`);
    }

    const meetings = await response.json();
    
    // Convert ISO date strings back to Date objects
    return meetings.map((meeting: any) => ({
      ...meeting,
      startTime: new Date(meeting.startTime),
      endTime: new Date(meeting.endTime),
      aiEvents: meeting.aiEvents.map((event: any) => ({
        ...event,
        timestamp: new Date(event.timestamp)
      }))
    }));
  } catch (error) {
    console.error("Error fetching meetings from MongoDB:", error);
    toast.error("Failed to load meeting data from database");
    return [];
  }
};

export const getMeetingById = async (id: string): Promise<Meeting | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/meetings/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch meeting: ${response.statusText}`);
    }

    const meeting = await response.json();
    
    // Convert ISO date strings back to Date objects
    return {
      ...meeting,
      startTime: new Date(meeting.startTime),
      endTime: new Date(meeting.endTime),
      aiEvents: meeting.aiEvents.map((event: any) => ({
        ...event,
        timestamp: new Date(event.timestamp)
      }))
    };
  } catch (error) {
    console.error(`Error fetching meeting ${id} from MongoDB:`, error);
    toast.error("Failed to load meeting data from database");
    return null;
  }
};

export const deleteMeeting = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/meetings/${id}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete meeting: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error(`Error deleting meeting ${id} from MongoDB:`, error);
    toast.error("Failed to delete meeting from database");
    return false;
  }
};
