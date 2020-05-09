import { GanttData } from './gantt.interface';

export const GANTT_DATA_MOCK: GanttData = {
    data: [
        { id: 1, text: 'Project #2', start_date: '01-04-2018', duration: 18, open: true },
        { id: 2, text: 'Task #1', start_date: '02-04-2018', duration: 8, parent: 1 },
        { id: 3, text: 'Task #2', start_date: '11-04-2018', duration: 8, parent: 1 }
    ],
};
