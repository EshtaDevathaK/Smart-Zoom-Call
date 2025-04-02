
import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

export interface AIEvent {
  id: string;
  type: 'mic' | 'camera';
  timestamp: Date;
  message: string;
}

interface MeetingContextType {
  localStream: MediaStream | null;
  setLocalStream: React.Dispatch<React.SetStateAction<MediaStream | null>>;
  remoteStreams: MediaStream[];
  addRemoteStream: (stream: MediaStream) => void;
  activeStream: MediaStream | null;
  setActiveStream: React.Dispatch<React.SetStateAction<MediaStream | null>>;
  micEnabled: boolean;
  setMicEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  videoEnabled: boolean;
  setVideoEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  aiEvents: AIEvent[];
  addAIEvent: (type: 'mic' | 'camera', message: string) => void;
  showAlert: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  alertMessage: string;
  setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
  alertType: 'mic' | 'camera';
  setAlertType: React.Dispatch<React.SetStateAction<'mic' | 'camera'>>;
  meetingStart: Date;
  duration: number;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  toggleMic: () => void;
  toggleVideo: () => void;
  shareScreen: () => Promise<void>;
  isScreenSharing: boolean;
  connectionStatus: 'connecting' | 'connected' | 'disconnected';
  participants: string[];
}

export const MeetingContext = createContext<MeetingContextType | null>(null);

export const useMeetingContext = () => {
  const context = useContext(MeetingContext);
  if (!context) {
    throw new Error('useMeetingContext must be used within a MeetingProvider');
  }
  return context;
};

interface MeetingProviderProps {
  children: ReactNode;
}

export const MeetingProvider: React.FC<MeetingProviderProps> = ({ children }) => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<MediaStream[]>([]);
  const [activeStream, setActiveStream] = useState<MediaStream | null>(null);
  const [micEnabled, setMicEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'mic' | 'camera'>('mic');
  const [aiEvents, setAiEvents] = useState<AIEvent[]>([]);
  const [meetingStart] = useState<Date>(new Date());
  const [duration, setDuration] = useState(0);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const [participants, setParticipants] = useState<string[]>(['You']);

  // Connect status simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setConnectionStatus('connected');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleMic = useCallback(() => {
    if (localStream) {
      const audioTracks = localStream.getAudioTracks();
      if (audioTracks.length > 0) {
        const enabled = !micEnabled;
        audioTracks[0].enabled = enabled;
        setMicEnabled(enabled);
        toast(enabled ? "Microphone unmuted" : "Microphone muted");
      }
    }
  }, [localStream, micEnabled]);

  const toggleVideo = useCallback(() => {
    if (localStream) {
      const videoTracks = localStream.getVideoTracks();
      if (videoTracks.length > 0) {
        const enabled = !videoEnabled;
        videoTracks[0].enabled = enabled;
        setVideoEnabled(enabled);
        toast(enabled ? "Camera turned on" : "Camera turned off");
      }
    }
  }, [localStream, videoEnabled]);

  const shareScreen = useCallback(async () => {
    try {
      if (isScreenSharing) {
        // Stop screen sharing
        if (localStream) {
          const videoTracks = localStream.getVideoTracks();
          videoTracks.forEach(track => {
            if (track.label.includes('screen')) {
              track.stop();
            }
          });
        }
        
        // Restore camera
        const cameraStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true
        });
        setLocalStream(cameraStream);
        setIsScreenSharing(false);
        toast.success("Screen sharing stopped");
      } else {
        // Start screen sharing
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true
        });
        
        // Add audio track from existing stream
        if (localStream) {
          const audioTracks = localStream.getAudioTracks();
          if (audioTracks.length > 0) {
            screenStream.addTrack(audioTracks[0].clone());
          }
        }
        
        setLocalStream(screenStream);
        setIsScreenSharing(true);
        
        // Set up listener for when user stops sharing
        screenStream.getVideoTracks()[0].onended = async () => {
          // Restore camera
          const cameraStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
          });
          setLocalStream(cameraStream);
          setIsScreenSharing(false);
          toast("Screen sharing stopped");
        };
        
        toast.success("Screen sharing started");
      }
    } catch (error) {
      console.error("Error sharing screen:", error);
      toast.error("Failed to share screen");
    }
  }, [isScreenSharing, localStream]);

  const addRemoteStream = useCallback((stream: MediaStream) => {
    setRemoteStreams(prev => [...prev, stream]);
    setActiveStream(stream);
    
    // Add participant when a new stream is added
    setParticipants(prev => [...prev, `User ${prev.length}`]);
    toast.success("New participant joined");
  }, []);

  const addAIEvent = useCallback((type: 'mic' | 'camera', message: string) => {
    const newEvent: AIEvent = {
      id: uuidv4(),
      type,
      timestamp: new Date(),
      message
    };
    setAiEvents(prev => [...prev, newEvent]);
  }, []);

  const value = {
    localStream,
    setLocalStream,
    remoteStreams,
    addRemoteStream,
    activeStream,
    setActiveStream,
    micEnabled,
    setMicEnabled,
    videoEnabled,
    setVideoEnabled,
    aiEvents,
    addAIEvent,
    showAlert,
    setShowAlert,
    alertMessage,
    setAlertMessage,
    alertType,
    setAlertType,
    meetingStart,
    duration,
    setDuration,
    toggleMic,
    toggleVideo,
    shareScreen,
    isScreenSharing,
    connectionStatus,
    participants
  };

  return <MeetingContext.Provider value={value}>{children}</MeetingContext.Provider>;
};
