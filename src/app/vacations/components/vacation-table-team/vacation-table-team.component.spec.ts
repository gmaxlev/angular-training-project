import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationTableTeamComponent } from './vacation-table-team.component';

describe('VacationTableTeamComponent', () => {
  let component: VacationTableTeamComponent;
  let fixture: ComponentFixture<VacationTableTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacationTableTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacationTableTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
