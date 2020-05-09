import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { GanttData, GanttRow } from './gantt.interface';
import 'dhtmlx-gantt';
import { gantt } from 'dhtmlx-gantt';

@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.scss']
})
export class GanttComponent implements AfterViewInit {

  @Input() data: GanttData;

  @Output() dataUpdated: EventEmitter<GanttRow> = new EventEmitter<GanttRow>();

  @ViewChild('gantt') ganttContainer: ElementRef;

  ngAfterViewInit(): void {
    gantt.init(this.ganttContainer.nativeElement);

    if (this.data) {
      gantt.parse(this.data);
    }

    gantt.attachEvent('onAfterTaskDrag', (id, mode) => {
      const task = gantt.getTask(id);

      const row: GanttRow = {
        id: task.id,
        text: task.text,
        start_date: task.start_date,
        end_date: task.end_date,
        open: task.open,
        parent: task.parent
      };
      console.log(row);

      this.dataUpdated.emit(row);

    }, null);

  }

}
