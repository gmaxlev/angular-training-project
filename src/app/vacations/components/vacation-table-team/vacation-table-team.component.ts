import {Component, Input, OnInit} from '@angular/core';
import {ColorThemesTypesToCSSClass, VacationsTeamCalendar, VacationCalendarDay, VacationsMemberCalendar} from '../../shared/vacations.model';
import {ChangeDetectionStrategy} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: '[app-vacation-table-team]',
  templateUrl: './vacation-table-team.component.html',
  styleUrls: ['./vacation-table-team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VacationTableTeamComponent implements OnInit {

  @Input() team?: VacationsTeamCalendar;
  @Input() dates?: VacationCalendarDay[];

  public readonly isShow$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  public readonly COLOR_THEME_TYPES: ColorThemesTypesToCSSClass = {
    1: 'Vacations-table-color-theme-1',
    2: 'Vacations-table-color-theme-2',
    3: 'Vacations-table-color-theme-3',
    4: 'Vacations-table-color-theme-4',
  };

  trackCalendarMember(index: number, item: VacationsMemberCalendar): number {
    return item.id;
  }

  toggleShow(): void {
    this.isShow$.next(!this.isShow$.getValue());
  }

  ngOnInit(): void {
  }

}
