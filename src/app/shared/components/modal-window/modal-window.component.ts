import {Component, Input, OnInit, Output, EventEmitter, HostBinding} from '@angular/core';
import {trigger, transition, style, animate, state, query, animateChild} from '@angular/animations';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss'],
  animations: [
    trigger('onShowShadow', [
      transition(':enter', [
        style({
          opacity: 0,
        }),
        animate('200ms', style({
          opacity: 1,
        })),
      ]),
      transition(':leave', [
        style({
          opacity: 1,
        }),
        animate('200ms 0.2s', style({
          opacity: 0,
        }))
      ])
    ]),
    trigger('onShowWindow', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(15px)'
        }),
        animate('200ms 0.2s', style({
          opacity: 1,
          transform: 'translateY(0px)'
        })),
      ]),
      transition(':leave', [
        style({
          opacity: 1,
          transform: 'translateY(0px)'
        }),
        animate('200ms', style({
          opacity: 0,
          transform: 'translateY(15px)'
        }))
      ])
    ]),
    trigger('onCloseModal', [
      transition('* => void', [
        query('@*', [animateChild()], {optional: true})
      ]),
    ])
  ]
})
export class ModalWindowComponent implements OnInit {

  @Input() show = false;
  @Output() closeModal = new EventEmitter();

  public ready = false;

  clickOutside(): void {
    if (this.show) {
      this.closeModal.emit();
    }
  }

  animationComplete(): void {
    this.ready = !this.ready;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
