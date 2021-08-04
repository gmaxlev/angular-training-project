import {Component, Input, OnInit} from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';
import {VacationCalendar, ColorThemesTypesToCSSClass} from '../../shared/vacations.model';
import {VacationsTeamCalendar, VacationCalendarDay} from '../../shared/vacations.model';
import {BehaviorSubject} from 'rxjs';
import {VacationsTeam} from '../../shared/vacations.model';
import {VacationsTypes} from '../../shared/vacations.model';

@Component({
  selector: 'app-vacations-table',
  templateUrl: './vacations-table.component.html',
  styleUrls: ['./vacations-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VacationsTableComponent  {

  @Input() calendar?: VacationCalendar;
  @Input() VacationCalendarDays?: VacationCalendarDay[];
  @Input() teams: VacationsTeam[] = [];
  @Input() vacationsTypes?: VacationsTypes[];

  public isShowModal$ = new BehaviorSubject(false);

  constructor() { }

  trackCalendarTeams(index: number, item: VacationsTeamCalendar): number {
    return item.id;
  }

  toggleModalShow(): void {
    this.isShowModal$.next(!this.isShowModal$.getValue());
  }

}
