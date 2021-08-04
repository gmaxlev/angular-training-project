import {AbstractControl, ValidationErrors} from '@angular/forms';

export class InputDateValidators {
  static correct(control: AbstractControl): ValidationErrors | null {
    const errorObject: ValidationErrors = {
      correct: true
    };
    try {
      if (!/^\d\d\d\d-\d\d-\d\d$/.test(control.value)) {
        return errorObject;
      }
      const year = Number(control.value.slice(0, 4));
      const month = Number(control.value.slice(5, 7));
      const day = Number(control.value.slice(8, 10));
      const resultDateObject = new Date(year, month, day);
      if (Object.prototype.toString.call(resultDateObject) === '[object Date]') {
        if (isNaN(resultDateObject.getTime())) {
          return errorObject;
        } else {
          return null;
        }
      } else {
        return errorObject;
      }
    } catch (e) {
      return errorObject;
    }
  }
  static period(control: AbstractControl): ValidationErrors | null {
    const errorObject = {
      period: true
    };
    try {
      const startDateControl = control?.get('startDate')?.value;
      const endDateControl = control?.get('endDate')?.value;
      if (!startDateControl || !endDateControl) {
        return errorObject;
      }
      const correctResultStartDate = InputDateValidators.correct(control?.get('startDate') as AbstractControl);
      const correctResultEndDate = InputDateValidators.correct(control?.get('endDate') as AbstractControl);
      if (correctResultStartDate !== null || correctResultEndDate !== null) {
        return {...correctResultStartDate, ...correctResultEndDate};
      }
      const startDateValue = startDateControl;
      const endDateValue = endDateControl;
      const startDateObject = new Date(Number(startDateValue.slice(0, 4)), Number(startDateValue.slice(5, 7)), Number(startDateValue.slice(8, 10)));
      const endDateObject = new Date(Number(endDateValue.slice(0, 4)), Number(endDateValue.slice(5, 7)), Number(endDateValue.slice(8, 10)));
      return endDateObject >= startDateObject ? null : { period: true };
    } catch (e) {
      return errorObject;
    }
  }
}
