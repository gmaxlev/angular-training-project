import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeSelectorComponent } from './components/time-selector/time-selector.component';
import { VacationsComponent } from './vacations.component';
import {SharedModule} from '../shared/shared.module';
import { VacationsTableComponent } from './components/vacations-table/vacations-table.component';
import { VacationTableTeamComponent } from './components/vacation-table-team/vacation-table-team.component';
import { AddVacationModalComponent } from './components/add-vacation-modal/add-vacation-modal.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    TimeSelectorComponent,
    VacationsComponent,
    VacationsTableComponent,
    VacationTableTeamComponent,
    AddVacationModalComponent,
  ],
  exports: [
    VacationsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule

  ],
  providers: []
})
export class VacationsModule { }

