import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CEditarBusesComponent } from './c-editar-buses.component';

describe('CEditarBusesComponent', () => {
  let component: CEditarBusesComponent;
  let fixture: ComponentFixture<CEditarBusesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CEditarBusesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CEditarBusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
