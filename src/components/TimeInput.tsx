
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
    <div className="flex items-center justify-center gap-6">
      <div className="flex items-center gap-2">
        <Input
          type="text"
          value={hours}
          onChange={handleHoursChange}
          className="w-16 text-center text-xl font-bold"
          maxLength={2}
        />
        <span className="text-2xl font-bold">:</span>
        <Input
          type="text"
          value={minutes}
          onChange={handleMinutesChange}
          className="w-16 text-center text-xl font-bold"
          maxLength={2}
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
            setPeriod(newPeriod);
            handleTimeChange(hours, minutes, newPeriod);
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
