import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TriagemProcessosPageComponent } from './triagem-processos-page.component';

describe('TriagemProcessosPageComponent', () => {
  let component: TriagemProcessosPageComponent;
  let fixture: ComponentFixture<TriagemProcessosPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TriagemProcessosPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriagemProcessosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
