import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { InvalidInputComponent } from './invalid-input.component';

describe('InvalidInputComponent', () => {
  let component: InvalidInputComponent;
  let fixture: ComponentFixture<InvalidInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvalidInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('text property should be rendered in html', () => {
    let pDe = fixture.debugElement.query(By.css('p'));
    let pEl = pDe.nativeElement;

    component.text = "prova";
    fixture.detectChanges();
    expect(pEl.innerText).toEqual(component.text);
  });
});
