import { gantt } from 'dhtmlx-gantt';

// Setting available scales
export const scaleConfigs = [
    {
        scales: [
            {
                subscale_unit: 'year', unit: 'year', step: 10, template: (date) => {
                    const dateToStr = gantt.date.date_to_str('%Y');
                    const endDate = gantt.date.add(gantt.date.add(date, 10, 'year'), -1, 'day');
                    return dateToStr(date) + ' - ' + dateToStr(endDate);
                }
            },
            {
                unit: 'year', step: 100, template: (date) => {
                    const dateToStr = gantt.date.date_to_str('%Y');
                    const endDate = gantt.date.add(gantt.date.add(date, 100, 'year'), -1, 'day');
                    return dateToStr(date) + ' - ' + dateToStr(endDate);
                }
            }
        ]
    },
    // years
    {
        scales: [
            { subscale_unit: 'year', unit: 'year', step: 1, date: '%Y' },
            {
                unit: 'year', step: 5, template: (date) => {
                    const dateToStr = gantt.date.date_to_str('%Y');
                    const endDate = gantt.date.add(gantt.date.add(date, 5, 'year'), -1, 'day');
                    return dateToStr(date) + ' - ' + dateToStr(endDate);
                }
            }
        ]
    },
    // quarters
    {
        scales: [
            { subscale_unit: 'month', unit: 'year', step: 3, format: '%Y' },
            {
                unit: 'month', step: 3, template: (date) => {
                    const dateToStr = gantt.date.date_to_str('%M');
                    const endDate = gantt.date.add(gantt.date.add(date, 3, 'month'), -1, 'day');
                    return dateToStr(date) + ' - ' + dateToStr(endDate);
                }
            }
        ]
    },
    // months
    {
        scales: [
            { subscale_unit: 'month', unit: 'year', step: 1, format: '%Y' },
            { unit: 'month', step: 1, format: '%M' }
        ]
    },
    // weeks
    {
        scales: [
            { subscale_unit: 'week', unit: 'month', step: 1, date: '%F' },
            {
                unit: 'week', step: 1, template: (date) => {
                    const dateToStr = gantt.date.date_to_str('%d %M');
                    const endDate = gantt.date.add(gantt.date.add(date, 1, 'week'), -1, 'day');
                    return dateToStr(date) + ' - ' + dateToStr(endDate);
                }
            }
        ]
    },
    // days
    {
        scales: [
            { subscale_unit: 'day', unit: 'month', step: 1, format: '%F' },
            { unit: 'day', step: 1, format: '%j' }
        ]
    },
    // hours
    {
        scales: [
            { subscale_unit: 'hour', unit: 'day', step: 1, format: '%j %M' },
            { unit: 'hour', step: 1, format: '%H:%i' }

        ]
    },
    // minutes
    {
        scales: [
            { subscale_unit: 'minute', unit: 'hour', step: 1, format: '%H' },
            { unit: 'minute', step: 1, format: '%H:%i' }
        ]
    }
];
