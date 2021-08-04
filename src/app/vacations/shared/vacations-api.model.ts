export interface APIVacations {
  readonly id: number;
  readonly teams: APIVacationsTeam[];
}

export interface APIVacationsTeam {
  readonly name: string;
  readonly percentageOfAbsent: number[];
  readonly members: APIVacationsMember[];
  readonly id: number;
  readonly colorTheme: number;
}

export interface APIVacationsMember {
  readonly name: string;
  readonly vacations: APIVacationsVacation[];
  readonly id: number;
}

export interface APIVacationsVacation {
  readonly endDate: string;
  readonly startDate: string;
  readonly type: string;
}
