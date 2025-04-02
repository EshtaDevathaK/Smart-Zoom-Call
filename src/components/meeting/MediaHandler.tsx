
import { useEffect, useState } from 'react';
import { toast } from "sonner";
import { useMeetingContext } from '@/contexts/MeetingContext';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

const MediaHandler = () => {
  const { setLocalStream, setMicEnabled, setVideoEnabled } = useMeetingContext();
  const [error, setError] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);

  // Initialize local stream
  useEffect(() => {
    const initStream = async () => {
      try {
        setIsRetrying(true);
        setError(null);
        
        // Try to get user media with both audio and video
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true
        });
        
        setLocalStream(stream);
        setMicEnabled(true);
        setVideoEnabled(true);
        toast.success("Camera and microphone connected!");
        setIsRetrying(false);
      } catch (audioVideoError) {
        console.error("Error accessing camera and mic:", audioVideoError);
        
        // If that fails, try with just audio
        try {
          const audioOnlyStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false
          });
          
          setLocalStream(audioOnlyStream);
          setMicEnabled(true);
          setVideoEnabled(false);
          setError("Unable to access camera. Audio only mode enabled.");
          toast.warning("Camera access denied. Using audio only.");
          setIsRetrying(false);
        } catch (audioOnlyError) {
          console.error("Error accessing audio only:", audioOnlyError);
          setError("Unable to access microphone and camera. Please check permissions.");
          toast.error("Failed to access camera and microphone");
          setIsRetrying(false);
        }
      }
    };

    initStream();

    return () => {
      // Cleanup function will be handled by the parent component
    };
  }, [setLocalStream, setMicEnabled, setVideoEnabled]);

  if (error) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return null; // This component doesn't render anything when no errors
};

export default MediaHandler;
