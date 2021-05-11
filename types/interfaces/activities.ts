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
  moths: ActivityMonth[];
  monthsIDs: string[];
}
export interface ActivityMonth {
  weeks: string[][];
  weeksIDs: string[];
}

export interface ActivityDay {
  id: string;
  completed: boolean;
}

export interface ActivityData {
  name: string;
  daysCompleted: number;
  id: string;
}
