
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMeetingsFromDb, deleteMeeting, Meeting } from '@/services/mongoDbService';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

const MeetingHistory = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadMeetings();
  }, []);

  const loadMeetings = async () => {
    setIsLoading(true);
    const fetchedMeetings = await getMeetingsFromDb();
    setMeetings(fetchedMeetings);
    setIsLoading(false);
  };

  const handleDeleteMeeting = async (id: string) => {
    if (!id) return;
    
    setDeletingId(id);
    const success = await deleteMeeting(id);
    
    if (success) {
      toast.success("Meeting deleted successfully");
      setMeetings(meetings.filter(meeting => meeting._id !== id));
    }
    
    setDeletingId(null);
  };

  const formatDuration = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    return [
      hrs > 0 ? `${hrs}h` : '',
      mins > 0 ? `${mins}m` : '',
      `${secs}s`
    ].filter(Boolean).join(' ');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Meeting History</h1>
          <Button onClick={() => navigate('/meeting')}>New Meeting</Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : meetings.length === 0 ? (
          <Card>
            <CardContent className="py-10">
              <div className="text-center">
                <p className="text-muted-foreground mb-4">No meeting records found</p>
                <Button onClick={() => navigate('/meeting')}>Start Your First Meeting</Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {meetings.map((meeting) => (
              <Card key={meeting._id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-lg">
                      Meeting on {format(meeting.startTime, 'PPP')}
                    </CardTitle>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => meeting._id && handleDeleteMeeting(meeting._id)}
                      disabled={deletingId === meeting._id}
                    >
                      {deletingId === meeting._id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4 text-destructive" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Start Time:</span>
                      <span>{format(meeting.startTime, 'p')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">End Time:</span>
                      <span>{format(meeting.endTime, 'p')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDuration(meeting.duration)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">AI Events:</span>
                      <span className="font-semibold">{meeting.aiEvents.length}</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2" 
                      onClick={() => meeting._id && navigate(`/meetings/${meeting._id}`)}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingHistory;
