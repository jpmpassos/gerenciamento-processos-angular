import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessoPageComponent } from './processo-page.component';

describe('ProcessoPageComponent', () => {
  let component: ProcessoPageComponent;
  let fixture: ComponentFixture<ProcessoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessoPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
