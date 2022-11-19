import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a footer element', () => {
    let footerDe = fixture.debugElement.query(By.css('footer'));
    let footerEl = footerDe.nativeElement;

    expect(footerEl).toBeDefined();
  });

  it('footer should contain two p elements', () => {
    let footerDe = fixture.debugElement.query(By.css('footer'));
    let footerEl = footerDe.nativeElement;

    let pDe = fixture.debugElement.queryAll(By.css('p'));
    let pOne = pDe[0].nativeElement;
    let pTwo = pDe[1].nativeElement;

    expect(footerEl.children.length).toBe(2);
    expect(footerEl.children[0]).toBe(pOne);
    expect(footerEl.children[1]).toBe(pTwo);

  });

  
});
