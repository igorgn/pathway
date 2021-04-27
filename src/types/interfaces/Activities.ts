//there is inconsistency in file naming convention,  this file name begins with Capital leter, while other dont. Please make this consistent across all files to use kebab-case.
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
