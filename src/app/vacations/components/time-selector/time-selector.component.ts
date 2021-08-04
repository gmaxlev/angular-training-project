import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-time-selector',
  templateUrl: './time-selector.component.html',
  styleUrls: ['./time-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeSelectorComponent  {

  @Input() date?: Date;
  @Output() next = new EventEmitter();
  @Output() prev = new EventEmitter();

}
