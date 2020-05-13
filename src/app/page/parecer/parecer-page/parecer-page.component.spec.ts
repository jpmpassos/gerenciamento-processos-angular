import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParecerPageComponent } from './parecer-page.component';

describe('ParecerPageComponent', () => {
  let component: ParecerPageComponent;
  let fixture: ComponentFixture<ParecerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParecerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParecerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
