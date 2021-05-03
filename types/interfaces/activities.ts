export interface Activities {
  activities: Record<string, Activity>;
  activitiesIDs: string[];
}

export interface Activity {
  id: string;
  name: string;
  daysIDs: string[];
  days: Record<string, ActivityDay>;
}

export interface ActivityMonths {
  moths: ActivityWeeks[];
  monthsIDs: string[];
}
export interface ActivityWeeks {
  weeks: string[][];
  weeksIDs: string[];
}

export interface ActivityDay {
  id: string;
  completed: boolean;
}
