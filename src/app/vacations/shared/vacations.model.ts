export interface VacationCalendarDay {
  date: Date;
  isWeekend: boolean;
}

export interface VacationCalendar {
  dates: VacationCalendarDay[];
  teams: Array<VacationsTeamCalendar>;
  stats: VacationCalendarStats;
  total: VacationCalendarTotal;
}

export interface VacationCalendarStats {
  [key: number]: number;
}

export interface VacationCalendarTotal {
  members: number;
  percentageOfAbsent: number;
}

export interface VacationsTeamCalendar {
  readonly name: string;
  readonly percentageOfAbsent: number[];
  readonly members: VacationsMemberCalendar[];
  readonly id: number;
  readonly colorTheme: number;
  readonly percentageOfAbsentOfMonth: number;
  readonly countMembers: number;
}

export interface VacationsMemberCalendar {
  readonly name: string;
  readonly vacations: VacationsVacation[];
  readonly vacationsDays: VacationsDay;
  readonly countDays: number;
  readonly id: number;
}

export interface VacationsDay {
  [key: number]: {
    type: string | number,
    typeTime: 'start' | 'end' | 'single' | 'default';
    text: false | VacationsDayText
  };
}

export interface VacationsDayText {
  text: string;
  cells: number;
}

export interface ColorThemesTypesToCSSClass {
  [key: number]: string;
}

export type VacationsTypes = Array<{name: string, key: number}>;

export interface VacationsTeam {
  readonly name: string;
  readonly percentageOfAbsent: number[];
  readonly members: VacationsMember[];
  readonly id: number;
  readonly colorTheme: number;
}

export interface VacationsMember {
  readonly name: string;
  readonly vacations: VacationsVacation[];
  readonly id: number;
}

export interface VacationsVacation {
  readonly endDate: Date;
  readonly startDate: Date;
  readonly type: string | number;

}
