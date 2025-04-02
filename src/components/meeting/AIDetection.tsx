
import { useEffect, useState, useRef } from 'react';
import { useMeetingContext } from '@/contexts/MeetingContext';

const AIDetection = () => {
  const { 
    localStream, 
    micEnabled, 
    videoEnabled, 
    addAIEvent,
    setAlertType, 
    setAlertMessage, 
    setShowAlert
  } = useMeetingContext();
  
  const audioAnalyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const frameIdRef = useRef<number | null>(null);
  
  // Counter for consecutive speaking frames
  const [speakingFrames, setSpeakingFrames] = useState(0);
  const [lastMicAlert, setLastMicAlert] = useState<number>(0);
  const [lastCameraAlert, setLastCameraAlert] = useState<number>(0);
  
  // Audio analysis setup
  useEffect(() => {
    let cleanup = () => {};
    
    if (localStream && localStream.getAudioTracks().length > 0) {
      const setupAudioAnalysis = () => {
        try {
          const audioContext = new AudioContext();
          const analyser = audioContext.createAnalyser();
          analyser.fftSize = 256;
          
          const source = audioContext.createMediaStreamSource(localStream);
          source.connect(analyser);
          
          const dataArray = new Uint8Array(analyser.frequencyBinCount);
          
          audioContextRef.current = audioContext;
          audioAnalyserRef.current = analyser;
          dataArrayRef.current = dataArray;
          
          const detectAudio = () => {
            if (audioAnalyserRef.current && dataArrayRef.current) {
              audioAnalyserRef.current.getByteFrequencyData(dataArrayRef.current);
              
              // Calculate average volume
              const average = dataArrayRef.current.reduce((sum, value) => sum + value, 0) / 
                              dataArrayRef.current.length;
              
              // Check for speaking while muted
              if (!micEnabled && average > 30) {
                setSpeakingFrames(prev => prev + 1);
                
                // Only trigger alert after multiple consecutive frames of speaking detection
                if (speakingFrames > 10 && Date.now() - lastMicAlert > 10000) {
                  triggerAIAlert('mic', "You appear to be speaking while your microphone is muted!");
                  setLastMicAlert(Date.now());
                  setSpeakingFrames(0);
                }
              } else {
                setSpeakingFrames(0);
              }
            }
            
            frameIdRef.current = requestAnimationFrame(detectAudio);
          };
          
          frameIdRef.current = requestAnimationFrame(detectAudio);
          
          cleanup = () => {
            if (frameIdRef.current) {
              cancelAnimationFrame(frameIdRef.current);
            }
            if (audioContextRef.current) {
              audioContextRef.current.close();
            }
          };
        } catch (error) {
          console.error("Error setting up audio analysis:", error);
        }
      };
      
      setupAudioAnalysis();
    }
    
    return cleanup;
  }, [localStream, micEnabled, speakingFrames, lastMicAlert]);
  
  // Video presence detection (simulated)
  useEffect(() => {
    let cameraDetectionInterval: NodeJS.Timeout;
    
    if (localStream && localStream.getVideoTracks().length > 0) {
      // Simulate camera detection alerts
      cameraDetectionInterval = setInterval(() => {
        if (videoEnabled && Math.random() < 0.1 && Date.now() - lastCameraAlert > 15000) {
          triggerAIAlert('camera', "Your camera is on but no face is detected in frame!");
          setLastCameraAlert(Date.now());
        }
      }, 15000);
    }
    
    return () => {
      clearInterval(cameraDetectionInterval);
    };
  }, [localStream, videoEnabled, lastCameraAlert]);

  const triggerAIAlert = (type: 'mic' | 'camera', message: string) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    
    // Record the event
    addAIEvent(type, message);
  };

  return null; // This component doesn't render anything
};

export default AIDetection;
