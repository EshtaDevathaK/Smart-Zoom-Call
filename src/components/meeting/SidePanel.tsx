
import React from 'react';
import { useMeetingContext } from '@/contexts/MeetingContext';
import { AlertTriangle, Mic, Camera } from 'lucide-react';
import { cn } from '@/lib/utils';

const SidePanel = () => {
  const { aiEvents, participants } = useMeetingContext();

  return (
    <div className="space-y-4">
      {/* Participants panel */}
      <div className="bg-card border border-border rounded-lg p-4 overflow-y-auto">
        <h3 className="text-sm font-medium mb-4">Participants ({participants.length})</h3>
        <div className="space-y-2">
          {participants.map((name, index) => (
            <div key={index} className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-md">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-white",
                index === 0 ? "bg-purple-600" : "bg-blue-600"
              )}>
                {name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* AI detection events */}
      <div className="bg-card border border-border rounded-lg p-4 min-h-[200px] max-h-[300px] overflow-y-auto">
        <h3 className="text-sm font-medium mb-4 flex items-center gap-1">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          AI Detection Events
        </h3>
        
        {aiEvents.length === 0 ? (
          <div className="text-center text-muted-foreground text-sm py-8">
            No events detected yet
          </div>
        ) : (
          <div className="space-y-2">
            {aiEvents.map((event) => (
              <div 
                key={event.id}
                className={cn(
                  "p-2 rounded-md text-xs border",
                  event.type === 'mic' 
                    ? 'bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800/30' 
                    : 'bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-800/30'
                )}
              >
                <div className="flex justify-between">
                  <span className="font-medium flex items-center gap-1.5">
                    {event.type === 'mic' ? (
                      <>
                        <Mic className="h-3 w-3" />
                        Microphone Alert
                      </>
                    ) : (
                      <>
                        <Camera className="h-3 w-3" />
                        Camera Alert
                      </>
                    )}
                  </span>
                  <span className="text-muted-foreground">
                    {event.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="mt-1">{event.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SidePanel;
