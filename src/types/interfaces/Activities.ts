export interface ActivityDay {
  dayKey: string;
  weekKey: string;
  completed: boolean;
}

export interface ActivityWeek {
  keys: string[];
  days: Record<string, ActivityDay>;
}

export interface ActivityMonth {
  keys: string[];
  weeks: Record<string, ActivityWeek>;
}

export interface Activity {
  name: string;
  months: ActivityMonth;
}

export interface Activities {
  activities: Record<string, Activity>;
  activitiesKeys: string[];
}
