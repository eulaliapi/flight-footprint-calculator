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

  it('should have a footer which should contain div.footer-container', () => {
    let footerDe = fixture.debugElement.query(By.css('footer'));
    let footerEl = footerDe.nativeElement;
    expect(footerEl).toBeDefined;
    expect(footerEl.children.length).toBe(1);
    expect(footerEl.children[0]).toHaveClass('footer-container');
  });

  it('div.footer-container should contain two div.footer-item', () => {
    let footerContainerDe = fixture.debugElement.query(By.css('div .footer-container'));
    let footerContainerEl = footerContainerDe.nativeElement;
    expect(footerContainerEl).toBeDefined();
    expect(footerContainerEl.children.length).toBe(2);
    expect(footerContainerEl.children[0]).toHaveClass('footer-item');
    expect(footerContainerEl.children[1]).toHaveClass('footer-item');
  });

  it('the first div.footer-item should contain p.text-center which should contain 2 a.link', () => {
    let footerItemDe = fixture.debugElement.queryAll(By.css('div .footer-item'));
    let footerItemOneEl = footerItemDe[0].nativeElement;

    expect(footerItemOneEl.children.length).toBe(1);
    expect(footerItemOneEl.children[0]).toHaveClass('text-center');

    let textCenterP = footerItemOneEl.children[0];
    expect(textCenterP.children.length).toBe(2);
    expect(textCenterP.innerText).toBe("Created by Eulalia Pirone")
    expect(textCenterP.children[0]).toHaveClass('link');
    expect(textCenterP.children[1]).toHaveClass('link');

    let firstA = textCenterP.children[0];
    let secondA = textCenterP.children[1];
    expect(firstA.attributes.href.nodeValue).toBe("https://eulaliapi.github.io/");
    expect(secondA.attributes.href.nodeValue).toBe("https://github.com/eulaliapi");

  });

  it('the second div.footer-item should contain p.text-center which should contain one a.link', () => {
    let footerItemDe = fixture.debugElement.queryAll(By.css('div .footer-item'));
    let footerItemTwoEl = footerItemDe[1].nativeElement;

    expect(footerItemTwoEl.children.length).toBe(1);
    expect(footerItemTwoEl.children[0]).toHaveClass('text-center');

    let textCenterP = footerItemTwoEl.children[0];
    expect(textCenterP.children.length).toBe(2);
    expect(textCenterP.children[0].localName).toBe("br");
    expect(textCenterP.children[1]).toHaveClass('link');
    expect(textCenterP.innerText).toBe("For more information about climate change,\nvisit goclimate.com")
    expect(textCenterP.children[1].attributes.href.nodeValue).toBe("https://www.goclimate.com/");


  });
});
