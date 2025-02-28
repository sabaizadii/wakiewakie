
import { useState, useEffect } from "react";
import "../styles/timepicker-custom.css";
import { Switch } from "@/components/ui/switch";

interface TimeInputProps {
  value: string;
  onChange: (time: string) => void;
}

export const TimeInput = ({ value, onChange }: TimeInputProps) => {
  const [hours, setHours] = useState<string>("07");
  const [minutes, setMinutes] = useState<string>("00");
  const [period, setPeriod] = useState<"AM" | "PM">("AM");

  // Initialize from value prop
  useEffect(() => {
    if (!value) return;
    
    try {
      const date = new Date(`2000-01-01 ${value}`);
      if (isNaN(date.getTime())) return;
      
      const hours24 = date.getHours();
      const hours12 = hours24 % 12 || 12;
      const minutes = date.getMinutes();
      
      setHours(hours12.toString().padStart(2, "0"));
      setMinutes(minutes.toString().padStart(2, "0"));
      setPeriod(hours24 >= 12 ? "PM" : "AM");
    } catch (e) {
      console.error("Error parsing time value:", e);
    }
  }, [value]);

  // Update parent component with new time in 24-hour format
  const updateTime = (newHours: string, newMinutes: string, newPeriod: "AM" | "PM") => {
    const hoursNum = parseInt(newHours, 10);
    const minutesNum = parseInt(newMinutes, 10);
    
    if (isNaN(hoursNum) || isNaN(minutesNum)) return;
    
    let hours24 = hoursNum;
    if (newPeriod === "PM" && hoursNum !== 12) hours24 += 12;
    if (newPeriod === "AM" && hoursNum === 12) hours24 = 0;
    
    const timeString = `${hours24.toString().padStart(2, "0")}:${newMinutes}`;
    onChange(timeString);
  };

  // Handle hours input
  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue === "") {
      setHours("00");
      updateTime("00", minutes, period);
      return;
    }

    // Only allow numbers and limit to 2 digits
    const numericValue = newValue.replace(/[^0-9]/g, "").slice(0, 2);
    
    // Convert to valid 12-hour format hours (01-12)
    let formattedHours = numericValue;
    if (numericValue === "00") formattedHours = "12";
    if (parseInt(numericValue, 10) > 12) formattedHours = "12";
    if (numericValue === "") formattedHours = "00";
    
    setHours(formattedHours.padStart(2, "0"));
    updateTime(formattedHours, minutes, period);
  };

  // Handle minutes input
  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue === "") {
      setMinutes("00");
      updateTime(hours, "00", period);
      return;
    }

    // Only allow numbers and limit to 2 digits
    const numericValue = newValue.replace(/[^0-9]/g, "").slice(0, 2);
    
    // Ensure minutes are valid (00-59)
    let formattedMinutes = numericValue;
    if (parseInt(numericValue, 10) > 59) formattedMinutes = "59";
    if (numericValue === "") formattedMinutes = "00";
    
    setMinutes(formattedMinutes.padStart(2, "0"));
    updateTime(hours, formattedMinutes, period);
  };

  // Handle AM/PM toggle
  const handlePeriodChange = (newPeriod: "AM" | "PM") => {
    setPeriod(newPeriod);
    updateTime(hours, minutes, newPeriod);
  };

  return (
    <div className="flex items-center justify-center gap-6">
      <div className="custom-time-input">
        <div className="time-display">
          <input
            type="text"
            value={hours}
            onChange={handleHoursChange}
            className="hours-input"
            maxLength={2}
          />
          <span className="time-separator">:</span>
          <input
            type="text"
            value={minutes}
            onChange={handleMinutesChange}
            className="minutes-input"
            maxLength={2}
          />
        </div>
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
