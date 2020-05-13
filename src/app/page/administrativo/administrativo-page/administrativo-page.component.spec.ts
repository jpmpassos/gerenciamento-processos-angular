import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrativoPageComponent } from './administrativo-page.component';

describe('AdministrativoPageComponent', () => {
  let component: AdministrativoPageComponent;
  let fixture: ComponentFixture<AdministrativoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrativoPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrativoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
