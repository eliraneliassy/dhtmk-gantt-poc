import { Component, ChangeDetectionStrategy } from '@angular/core';
import { GanttData } from './gantt/gantt.interface';
import { GANTT_DATA_MOCK } from './gantt/gantt.mock';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class AppComponent {
  ganttData: Observable<GanttData> = null;

  ganttdataUpdated(event) {
    console.log(event);
  }

  constructor() {
    this.ganttData = of(GANTT_DATA_MOCK);
  }

  addTask() {
    const row = { id: 4, text: 'Task #3', start_date: '02-04-2018', duration: 18, open: true, parent: 1 };
    const newData = { data: [] };

    this.ganttData = of(newData);
  }


}
