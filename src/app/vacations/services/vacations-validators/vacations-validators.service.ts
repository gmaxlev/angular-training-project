import { Injectable } from '@angular/core';
import {VacationsTeam} from '../../shared/vacations.model';
import {ValidatorFn} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class VacationsValidatorsService {

  static newPeriodAvailability(startDateField: string, endDateField: string, teams: VacationsTeam[]): ValidatorFn {
    return (control => {
      if (control.get(startDateField)?.value ) {
        return null;
      }
      return null;
    });
  }

  constructor() { }
}
