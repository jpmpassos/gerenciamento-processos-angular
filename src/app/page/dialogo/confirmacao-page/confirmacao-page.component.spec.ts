import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacaoPageComponent } from './confirmacao-page.component';

describe('ConfirmacaoPageComponent', () => {
  let component: ConfirmacaoPageComponent;
  let fixture: ComponentFixture<ConfirmacaoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmacaoPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacaoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
