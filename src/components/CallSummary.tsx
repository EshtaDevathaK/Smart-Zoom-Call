
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Mic, Video, AlertTriangle, Save, Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface AIEvent {
  id: string;
  type: 'mic' | 'camera';
  timestamp: Date;
  message: string;
}

interface CallSummaryProps {
  duration: number; // in seconds
  aiEvents: AIEvent[];
  onSave: () => void;
  onNewMeeting: () => void;
  isSaving?: boolean;
}

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

const CallSummary: React.FC<CallSummaryProps> = ({
  duration,
  aiEvents,
  onSave,
  onNewMeeting,
  isSaving = false
}) => {
  const micEvents = aiEvents.filter(event => event.type === 'mic');
  const cameraEvents = aiEvents.filter(event => event.type === 'camera');
  
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <span className="text-primary">Call Summary</span>
        </CardTitle>
        <CardDescription>
          Your meeting has ended. Here's a summary of your call.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
          <div className="flex items-center gap-2">
            <Clock className="text-primary h-5 w-5" />
            <span className="font-medium">Call Duration</span>
          </div>
          <span className="text-lg font-semibold">{formatDuration(duration)}</span>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <AlertTriangle className="text-amber-500 h-5 w-5" />
            AI Detection Events
          </h3>
          
          {aiEvents.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No AI detection events recorded</p>
          ) : (
            <div className="space-y-2">
              {micEvents.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2 text-sm">
                    <Mic className="h-4 w-4" />
                    Microphone Events ({micEvents.length})
                  </h4>
                  <ul className="space-y-2">
                    {micEvents.map(event => (
                      <li 
                        key={event.id} 
                        className="p-3 bg-background border border-border rounded-md text-sm flex justify-between"
                      >
                        <span>{event.message}</span>
                        <span className="text-muted-foreground">
                          {event.timestamp.toLocaleTimeString()}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {cameraEvents.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2 text-sm">
                    <Video className="h-4 w-4" />
                    Camera Events ({cameraEvents.length})
                  </h4>
                  <ul className="space-y-2">
                    {cameraEvents.map(event => (
                      <li 
                        key={event.id} 
                        className="p-3 bg-background border border-border rounded-md text-sm flex justify-between"
                      >
                        <span>{event.message}</span>
                        <span className="text-muted-foreground">
                          {event.timestamp.toLocaleTimeString()}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
      
      <Separator className="my-2" />
      
      <CardFooter className="flex justify-between pt-4">
        <Button variant="outline" onClick={onNewMeeting}>
          New Meeting
        </Button>
        <Button 
          onClick={onSave} 
          className="flex items-center gap-2"
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save to MongoDB
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CallSummary;
