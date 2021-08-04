import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateUtilsService {

  getDateFromInputDate(validInputValue: string): Date {
    const year = Number(validInputValue.slice(0, 4));
    const month = Number(validInputValue.slice(5, 7)) - 1;
    const day = Number(validInputValue.slice(8, 10));
    return  new Date(year, month, day);
  }

  public getNumberDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  public getAllDaysFromMonth(year: number, month: number): Date[] {
    const numberDays = this.getNumberDaysInMonth(year, month);
    return Array.from(new Array(numberDays)).map((item, index) => new Date(year, month, ++index));
  }

  public checkDateIncludeInPeriod(date: Date, startDate: Date, endDate: Date, time: 'day' | 'month' | 'year' = 'day' ): boolean {
    if (time === 'day') {
      return date >= startDate && date <= endDate;
    }
    let startDateInside = new Date();
    let endDateInside = new Date();
    if (time === 'month') {
      startDateInside = new Date(date.getFullYear(), date.getMonth(), 1);
      endDateInside = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    }
    if (time === 'year') {
      startDateInside = new Date(date.getFullYear(), 0, 1);
      endDateInside = new Date(date.getFullYear() + 1, 0, 0);
    }
    return (
      (startDate <= startDateInside && endDate >= endDateInside) ||
      (startDate >= startDateInside && endDate <= endDateInside) ||
      (startDate >= startDateInside && startDate <= endDateInside) ||
      (startDate <= startDateInside && endDate >= startDateInside)
    );
  }

  public getDatesFromPeriod(startDate: Date, endDate: Date): Date[] {
    if (endDate < startDate) {
      throw new Error('Start date cannot be more than end date');
    }
    const dates: Date[] = [new Date(startDate)];
    while (dates[dates.length - 1] < endDate) {
      const lastDate = dates[dates.length - 1];
      const newDate = new Date(lastDate);
      newDate.setDate(lastDate.getDate() + 1);
      dates.push(newDate);
    }
    return dates;
  }

  public isWeekendDate(date: Date): boolean {
    return date.getDay() === 6 || date.getDay() === 0;
  }

}
