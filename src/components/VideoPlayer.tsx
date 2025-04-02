
import React, { useRef, useEffect, useState } from 'react';
import { cn } from "@/lib/utils";
import { User } from 'lucide-react';

interface VideoPlayerProps {
  stream?: MediaStream | null;
  muted?: boolean;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  stream = null, 
  muted = false,
  className = ""
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideo, setHasVideo] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      setHasVideo(stream.getVideoTracks().length > 0 && stream.getVideoTracks()[0].enabled);
    } else {
      setHasVideo(false);
    }
  }, [stream]);

  return (
    <div className={cn("bg-gray-900 rounded-lg overflow-hidden relative", className)}>
      {stream ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted={muted}
            className={cn(
              "w-full h-full object-cover transition-opacity", 
              !hasVideo || !videoLoaded ? "opacity-0" : "opacity-100"
            )}
            onLoadedMetadata={() => setVideoLoaded(true)}
          />
          {(!hasVideo || !videoLoaded) && (
            <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gray-700 mb-2 flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
                <span className="text-gray-400 text-sm">Camera Off</span>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gray-700 mb-2 flex items-center justify-center">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <span className="text-gray-400 text-sm">Camera Off</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
