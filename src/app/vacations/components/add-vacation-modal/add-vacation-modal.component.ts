import {ChangeDetectionStrategy, Component, DoCheck, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DateUtilsService} from '../../../shared/services/date-utils/date-utils.service';
import {InputDateValidators} from '../../../shared/validators/input-date-validators/InputDateValidators';
import {VacationsMember, VacationsTeam} from '../../shared/vacations.model';
import {BehaviorSubject} from 'rxjs';
import {ValidatorFn} from '@angular/forms';
import {AbstractControl} from '@angular/forms';
import {ValidationErrors} from '@angular/forms';
import {VacationsApiService} from '../../services/vacations-api/vacations-api.service';
import {VacationsTypes} from '../../shared/vacations.model';

@Component({
  selector: 'app-add-vacation-modal',
  templateUrl: './add-vacation-modal.component.html',
  styleUrls: ['./add-vacation-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddVacationModalComponent implements OnInit {

  @Input() teams: VacationsTeam[] = [];
  @Input() vacationsTypes?: VacationsTypes;

  objectKeys = Object.keys;

  showErrors = false;
  successAdded = false;

  selectedTeam$ = new BehaviorSubject<VacationsTeam | null>(null);

  errorsMessages = {
    startDate: 'Choose the start date',
    endDate: 'Choose the start date',
    period: `Start date can't be more than end date`,
    member: `Choose member`,
    type: `Choose type of vacation`,
  };

  addVacationForm = new FormGroup({
    startDate: new FormControl('', {
      validators: [Validators.required, InputDateValidators.correct],
      updateOn: 'change'
    }),
    endDate: new FormControl('', [Validators.required, InputDateValidators.correct]),
    team: new FormControl(null, Validators.required),
    member: new FormControl(null, Validators.required),
    type: new FormControl(null, Validators.required),
  }, {
    validators: (control) => {
      return this.customValid(control);
    },
    updateOn: 'change'
  });
  constructor(private dateUtilsService: DateUtilsService, private readonly vacationsApiService: VacationsApiService) { }

  ngOnInit(): void {
    this.addVacationForm.statusChanges.subscribe(() => {
      this.showErrors = false;
      this.successAdded = false
    });
    this.addVacationForm.get('team')?.valueChanges.subscribe(value => {
      this.addVacationForm.get('member')?.setValue(null);
      const selectedTeam = this.teams.filter(team => team.id === value);
      if (selectedTeam.length) {
        this.selectedTeam$.next(selectedTeam[0]);
      }
    });
  }

  customValid(control: AbstractControl): ValidationErrors | null {


    let errors = {};

    const startDate = InputDateValidators.correct(control?.get('startDate') as AbstractControl);
    const endDate = InputDateValidators.correct(control?.get('endDate') as AbstractControl);

    if (startDate) {
      errors = {...errors, startDate};
    }

    if (endDate) {
      errors = {...errors, endDate};
    }

    if (startDate === null && endDate === null) {
      const period =  InputDateValidators.period(control);
      if (period !== null) {
        errors = {...errors, period};
      }
    }

    const member = Validators.required(control.get('member') as AbstractControl);
    const type = Validators.required(control.get('type') as AbstractControl);


    if (member) {
      errors = {...errors, member};
    }

    if (type) {
      errors = {...errors, type};
    }

    if (Object.values(errors).length) {
      return errors;
    } else {
      return null;
    }

  }

  send(): void {
    this.showErrors = true;
    if (this.addVacationForm.errors === null) {
      this.vacationsApiService.addVacations(this.addVacationForm.get('member').value, new Date(Date.parse(this.addVacationForm.get('startDate').value)), new Date(this.addVacationForm.get('endDate').value), this.addVacationForm.get('type').value).subscribe(() => {
        this.successAdded = true
      });
    }
  }

}
