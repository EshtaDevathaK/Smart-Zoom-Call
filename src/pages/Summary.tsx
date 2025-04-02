
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import CallSummary from '@/components/CallSummary';
import { toast } from 'sonner';
import { saveMeetingToDb, AIEvent as MongoAIEvent } from '@/services/mongoDbService';

interface AIEvent {
  id: string;
  type: 'mic' | 'camera';
  timestamp: Date;
  message: string;
}

interface LocationState {
  duration: number;
  aiEvents: AIEvent[];
}

const Summary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  
  const state = location.state as LocationState;
  const duration = state?.duration || 0;
  const aiEvents = state?.aiEvents || [];

  // Fixed the date objects from serialization
  const fixedEvents = aiEvents.map(event => ({
    ...event,
    timestamp: new Date(event.timestamp)
  }));

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Save to MongoDB
      const result = await saveMeetingToDb({
        startTime: new Date(Date.now() - duration * 1000),
        endTime: new Date(),
        duration,
        aiEvents: fixedEvents as MongoAIEvent[]
      });
      
      if (result) {
        toast.success("Meeting data saved to MongoDB successfully!");
      } else {
        toast.error("Failed to save meeting data to MongoDB");
      }
    } catch (error) {
      console.error("Error saving meeting:", error);
      toast.error("An error occurred while saving meeting data");
    } finally {
      setIsSaving(false);
    }
  };

  const handleNewMeeting = () => {
    navigate('/meeting');
  };

  if (!state) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-16 flex flex-col items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">No meeting data available</h1>
            <p className="text-muted-foreground mt-2">Please join a meeting first</p>
            <button 
              onClick={() => navigate('/meeting')}
              className="mt-6 bg-primary text-white px-4 py-2 rounded-md"
            >
              Join Meeting
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16 flex flex-col items-center justify-center">
        <CallSummary
          duration={duration}
          aiEvents={fixedEvents}
          onSave={handleSave}
          onNewMeeting={handleNewMeeting}
          isSaving={isSaving}
        />
      </div>
    </div>
  );
};

export default Summary;
