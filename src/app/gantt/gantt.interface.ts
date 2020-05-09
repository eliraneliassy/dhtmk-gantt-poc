export interface GanttData {
    data: GanttRow[];
}

export interface GanttRow {
    id: number;
    text: string;
    start_date: Date | string;
    end_date?: Date | string;
    duration?: number;
    progress?: number;
    open?: boolean;
    parent?: number;
}
