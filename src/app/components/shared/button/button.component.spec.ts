import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('text property should be rendered in html', () => {
    let buttonDe = fixture.debugElement.query(By.css('button'));
    let buttonEl = buttonDe.nativeElement;
    
    component.text = "prova";
    fixture.detectChanges();
    expect(buttonEl.innerText).toEqual(component.text);
    
  });

});
