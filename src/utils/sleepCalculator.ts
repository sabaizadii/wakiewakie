
const addMinutes = (time: string, minutes: number): string => {
  const [hours, mins] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, mins + minutes);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

const subtractMinutes = (time: string, minutes: number): string => {
  return addMinutes(time, -minutes);
};

export const calculateBedtimes = (wakeUpTime: string): string[] => {
  // Calculate 6 sleep cycles back (90 minutes each) plus 15 minutes to fall asleep
  const times: string[] = [];
  let totalMinutes = 15; // 15 minutes to fall asleep

  for (let i = 6; i >= 4; i--) {
    totalMinutes = 15 + i * 90; // 15 minutes to fall asleep + sleep cycles
    times.push(subtractMinutes(wakeUpTime, totalMinutes));
  }

  return times;
};

export const calculateWakeupTimes = (): string[] => {
  const now = new Date();
  const currentTime = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  // Calculate 6 sleep cycles forward (90 minutes each) plus 15 minutes to fall asleep
  const times: string[] = [];
  let totalMinutes = 15; // 15 minutes to fall asleep

  for (let i = 4; i <= 6; i++) {
    totalMinutes = 15 + i * 90; // 15 minutes to fall asleep + sleep cycles
    times.push(addMinutes(currentTime, totalMinutes));
  }

  return times;
};
