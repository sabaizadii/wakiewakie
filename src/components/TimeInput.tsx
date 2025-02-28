
import { useState, useEffect } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import { Switch } from "@/components/ui/switch";
import "../styles/timepicker-custom.css";

interface TimeInputProps {
  value: string;
  onChange: (time: string) => void;
}

export const TimeInput = ({ value, onChange }: TimeInputProps) => {
  const [time, setTime] = useState<string | null>("07:00");
  const [period, setPeriod] = useState<"AM" | "PM">("AM");

  useEffect(() => {
    // Initialize from value prop
    if (!value) return;
    
    try {
      const date = new Date(`2000-01-01 ${value}`);
      if (isNaN(date.getTime())) return;
      
      const hours24 = date.getHours();
      const hours12 = hours24 % 12 || 12;
      const minutes = date.getMinutes();
      
      setTime(`${hours12.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`);
      setPeriod(hours24 >= 12 ? "PM" : "AM");
    } catch (e) {
      console.error("Error parsing time value:", e);
    }
  }, [value]);

  const handleTimeChange = (newTime: string | null) => {
    if (!newTime) return;
    
    setTime(newTime);
    
    // Convert to 24-hour format for parent component
    const [hours, minutes] = newTime.split(':').map(Number);
    let hours24 = hours;
    
    if (period === "PM" && hours !== 12) hours24 += 12;
    if (period === "AM" && hours === 12) hours24 = 0;
    
    const timeString = `${hours24.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    onChange(timeString);
  };

  const handlePeriodChange = (newPeriod: "AM" | "PM") => {
    setPeriod(newPeriod);
    
    if (!time) return;
    
    // Convert to 24-hour format with the new period
    const [hours, minutes] = time.split(':').map(Number);
    let hours24 = hours;
    
    if (newPeriod === "PM" && hours !== 12) hours24 += 12;
    if (newPeriod === "AM" && hours === 12) hours24 = 0;
    
    const timeString = `${hours24.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    onChange(timeString);
  };

  return (
    <div className="flex items-center justify-center gap-6">
      <div className="time-picker-container">
        <TimePicker
          value={time}
          onChange={handleTimeChange}
          disableClock={true}
          format="h:mm"
          clearIcon={null}
          className="custom-time-picker"
        />
      </div>
      <div className="relative flex items-center gap-3 bg-yellow-500/20 px-4 py-2 rounded-full transition-all duration-300">
        <span className={`text-sm mr-1 font-medium transition-all duration-300 ${period === "AM" ? "text-yellow-400" : "text-muted-foreground/50"}`}>
          AM
        </span>
        <Switch
          checked={period === "PM"}
          onCheckedChange={(checked) => {
            const newPeriod = checked ? "PM" : "AM";
            handlePeriodChange(newPeriod);
          }}
          className="data-[state=checked]:bg-purple-700 data-[state=unchecked]:bg-yellow-400"
        />
        <span className={`text-sm ml-1 font-medium transition-all duration-300 ${period === "PM" ? "text-purple-300" : "text-muted-foreground/50"}`}>
          PM
        </span>
      </div>
    </div>
  );
};
