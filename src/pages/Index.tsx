
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TimeInput } from "@/components/TimeInput";

const Index = () => {
  const navigate = useNavigate();
  const [wakeUpTime, setWakeUpTime] = useState<string>("07:00");

  const handleCalculateBedtime = () => {
    navigate(`/bedtime?wakeup=${wakeUpTime}`);
  };

  const handleCalculateWakeup = () => {
    navigate("/wakeup");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col items-center space-y-2">
        <img 
          src="/lovable-uploads/c5460fd1-acb0-433d-b7f4-6ddaaf4e6d40.png" 
          alt="Sleep Calculator Logo" 
          className="w-32 h-32"
        />
        <h1 className="text-3xl font-bold text-primary mt-2">Wakie-Wakie</h1>
        <p className="text-xl text-muted-foreground">Sleep Calculator</p>
      </div>
      
      <Card className="glass-effect w-full max-w-md p-6 space-y-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center text-primary">What time do you want to wake up?</h2>
          <TimeInput value={wakeUpTime} onChange={setWakeUpTime} />
          <Button
            className="w-full hover-effect"
            onClick={handleCalculateBedtime}
          >
            <Moon className="mr-2 h-5 w-5" />
            Calculate bedtime
          </Button>
        </div>
      </Card>

      <div className="w-full max-w-md space-y-4">
        <p className="text-center text-muted-foreground">If you want to go to bed now...</p>
        <Button
          variant="secondary"
          className="w-full hover-effect"
          onClick={handleCalculateWakeup}
        >
          <Sun className="mr-2 h-5 w-5" />
          Calculate wake-up time
        </Button>
      </div>
    </div>
  );
};

export default Index;
