import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttComponent } from './gantt.component';
import { GANTT_DATA_MOCK } from './gantt.mock';
import { By } from '@angular/platform-browser';
import { gantt } from 'dhtmlx-gantt';

fdescribe('GanttComponent', () => {
  let component: GanttComponent;
  let fixture: ComponentFixture<GanttComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GanttComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GanttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render gantt after viewinit', () => {
    component.data = GANTT_DATA_MOCK;
    component.ngAfterViewInit();
    fixture.detectChanges();

    const ganttEl = fixture.debugElement.query(By.css('.gantt_layout_cell'));

    expect(ganttEl).not.toBeNull();

  });

  xit('should attach event onAfterTaskDrag to gantt after viewinit', () => {
    component.data = GANTT_DATA_MOCK;
    component.ngAfterViewInit();
    fixture.detectChanges();

    spyOnProperty(gantt, 'attachEvent', 'get').and.returnValue('');

    expect(gantt.attachEvent).toHaveBeenCalledTimes(1);

  });


});
