
import React from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Monitor, Shield, Zap, Database } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-4">
              About ZoomWatcher
            </h1>
            <p className="text-xl text-muted-foreground">
              Leveraging artificial intelligence to make your virtual meetings more seamless
            </p>
          </div>
          
          <Card className="mb-10">
            <CardContent className="pt-6">
              <p className="leading-7 mb-4">
                ZoomWatcher is an innovative AI-powered application designed to enhance your video call experience by detecting common issues that can occur during virtual meetings.
              </p>
              
              <p className="leading-7 mb-4">
                Using advanced machine learning algorithms, ZoomWatcher can detect when you're speaking while your microphone is muted, or when your camera is on but you're not in frame, helping you avoid those awkward "You're on mute!" moments.
              </p>
              
              <p className="leading-7">
                Our application prioritizes privacy and security, with all AI processing happening locally on your device. No audio or video data is ever transmitted to our servers, ensuring your conversations remain private.
              </p>
            </CardContent>
          </Card>
          
          <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={item}>
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="mr-4 p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                      <Monitor className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium">Real-time Monitoring</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    ZoomWatcher constantly monitors your audio and video during calls, using AI to detect specific patterns that indicate potential issues.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={item}>
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="mr-4 p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium">Instant Alerts</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    When an issue is detected, you'll receive an immediate notification allowing you to quickly correct the problem and continue your meeting.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={item}>
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="mr-4 p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                      <Database className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium">Meeting Insights</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    After your meeting, ZoomWatcher provides a summary of detected events, helping you understand and improve your virtual meeting habits.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={item}>
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="mr-4 p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium">Privacy Protected</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Your privacy is our priority. All processing happens locally on your device, ensuring your meeting content remains completely private.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
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

export default About;
