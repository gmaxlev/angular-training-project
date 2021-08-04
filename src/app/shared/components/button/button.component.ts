import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Input} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() type: 'default' = 'default';
  @Input() size: 'middle' = 'middle';

  constructor() { }

  ngOnInit(): void {
  }

}
