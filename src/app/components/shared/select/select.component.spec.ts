import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SelectComponent } from './select.component';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('HTML Content', () => {
    it('section should contain one option element for n elements in options', () => {
      component.options = ['a', 'b', 'c'];
      fixture.detectChanges();

      let selectDe = fixture.debugElement.query(By.css('select'));
      let selectEl = selectDe.nativeElement;

      expect(selectEl.children.length).toEqual(component.options.length);
      expect(selectEl.children[0].localName).toBe('option');
    });

    it('option element should have itself as text', () => {
      component.options = ['a', 'b', 'c'];
      fixture.detectChanges();

      let selectDe = fixture.debugElement.query(By.css('select'));
      let selectEl = selectDe.nativeElement;

      let optionExample = selectEl.children[0];

      expect(optionExample.innerText).toEqual(component.options[0]);
    });
  });

  it('option value should correspond to option', () => {
    component.options = ['a', 'b', 'c'];
    fixture.detectChanges();

    let selectDe = fixture.debugElement.query(By.css('select'));
    let selectEl = selectDe.nativeElement;

    let optionExample = selectEl.children[0];

    expect(optionExample.value).toEqual(component.options[0]);    
  });
});
