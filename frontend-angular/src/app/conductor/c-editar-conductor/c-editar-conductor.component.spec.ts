import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CEditarConductorComponent } from './c-editar-conductor.component';

describe('CEditarConductorComponent', () => {
  let component: CEditarConductorComponent;
  let fixture: ComponentFixture<CEditarConductorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CEditarConductorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CEditarConductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
