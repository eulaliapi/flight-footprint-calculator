import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  let focusEventDummy: FocusEvent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emitInput should be called when event focus is triggered', () => {
    spyOn(component.emitInput, 'emit');
    let inputDe = fixture.debugElement.query(By.css('input'));
    inputDe.triggerEventHandler('focus', focusEventDummy);
    fixture.detectChanges();
    
    expect(component.emitInput.emit).toHaveBeenCalledWith(focusEventDummy);

  });
});
