import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WithLoadingPipe} from './pipes/with-loading/with-loading.pipe';
import {DateUtilsService} from './services/date-utils/date-utils.service';
import {ButtonComponent} from './components/button/button.component';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';

@NgModule({
  declarations: [WithLoadingPipe, ButtonComponent, ModalWindowComponent, ClickOutsideDirective],
  exports: [
    WithLoadingPipe,
    ButtonComponent,
    ModalWindowComponent,
    ClickOutsideDirective
  ],
  providers: [DateUtilsService],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
