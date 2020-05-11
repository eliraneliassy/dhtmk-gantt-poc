import { gantt } from 'dhtmlx-gantt';

// get number of columns in timeline
export function getUnitsBetween(from, to, unit, step) {
    let start = new Date(from);
    const end = new Date(to);
    let units = 0;

    while (start.valueOf() < end.valueOf()) {
        units++;
        start = gantt.date.add(start, step, unit);
    }
    return units;
}