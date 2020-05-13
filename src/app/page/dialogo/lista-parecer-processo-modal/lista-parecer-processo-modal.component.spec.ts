import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaParecerProcessoModalComponent } from './lista-parecer-processo-modal.component';

describe('ListaParecerProcessoModalComponent', () => {
  let component: ListaParecerProcessoModalComponent;
  let fixture: ComponentFixture<ListaParecerProcessoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaParecerProcessoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaParecerProcessoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
