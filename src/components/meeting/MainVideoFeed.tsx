
import React, { useEffect, useState } from 'react';
import VideoPlayer from '@/components/VideoPlayer';
import { useMeetingContext } from '@/contexts/MeetingContext';
import { Badge } from "@/components/ui/badge";
import { UserIcon, MicOff, VideoOff } from 'lucide-react';

const MainVideoFeed = () => {
  const { localStream, activeStream, micEnabled, videoEnabled } = useMeetingContext();
  const [currentStream, setCurrentStream] = useState<MediaStream | null>(null);
  const [userName, setUserName] = useState<string>("You");

  // Determine which stream to display as main feed
  useEffect(() => {
    if (activeStream) {
      setCurrentStream(activeStream);
      setUserName(activeStream === localStream ? "You" : "Remote User");
    } else {
      setCurrentStream(localStream);
      setUserName("You");
    }
  }, [localStream, activeStream]);

  return (
    <div className="md:col-span-2 relative rounded-lg overflow-hidden">
      <VideoPlayer 
        stream={currentStream} 
        muted={currentStream === localStream} 
        className="w-full aspect-video bg-gray-900 rounded-lg" 
      />
      
      {/* Status badges */}
      <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
        <Badge variant="outline" className="bg-black/70 text-white border-none px-3 py-1 flex items-center gap-1.5">
          <UserIcon className="h-3.5 w-3.5" />
          {userName}
        </Badge>
        
        {!micEnabled && currentStream === localStream && (
          <Badge variant="destructive" className="px-3 py-1 flex items-center gap-1.5">
            <MicOff className="h-3.5 w-3.5" />
            Muted
          </Badge>
        )}
        
        {!videoEnabled && currentStream === localStream && (
          <Badge variant="destructive" className="px-3 py-1 flex items-center gap-1.5">
            <VideoOff className="h-3.5 w-3.5" />
            Video Off
          </Badge>
        )}
      </div>
    </div>
  );
};

export default MainVideoFeed;
