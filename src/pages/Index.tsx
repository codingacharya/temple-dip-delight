
import { useState } from "react";
import { Plus, Users, Clock, Trophy, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SavaCard from "@/components/SavaCard";
import TokenGenerator from "@/components/TokenGenerator";
import QueueMonitor from "@/components/QueueMonitor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Sava {
  id: string;
  name: string;
  description: string;
  maxCapacity: number;
  currentQueue: number;
  isActive: boolean;
  timeSlot: string;
  priority: 'high' | 'medium' | 'low';
}

const Index = () => {
  const [savas, setSavas] = useState<Sava[]>([
    {
      id: '1',
      name: 'Darshan',
      description: 'Main temple darshan for devotees',
      maxCapacity: 500,
      currentQueue: 234,
      isActive: true,
      timeSlot: '6:00 AM - 12:00 PM',
      priority: 'high'
    },
    {
      id: '2',
      name: 'Abhishekam',
      description: 'Special abhishekam ceremony',
      maxCapacity: 100,
      currentQueue: 67,
      isActive: true,
      timeSlot: '9:00 AM - 11:00 AM',
      priority: 'medium'
    },
    {
      id: '3',
      name: 'Prasadam',
      description: 'Blessed food distribution',
      maxCapacity: 1000,
      currentQueue: 123,
      isActive: true,
      timeSlot: '12:00 PM - 6:00 PM',
      priority: 'low'
    },
    {
      id: '4',
      name: 'Evening Aarti',
      description: 'Evening prayer ceremony',
      maxCapacity: 300,
      currentQueue: 45,
      isActive: false,
      timeSlot: '6:00 PM - 8:00 PM',
      priority: 'medium'
    }
  ]);

  const [selectedSava, setSelectedSava] = useState<string>('');

  const totalDevotees = savas.reduce((sum, sava) => sum + sava.currentQueue, 0);
  const activeServices = savas.filter(sava => sava.isActive).length;

  const handleGenerateToken = (savaId: string) => {
    setSavas(prev => prev.map(sava => 
      sava.id === savaId 
        ? { ...sava, currentQueue: sava.currentQueue + 1 }
        : sava
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">श्री मंदिर प्रबंधन</h1>
              <p className="text-orange-100 mt-1">Temple Crowd Management System</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Users className="w-4 h-4 mr-1" />
                {totalDevotees} Devotees
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Trophy className="w-4 h-4 mr-1" />
                {activeServices} Active Services
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="generate" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Generate Token
            </TabsTrigger>
            <TabsTrigger value="monitor" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Monitor Queue
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-blue-100">Total Devotees</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalDevotees}</div>
                  <p className="text-xs text-blue-100 mt-1">Currently in queue</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-green-100">Active Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{activeServices}</div>
                  <p className="text-xs text-green-100 mt-1">Currently running</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-purple-100">Average Wait</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">25 min</div>
                  <p className="text-xs text-purple-100 mt-1">Estimated time</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-orange-100">Peak Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">9-11 AM</div>
                  <p className="text-xs text-orange-100 mt-1">Busiest time</p>
                </CardContent>
              </Card>
            </div>

            {/* Sava Services Grid */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Temple Services (Savas)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savas.map((sava) => (
                  <SavaCard
                    key={sava.id}
                    sava={sava}
                    onGenerateToken={() => handleGenerateToken(sava.id)}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="generate">
            <TokenGenerator savas={savas} onTokenGenerated={handleGenerateToken} />
          </TabsContent>

          <TabsContent value="monitor">
            <QueueMonitor savas={savas} />
          </TabsContent>

          <TabsContent value="settings">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Temple Settings</CardTitle>
                <CardDescription>Configure temple services and crowd management parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8 text-gray-500">
                  <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Settings panel coming soon...</p>
                  <p className="text-sm">Configure service timings, capacity limits, and notification preferences</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
