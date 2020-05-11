import { NgModule } from '@angular/core';
import { GanttComponent } from './gantt.component';
import { CommonModule } from '@angular/common';




@NgModule({
  imports: [CommonModule],
  declarations: [
    GanttComponent
  ],
  exports: [
    GanttComponent
  ]
})
export class GanttModule { }
