import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TopBarComponent } from './top-bar.component';

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have header.bg-heading', () => {
    let headerDe = fixture.debugElement.query(By.css('header'));
    let headerEl = headerDe.nativeElement;

    expect(headerEl).toBeDefined();
    expect(headerEl.children.length).toBe(1);
  });

  it('header.bg-heading should contain h1.heading', () => {
    let headerDe = fixture.debugElement.query(By.css('header'));
    let headerEl = headerDe.nativeElement;

    let h1De = fixture.debugElement.query(By.css('h1'));
    let h1El = h1De.nativeElement;

    expect(h1El).toBeDefined();
    expect(headerEl.children[0]).toBe(h1El);

    expect(h1El.innerText).toBe("Flight Footprint Calculator");

  });

});
