import { NgModule } from '@angular/core';
import { GanttComponent } from './gantt.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';




@NgModule({
  imports: [CommonModule, TranslateModule.forChild()],
  declarations: [
    GanttComponent
  ],
  exports: [
    GanttComponent
  ]
})
export class GanttModule { }
