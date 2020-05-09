import { Component } from '@angular/core';
import { GanttData } from './gantt/gantt.interface';
import { GANTT_DATA_MOCK } from './gantt/gantt.mock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  ganttData: GanttData = GANTT_DATA_MOCK;

  ganttdataUpdated(event) {
    console.log(event);
  }
}
