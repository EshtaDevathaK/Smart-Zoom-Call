
import { useEffect } from 'react';
import { useMeetingContext } from '@/contexts/MeetingContext';

const DurationTracker = () => {
  const { meetingStart, setDuration } = useMeetingContext();

  // Track meeting duration
  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(Math.floor((Date.now() - meetingStart.getTime()) / 1000));
    }, 1000);
    
    return () => clearInterval(interval);
  }, [meetingStart, setDuration]);

  return null; // This component doesn't render anything
};

export default DurationTracker;
