import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LabelComponent } from './label.component';

describe('LabelComponent', () => {
  let component: LabelComponent;
  let fixture: ComponentFixture<LabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('text property should be rendered in html', () => {
    let labelDe = fixture.debugElement.query(By.css('label'));
    let labelEl = labelDe.nativeElement;

    component.text = "prova";
    fixture.detectChanges();
    expect(labelEl.innerText).toEqual(component.text);
  });
});
