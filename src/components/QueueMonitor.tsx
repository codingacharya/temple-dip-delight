
import { Eye, Clock, Users, TrendingUp, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

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

interface QueueMonitorProps {
  savas: Sava[];
}

const QueueMonitor = ({ savas }: QueueMonitorProps) => {
  const getWaitTime = (queueLength: number) => {
    return Math.ceil(queueLength * 2.5); // Assuming 2.5 minutes per person
  };

  const getStatusColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getStatusText = (percentage: number) => {
    if (percentage >= 90) return 'Critical';
    if (percentage >= 70) return 'Busy';
    if (percentage >= 30) return 'Moderate';
    return 'Light';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Eye className="w-6 h-6" />
            Real-time Queue Monitor
          </CardTitle>
          <CardDescription className="text-blue-100">
            Live monitoring of all temple service queues and crowd density
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Queue Status Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {savas.map((sava) => {
          const capacityPercentage = (sava.currentQueue / sava.maxCapacity) * 100;
          const waitTime = getWaitTime(sava.currentQueue);
          
          return (
            <Card key={sava.id} className={`transition-all duration-300 ${
              sava.isActive ? 'border-blue-200 shadow-md' : 'border-gray-200 opacity-60'
            }`}>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                      {sava.name}
                      {!sava.isActive && (
                        <Badge variant="secondary" className="text-xs">Inactive</Badge>
                      )}
                    </CardTitle>
                    <CardDescription>{sava.timeSlot}</CardDescription>
                  </div>
                  <Badge 
                    className={`${
                      capacityPercentage >= 90 ? 'bg-red-100 text-red-800' :
                      capacityPercentage >= 70 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}
                  >
                    {getStatusText(capacityPercentage)}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Capacity Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      Queue Capacity
                    </span>
                    <span className={`font-semibold ${getStatusColor(capacityPercentage)}`}>
                      {capacityPercentage.toFixed(0)}%
                    </span>
                  </div>
                  <Progress value={capacityPercentage} className="h-3" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Current: {sava.currentQueue}</span>
                    <span>Max: {sava.maxCapacity}</span>
                  </div>
                </div>

                {/* Wait Time */}
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Estimated Wait</span>
                  </div>
                  <span className="text-lg font-bold text-blue-700">
                    {waitTime} min
                  </span>
                </div>

                {/* Priority and Trend */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="text-xs text-gray-500">Priority</div>
                    <div className={`text-sm font-semibold ${
                      sava.priority === 'high' ? 'text-red-600' :
                      sava.priority === 'medium' ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>
                      {sava.priority.toUpperCase()}
                    </div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="text-xs text-gray-500">Trend</div>
                    <div className="flex items-center justify-center gap-1 text-sm font-semibold text-green-600">
                      <TrendingUp className="w-3 h-3" />
                      Stable
                    </div>
                  </div>
                </div>

                {/* Alerts */}
                {capacityPercentage >= 90 && (
                  <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded-md">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-red-700">
                      Queue approaching capacity! Consider redirecting devotees.
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Summary Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Queue Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {savas.reduce((sum, sava) => sum + sava.currentQueue, 0)}
              </div>
              <p className="text-sm text-gray-600">Total Devotees</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {savas.filter(sava => sava.isActive).length}
              </div>
              <p className="text-sm text-gray-600">Active Services</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.ceil(savas.reduce((sum, sava) => sum + getWaitTime(sava.currentQueue), 0) / savas.length)}
              </div>
              <p className="text-sm text-gray-600">Avg Wait (min)</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {savas.filter(sava => (sava.currentQueue / sava.maxCapacity) >= 0.9).length}
              </div>
              <p className="text-sm text-gray-600">Critical Queues</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QueueMonitor;
