
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
}

export const TimePicker = ({ value, onChange }: TimePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));

  const [selectedHour, selectedMinute] = value.split(":");

  useEffect(() => {
    const handleClickOutside = () => setIsOpen(false);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="w-full text-lg font-medium"
      >
        {value}
      </Button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-card rounded-lg shadow-lg border border-border overflow-hidden glass-effect">
          <div className="flex">
            <ScrollArea className="h-48 w-1/2 border-r border-border">
              {hours.map((hour) => (
                <div
                  key={hour}
                  className={`p-2 text-center cursor-pointer hover:bg-primary/20 transition-colors ${
                    hour === selectedHour ? "bg-primary/30 text-primary-foreground" : ""
                  }`}
                  onClick={() => {
                    onChange(`${hour}:${selectedMinute}`);
                  }}
                >
                  {hour}
                </div>
              ))}
            </ScrollArea>
            <ScrollArea className="h-48 w-1/2">
              {minutes.map((minute) => (
                <div
                  key={minute}
                  className={`p-2 text-center cursor-pointer hover:bg-primary/20 transition-colors ${
                    minute === selectedMinute ? "bg-primary/30 text-primary-foreground" : ""
                  }`}
                  onClick={() => {
                    onChange(`${selectedHour}:${minute}`);
                  }}
                >
                  {minute}
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>
      )}
    </div>
  );
};
