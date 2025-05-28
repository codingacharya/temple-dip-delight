
import { Clock, Users, Play, Pause, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

interface SavaCardProps {
  sava: Sava;
  onGenerateToken: () => void;
}

const SavaCard = ({ sava, onGenerateToken }: SavaCardProps) => {
  const getCapacityPercentage = () => (sava.currentQueue / sava.maxCapacity) * 100;
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getProgressColor = () => {
    const percentage = getCapacityPercentage();
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <Card className={`transition-all duration-300 hover:shadow-lg ${
      sava.isActive 
        ? 'border-orange-200 bg-gradient-to-br from-white to-orange-50' 
        : 'border-gray-200 bg-gray-50'
    }`}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              {sava.name}
              {sava.isActive ? (
                <Play className="w-4 h-4 text-green-600" />
              ) : (
                <Pause className="w-4 h-4 text-gray-400" />
              )}
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 mt-1">
              {sava.description}
            </CardDescription>
          </div>
          <Badge className={getPriorityColor(sava.priority)}>
            {sava.priority}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Time Slot */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{sava.timeSlot}</span>
        </div>

        {/* Queue Status */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              Queue Status
            </span>
            <span className="font-medium">
              {sava.currentQueue} / {sava.maxCapacity}
            </span>
          </div>
          
          <div className="space-y-1">
            <Progress 
              value={getCapacityPercentage()} 
              className="h-2"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Current: {sava.currentQueue}</span>
              <span>Capacity: {sava.maxCapacity}</span>
            </div>
          </div>
        </div>

        {/* Alerts */}
        {getCapacityPercentage() >= 90 && (
          <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded-md">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span className="text-sm text-red-700">Queue nearly full!</span>
          </div>
        )}

        {/* Action Button */}
        <Button 
          onClick={onGenerateToken}
          disabled={!sava.isActive || getCapacityPercentage() >= 100}
          className={`w-full ${
            sava.isActive 
              ? 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700' 
              : 'bg-gray-400'
          }`}
        >
          {!sava.isActive ? 'Service Inactive' : 
           getCapacityPercentage() >= 100 ? 'Queue Full' : 
           'Generate Token'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SavaCard;
