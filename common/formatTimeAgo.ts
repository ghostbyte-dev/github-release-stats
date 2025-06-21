export function formatTimeAgo(date: Date | string): string {
  let _date: Date = new Date();

  if (typeof date === 'string') {
    _date = new Date(date);
  } else {
    _date = date;
  }

  const seconds: number = Math.floor((new Date().getTime() - _date.getTime()) / 1000);

  const intervals: Record<string, number> = {
    year: 31536000,
    month: 2628000,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval: number = Math.floor(seconds / secondsInUnit);
    if (interval > 1) {
      return `${interval} ${unit}s ago`;
    }
    if (interval === 1) {
      return `${interval} ${unit} ago`;
    }
  }

  // If no larger unit is found, return "just now"
  return 'just now';
}
