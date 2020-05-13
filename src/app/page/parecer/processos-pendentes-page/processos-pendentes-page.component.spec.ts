import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessosPendentesPageComponent } from './processos-pendentes-page.component';

describe('ProcessosPendentesPageComponent', () => {
  let component: ProcessosPendentesPageComponent;
  let fixture: ComponentFixture<ProcessosPendentesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessosPendentesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessosPendentesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
