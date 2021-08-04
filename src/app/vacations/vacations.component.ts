import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';
import {VacationsApiService} from './services/vacations-api/vacations-api.service';
import {DateUtilsService} from '../shared/services/date-utils/date-utils.service';
import {
  VacationCalendar,
  VacationCalendarDay,
  VacationCalendarStats,
  VacationCalendarTotal,
  VacationsDay, VacationsMember, VacationsMemberCalendar,
  VacationsTeam,
  VacationsTeamCalendar,
  VacationsVacation
} from './shared/vacations.model';

@Component({
  selector: 'app-vacations',
  templateUrl: './vacations.component.html',
  styleUrls: ['./vacations.component.scss'],
})
export class VacationsComponent implements OnInit {

  constructor(private readonly VacationsService: VacationsApiService, private readonly dateUtilsService: DateUtilsService) {}

  public readonly VacationsTeams$ = this.VacationsService.getVacationsTeams();
  public readonly selectedDate$ = new BehaviorSubject<Date>(new Date());
  public readonly calendar$ = new BehaviorSubject<VacationCalendar | null>(null);
  public readonly VacationsTypes$ = this.VacationsService.getVacationsTypes();

  transformSelectedMonthToCalendarDays(selectedDate: Date): VacationCalendarDay[] {
    return this.dateUtilsService
      .getAllDaysFromMonth(selectedDate.getFullYear(), selectedDate.getMonth())
      .map(item => ({
        date: item,
        isWeekend: this.dateUtilsService.isWeekendDate(item),
      }));
  }

  getVacationsForSelectedMonth(vacations: VacationsVacation[], selectedDate: Date): VacationsDay {
    const vacationsDays: VacationsDay = {};
    vacations.forEach(Vacation => {
      if (!this.dateUtilsService.checkDateIncludeInPeriod(selectedDate, Vacation.startDate, Vacation.endDate, 'month')) {
        return false;
      }
      const days: Date[] = [];
      this.dateUtilsService.getDatesFromPeriod(Vacation.startDate, Vacation.endDate).forEach((date, index, array) => {
        if (date.getMonth() === selectedDate.getMonth()) {
          days.push(date);
        }
      });
      days.forEach((day, index, array) => {
        vacationsDays[day.getDate()] = {
          type: Vacation.type,
          typeTime: array.length === 1 ? 'single' : index === 0 ? 'start' : index === array.length - 1 ? 'end' :  'default',
          text: index === 0 || array.length === 1 ? {
            text: 'Pd',
            cells: array.length
          } : false
        };
      });
    });
    return vacationsDays;
  }

  getStatisticsForSelectedMonth(teams: VacationsTeamCalendar[], selectedDate: Date): VacationCalendarTotal {
    return teams.reduce((accumulator, team) => {
      return {
        members: accumulator.members + team.members.length,
        percentageOfAbsent: accumulator.percentageOfAbsent + team.percentageOfAbsent[selectedDate.getMonth()]
      };
    }, {
      members: 0,
      percentageOfAbsent: 0
    });
  }

  calculateVacationsForEachDay(teams: VacationsTeamCalendar[]): VacationCalendarStats {
    return teams.reduce((accumulator, team) => {

      const newStats: VacationCalendarStats = {};
      team.members.forEach(member => {
        Object.keys(member.vacationsDays).forEach(day => {
          const accumulatorValue = accumulator[Number(day)];
          newStats[Number(day)] = accumulatorValue !== undefined ? accumulatorValue + 1 : 1;
        });
      });
      return {
        ...accumulator,
        ...newStats
      };

    }, {} as VacationCalendarStats);
  }

  getMembersForCalendar(members: VacationsMember[], selectedDate: Date): VacationsMemberCalendar[] {
    return members.map(member => {
      const vacationsDays = this.getVacationsForSelectedMonth(member.vacations, selectedDate);
      const countDays = Object.keys(vacationsDays).length;
      return {
        id: member.id,
        name: member.name,
        vacations: member.vacations,
        vacationsDays,
        countDays
      };
    });
  }

  getTeamsForCalendar(teams: VacationsTeam[], selectedDate: Date): VacationsTeamCalendar[] {
    return teams.map(team => ({
      name: team.name,
      percentageOfAbsent: team.percentageOfAbsent,
      id: team.id,
      colorTheme: team.colorTheme,
      percentageOfAbsentOfMonth: team.percentageOfAbsent[selectedDate.getMonth()],
      countMembers: team.members.length,
      members: this.getMembersForCalendar(team.members, selectedDate)
    }));
  }


  ngOnInit(): void {
    combineLatest([this.VacationsTeams$, this.selectedDate$]).pipe(
      map(([VacationsTeams, selectedDate]) => {
        if (VacationsTeams === null) {
          return null;
        }
        const teams: VacationsTeamCalendar[] = this.getTeamsForCalendar(VacationsTeams, selectedDate);
        return {
          teams,
          dates: this.transformSelectedMonthToCalendarDays(selectedDate),
          stats: this.calculateVacationsForEachDay(teams),
          total: this.getStatisticsForSelectedMonth(teams, selectedDate)
        };
      }),
    ).subscribe(this.calendar$);
  }

  changeMonth(direction: 'next' | 'prev'): void {
    const monthNumber: number = direction === 'next' ? 1 : -1;
    this.selectedDate$.next(new Date(this.selectedDate$.value.setMonth(this.selectedDate$.value.getMonth() + monthNumber)));
  }

}
