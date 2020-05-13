import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionarUsuarioModalComponent } from './selecionar-usuario-modal.component';

describe('SelecionarUsuarioModalComponent', () => {
  let component: SelecionarUsuarioModalComponent;
  let fixture: ComponentFixture<SelecionarUsuarioModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelecionarUsuarioModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecionarUsuarioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
