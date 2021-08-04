import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject, from} from 'rxjs';
import {map, delay} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {APIVacations, APIVacationsTeam} from '../../shared/vacations-api.model';
import {VacationsMember, VacationsTeam, VacationsTypes} from '../../shared/vacations.model';
import { vacations, vacationsTypes } from '../../../mocks/vacations.mock';

@Injectable({
  providedIn: 'root'
})
export class VacationsApiService {

  public teams$ = new BehaviorSubject<VacationsTeam[] | null>(null);

  constructor(private httpClient: HttpClient) {}

  static transformAPIStringDateToObject(stringDate: string): Date {
    return new Date(stringDate.split('.').reverse().join('/'));
  }


  static adapterVacationTeams(teams: APIVacationsTeam[]): VacationsTeam[] {
    return teams.map(team => {
      return {
        ...team,
        members: team.members.map(member => {
          return {
            ...member,
            vacations: member.vacations.map(Vacation => {
              return {
                ...Vacation,
                startDate: VacationsApiService.transformAPIStringDateToObject(Vacation.startDate),
                endDate: VacationsApiService.transformAPIStringDateToObject(Vacation.endDate),
              };
            })
          };
        })
      };
    });
  }

  getVacationsTeams(): BehaviorSubject<VacationsTeam[] | null> {
    if (this.teams$.getValue() === null) {
      from([vacations]).pipe(
        delay(400),
        map(value => {
          return VacationsApiService.adapterVacationTeams(value.teams);
        })
      ).subscribe(value => {
        this.teams$.next(value);
      });
    }
    return this.teams$;
  }

  getVacationsTypes(): Observable<VacationsTypes> {
    return from([vacationsTypes]);
  }

  addVacations(memberId: number, startDate: Date, endDate: Date, typeVacations: string): Observable<void> {
    return new Observable(observer => {
      try {
        const current = this.teams$.getValue();
        let member: VacationsMember;
        current.forEach(team => {
          const found = team.members.find(teamMember => teamMember.id === memberId);
          if (found) {
            member = found;
          }
        });
        member.vacations.push({startDate, endDate, type: typeVacations});
        this.teams$.next(current);
        observer.next();
        observer.complete();
      } catch (e) {
        observer.error('Vacations has not added');
      }
    })
  }

}
