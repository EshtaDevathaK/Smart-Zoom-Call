
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { Camera, Mic, Shield, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Index = () => {
  const navigate = useNavigate();

  const handleJoinMeeting = () => {
    navigate('/meeting');
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="flex flex-col lg:flex-row items-center gap-10 py-10">
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
                    Never Miss a Moment with AI-Powered Call Detection
                  </h1>
                  <p className="mt-4 text-xl text-muted-foreground">
                    ZoomWatcher uses AI to detect when you're accidentally muted or your camera is unexpectedly active, ensuring seamless and embarrassment-free video calls.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-medium"
                    onClick={handleJoinMeeting}
                  >
                    Join Meeting
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative w-full aspect-video bg-gradient-to-br from-purple-600/20 via-violet-600/20 to-indigo-600/20 rounded-2xl p-1">
                <div className="absolute inset-0 border border-purple-500/20 rounded-2xl bg-card/50 backdrop-blur-sm"></div>
                <div className="absolute top-4 right-4 flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse-slow"></div>
                  <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse-slow"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse-slow"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-card border border-border flex items-center justify-center">
                      <Camera className="h-8 w-8 text-primary" />
                    </div>
                    <p className="mt-4 text-muted-foreground">AI-powered detection ready</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Features Section */}
          <motion.div 
            className="py-20"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Powered by Advanced AI</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                Our intelligent system works in real-time to ensure your meetings run smoothly
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div variants={item} className="bg-card border border-border rounded-lg p-6">
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                  <Mic className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Mic Detection</h3>
                <p className="text-muted-foreground">
                  Detects when you're speaking while muted and sends you an instant alert
                </p>
              </motion.div>
              
              <motion.div variants={item} className="bg-card border border-border rounded-lg p-6">
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                  <Camera className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Camera Monitoring</h3>
                <p className="text-muted-foreground">
                  Alerts you when your camera is on but you're not in the frame
                </p>
              </motion.div>
              
              <motion.div variants={item} className="bg-card border border-border rounded-lg p-6">
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Privacy First</h3>
                <p className="text-muted-foreground">
                  All AI processing happens locally on your device for maximum privacy
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-card border-t border-border py-6">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-violet-500 flex items-center justify-center">
                <span className="text-white font-bold">ZW</span>
              </div>
              <span className="font-bold">ZoomWatcher</span>
            </div>
            <div className="text-sm text-muted-foreground mt-4 md:mt-0">
              © {new Date().getFullYear()} ZoomWatcher. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
