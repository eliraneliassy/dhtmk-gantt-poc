
import { storiesOf } from '@storybook/angular';
import {
    withKnobs,
} from '@storybook/addon-knobs/angular';
import { GanttModule } from './gantt.module';
import { GANTT_DATA_MOCK } from './gantt.mock';
import { GanttComponent } from './gantt.component';

const story = storiesOf('Gannt Charts', module).addDecorator(
    withKnobs
);

const template = `
<app-gantt
    [data]="ganttData"
    (dataUpdated)="ganttdataUpdated($event)">
</app-gantt>
`;

const note = `
  ## Gantt Chart Element
  #### Module
  *GanttChartModule*

  ~~~
  ${template}
  ~~~
  
  ####Properties
  
  Name | Type | Description | Default
  --- | --- | --- | ---
  [data] | GanttData | Gantt Data | []
  (dataUpdated) | GanttRow | Gantt Event Updated | N/A
`;


const storyTemplate = `${template}`;

story.add(
    'Gantt',
    () => ({
        component: GanttComponent,
        props: {
            data: GANTT_DATA_MOCK
        },
        moduleMetadata: {
            imports: [GanttModule],
        },
    }),
    { notes: { markdown: note } }
);


