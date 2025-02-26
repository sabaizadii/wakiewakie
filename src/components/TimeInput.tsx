
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface TimeInputProps {
  value: string;
  onChange: (time: string) => void;
}

export const TimeInput = ({ value, onChange }: TimeInputProps) => {
  const [hours, setHours] = useState("07");
  const [minutes, setMinutes] = useState("00");
  const [period, setPeriod] = useState<"AM" | "PM">("AM");

  useEffect(() => {
    // Initialize from value prop
    const date = new Date(`2000-01-01 ${value}`);
    const hours24 = date.getHours();
    const hours12 = hours24 % 12 || 12;
    setHours(String(hours12).padStart(2, "0"));
    setMinutes(date.getMinutes().toString().padStart(2, "0"));
    setPeriod(hours24 >= 12 ? "PM" : "AM");
  }, [value]);

  const handleTimeChange = (newHours: string, newMinutes: string, newPeriod: "AM" | "PM") => {
    let hours24 = parseInt(newHours);
    if (newPeriod === "PM" && hours24 !== 12) hours24 += 12;
    if (newPeriod === "AM" && hours24 === 12) hours24 = 0;
    const timeString = `${hours24.toString().padStart(2, "0")}:${newMinutes}`;
    onChange(timeString);
  };

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val === "") val = "12";
    let num = parseInt(val);
    if (num === 0) num = 12;
    if (num > 12) num = 12;
    const newHours = num.toString().padStart(2, "0");
    setHours(newHours);
    handleTimeChange(newHours, minutes, period);
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val === "") val = "00";
    let num = parseInt(val);
    if (num > 59) num = 59;
    const newMinutes = num.toString().padStart(2, "0");
    setMinutes(newMinutes);
    handleTimeChange(hours, newMinutes, period);
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <div className="flex items-center gap-2">
        <Input
          type="text"
          value={hours}
          onChange={handleHoursChange}
          className="w-16 text-center text-lg"
          maxLength={2}
        />
        <span className="text-lg">:</span>
        <Input
          type="text"
          value={minutes}
          onChange={handleMinutesChange}
          className="w-16 text-center text-lg"
          maxLength={2}
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">AM</span>
        <Switch
          checked={period === "PM"}
          onCheckedChange={(checked) => {
            const newPeriod = checked ? "PM" : "AM";
            setPeriod(newPeriod);
            handleTimeChange(hours, minutes, newPeriod);
          }}
        />
        <span className="text-sm text-muted-foreground">PM</span>
      </div>
    </div>
  );
};
