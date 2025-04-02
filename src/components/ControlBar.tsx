
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Mic, MicOff, Video, VideoOff, 
  Phone, Share2, Users, MessageSquare, 
  Settings, AlertTriangle, LayoutGrid, MonitorSmartphone
} from "lucide-react";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useMeetingContext } from '@/contexts/MeetingContext';

interface ControlBarProps {
  micEnabled: boolean;
  videoEnabled: boolean;
  onToggleMic: () => void;
  onToggleVideo: () => void;
  onEndCall: () => void;
}

const ControlBar: React.FC<ControlBarProps> = ({ 
  micEnabled, 
  videoEnabled, 
  onToggleMic, 
  onToggleVideo, 
  onEndCall 
}) => {
  const { isScreenSharing, shareScreen } = useMeetingContext();
  
  const showAIAlert = () => {
    toast("AI Detection Alert", {
      description: "You might be speaking while muted!",
      icon: <AlertTriangle className="h-4 w-4 text-amber-500" />,
    });
  };

  return (
    <div className="bg-card/90 backdrop-blur-sm border border-border rounded-full p-2 flex items-center justify-center gap-2 max-w-md mx-auto">
      <Button 
        variant={micEnabled ? "default" : "destructive"} 
        size="icon" 
        className="rounded-full" 
        onClick={onToggleMic}
      >
        {micEnabled ? (
          <Mic className="h-5 w-5" />
        ) : (
          <MicOff className="h-5 w-5" />
        )}
      </Button>
      
      <Button 
        variant={videoEnabled ? "default" : "destructive"} 
        size="icon" 
        className="rounded-full" 
        onClick={onToggleVideo}
      >
        {videoEnabled ? (
          <Video className="h-5 w-5" />
        ) : (
          <VideoOff className="h-5 w-5" />
        )}
      </Button>
      
      <Button 
        variant={isScreenSharing ? "destructive" : "outline"} 
        size="icon" 
        className="rounded-full" 
        onClick={() => shareScreen()}
      >
        {isScreenSharing ? (
          <MonitorSmartphone className="h-5 w-5" />
        ) : (
          <Share2 className="h-5 w-5" />
        )}
      </Button>
      
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full"
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[320px] sm:w-[400px]">
          <div className="px-1 py-6">
            <h2 className="text-lg font-medium mb-4">Meeting Chat</h2>
            <div className="h-[60vh] bg-muted/30 rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Chat functionality coming soon</p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full"
          >
            <Users className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[320px] sm:w-[400px]">
          <div className="px-1 py-6">
            <h2 className="text-lg font-medium mb-4">Participants</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-md">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white">
                  Y
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">You (Host)</p>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      
      <Button 
        variant="outline" 
        size="icon" 
        className="rounded-full" 
        onClick={showAIAlert}
      >
        <AlertTriangle className="h-5 w-5" />
      </Button>
      
      <Button 
        variant="outline" 
        size="icon" 
        className="rounded-full" 
        onClick={() => toast("Layout options coming soon")}
      >
        <LayoutGrid className="h-5 w-5" />
      </Button>
      
      <Button 
        variant="outline" 
        size="icon" 
        className="rounded-full" 
        onClick={() => toast("Settings feature coming soon")}
      >
        <Settings className="h-5 w-5" />
      </Button>
      
      <Button 
        variant="destructive" 
        size="icon" 
        className="rounded-full" 
        onClick={onEndCall}
      >
        <Phone className="h-5 w-5 rotate-[135deg]" />
      </Button>
    </div>
  );
};

export default ControlBar;
