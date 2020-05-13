import {
  Component, Input, Output, EventEmitter, AfterViewInit,
  ElementRef, ViewChild, ChangeDetectionStrategy, OnChanges, SimpleChanges, Inject
} from '@angular/core';
import { GanttData, GanttRow, GanttScaleEvent } from './gantt.interface';
import 'dhtmlx-gantt';
import { gantt } from 'dhtmlx-gantt';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs/operators';
import { scaleConfigs } from './gantt-scale.config';
import { getUnitsBetween } from './gant.utils';

const hourToStr = gantt.date.date_to_str('%H:%i');
const hourRangeFormat = (step) => {
  return (date) => {
    const ganttDate = gantt.date.add(date, step, 'hour') as any;
    const intervalEnd = new Date(ganttDate - 1);
    return hourToStr(date) + ' - ' + hourToStr(intervalEnd);
  };
};


@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.scss', './dhtmlgantx-material.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GanttComponent implements AfterViewInit, OnChanges {

  @Input() data: GanttData;

  @Output() dataUpdated: EventEmitter<GanttRow> = new EventEmitter<GanttRow>();
  @Output() ganttScaleChanged: EventEmitter<GanttScaleEvent> =
    new EventEmitter<GanttScaleEvent>();


  @ViewChild('gantt', { static: true }) ganttContainer: ElementRef;

  cachedSettings: any;
  zoom: boolean;

  constructor(
    private translateService: TranslateService
  ) { }

  ngAfterViewInit(): void {

    this.translateService.getTranslation(this.translateService.currentLang)
      .pipe(take(1))
      .subscribe((translations: { [key: string]: string }) => {


        this.initGant(translations);
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

        this.emitGanttScale();

        gantt.attachEvent('onGanttRender', () => {
          this.emitGanttScale();
        }, null);
      });

  }

  private emitGanttScale() {
    const ganttState = gantt.getState();
    this.ganttScaleChanged.emit(
      {
        minDate: ganttState.min_date,
        maxDate: ganttState.max_date
      }
    );
  }

  private initGant(translations: { [key: string]: string }) {
    gantt.config.min_column_width = 80;
    gantt.init(this.ganttContainer.nativeElement);

    gantt.config.columns = [
      { name: 'text', label: translations.TASK_NAME, width: '*', tree: true },
      { name: 'start_date', label: translations.START_DATE, align: 'center' },
      { name: 'duration', label: translations.DURATION, align: 'center' },

    ];

    if (this.data) {
      gantt.parse(this.data);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    gantt.refreshData();
  }


  toggleZoomMode() {
    this.zoom = !this.zoom;
    if (this.zoom) {
      this.saveConfig();
      this.zoomToFit();
    } else {
      this.restoreConfig();
      gantt.render();
    }
  }

  private zoomToFit() {
    const project = gantt.getSubtaskDates();
    const areaWidth = (gantt as any).$task.offsetWidth;
    let i;

    for (i = 0; i < scaleConfigs.length; i++) {
      const columnCount = getUnitsBetween(project.start_date,
        project.end_date,
        scaleConfigs[i].scales[0].subscale_unit,
        scaleConfigs[i].scales[0].step);

      if ((columnCount + 2) * gantt.config.min_column_width >= areaWidth) {
        --i;
        break;
      }
    }


    if (i === scaleConfigs.length) {
      i--;
    }

    this.applyConfig(scaleConfigs[i], project);
    gantt.render();
  }

  private applyConfig(config, dates) {

    gantt.config.scales = config.scales;

    if (dates && dates.start_date && dates.end_date) {
      gantt.config.start_date = gantt.date.add(dates.start_date, -1, config.scales[0].subscale_unit);
      gantt.config.end_date =
        gantt.date.add(gantt.date[config.scales[0].subscale_unit + '_start'](dates.end_date), 2, config.scales[0].subscale_unit);
    } else {
      gantt.config.start_date = gantt.config.end_date = null;
    }
  }


  private saveConfig() {
    const config = gantt.config;
    this.cachedSettings = {};
    this.cachedSettings.scales = config.scales;
    this.cachedSettings.start_date = config.start_date;
    this.cachedSettings.end_date = config.end_date;
  }

  private restoreConfig() {
    this.applyConfig(this.cachedSettings, null);
  }



}
