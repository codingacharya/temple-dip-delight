
import { useState } from "react";
import { Ticket, Sparkles, RefreshCw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

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

interface TokenGeneratorProps {
  savas: Sava[];
  onTokenGenerated: (savaId: string) => void;
}

const TokenGenerator = ({ savas, onTokenGenerated }: TokenGeneratorProps) => {
  const [selectedSava, setSelectedSava] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastToken, setLastToken] = useState<string | null>(null);

  const generateRandomToken = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const letter = letters.charAt(Math.floor(Math.random() * letters.length));
    const number = Math.floor(Math.random() * 999) + 1;
    return `${letter}${number.toString().padStart(3, '0')}`;
  };

  const handleGenerateToken = async () => {
    if (!selectedSava) {
      toast({
        title: "Please select a service",
        description: "Choose a sava service to generate token for",
        variant: "destructive"
      });
      return;
    }

    const sava = savas.find(s => s.id === selectedSava);
    if (!sava) return;

    if (!sava.isActive) {
      toast({
        title: "Service Inactive",
        description: "This service is currently not active",
        variant: "destructive"
      });
      return;
    }

    if ((sava.currentQueue / sava.maxCapacity) >= 1) {
      toast({
        title: "Queue Full",
        description: "This service has reached maximum capacity",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate lucky dip animation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const token = generateRandomToken();
    setLastToken(token);
    onTokenGenerated(selectedSava);
    setIsGenerating(false);

    toast({
      title: "Token Generated! 🎫",
      description: `Your lucky token: ${token} for ${sava.name}`,
    });
  };

  const activeSavas = savas.filter(sava => sava.isActive);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-orange-800 flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6" />
            Lucky Dip Token Generator
            <Sparkles className="w-6 h-6" />
          </CardTitle>
          <CardDescription className="text-orange-700">
            Generate your token for temple services through fair lucky dip system
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Service Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Select Service (Sava)</label>
            <Select value={selectedSava} onValueChange={setSelectedSava}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a temple service" />
              </SelectTrigger>
              <SelectContent>
                {activeSavas.map((sava) => (
                  <SelectItem key={sava.id} value={sava.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{sava.name}</span>
                      <Badge variant="outline" className="ml-2">
                        {sava.currentQueue}/{sava.maxCapacity}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Selected Service Info */}
          {selectedSava && (
            <Card className="bg-white border-orange-200">
              <CardContent className="pt-4">
                {(() => {
                  const sava = savas.find(s => s.id === selectedSava);
                  if (!sava) return null;
                  return (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-800">{sava.name}</h3>
                        <Badge className={
                          sava.priority === 'high' ? 'bg-red-100 text-red-800' :
                          sava.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }>
                          {sava.priority} priority
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{sava.description}</p>
                      <div className="text-sm text-gray-500">
                        <p>Time: {sava.timeSlot}</p>
                        <p>Current Queue: {sava.currentQueue} / {sava.maxCapacity}</p>
                        <p>Estimated Wait: {Math.ceil((sava.currentQueue * 2.5))} minutes</p>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          )}

          {/* Generate Button */}
          <Button 
            onClick={handleGenerateToken}
            disabled={!selectedSava || isGenerating}
            className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-semibold py-4 text-lg"
          >
            {isGenerating ? (
              <div className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5 animate-spin" />
                Generating Lucky Token...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5" />
                Generate Lucky Token
              </div>
            )}
          </Button>

          {/* Last Generated Token */}
          {lastToken && (
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardContent className="pt-4 text-center">
                <div className="space-y-2">
                  <h3 className="font-semibold text-green-800">Your Lucky Token</h3>
                  <div className="text-3xl font-bold text-green-700 tracking-wider">
                    {lastToken}
                  </div>
                  <p className="text-sm text-green-600">
                    Please save this token number and proceed to the service counter
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{activeSavas.length}</div>
            <p className="text-sm text-gray-600">Active Services</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {savas.reduce((sum, sava) => sum + sava.currentQueue, 0)}
            </div>
            <p className="text-sm text-gray-600">Total Queue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold text-purple-600">25 min</div>
            <p className="text-sm text-gray-600">Avg. Wait Time</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TokenGenerator;
