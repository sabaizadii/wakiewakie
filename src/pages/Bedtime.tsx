
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { calculateBedtimes } from "@/utils/sleepCalculator";

const Bedtime = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const wakeUpTime = new URLSearchParams(location.search).get("wakeup") || "07:00";
  const bedtimes = calculateBedtimes(wakeUpTime);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 space-y-8 animate-fade-in">
      <img src="/logo.png" alt="Sleep Calculator Logo" className="w-24 h-24 mb-4" />
      
      <Card className="glass-effect w-full max-w-md p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-center text-primary">Bedtime</h1>
        <p className="text-center text-muted-foreground">
          The average human takes 15 minutes to fall asleep.
        </p>
        <p className="text-center">
          To wake up refreshed at <span className="text-primary font-medium">{wakeUpTime}</span>,
          you need to go to sleep at one of the following times:
        </p>
        
        <div className="grid grid-cols-3 gap-4">
          {bedtimes.map((time, index) => (
            <div
              key={time}
              className={`p-3 text-center rounded-lg ${
                index < 2
                  ? "bg-primary/20 border border-primary/30"
                  : "bg-secondary"
              }`}
            >
              <p className="text-lg font-medium">{time}</p>
              {index < 2 && (
                <p className="text-xs text-primary">Suggested</p>
              )}
            </div>
          ))}
        </div>
        
        <p className="text-sm text-center text-muted-foreground">
          If you wake up at one of these times, you'll rise in between 90-minute sleep cycles.
          A good night's sleep consists of 5-6 complete sleep cycles.
        </p>
      </Card>

      <Button
        variant="ghost"
        onClick={() => navigate("/")}
        className="hover-effect"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Go back
      </Button>
    </div>
  );
};

export default Bedtime;
