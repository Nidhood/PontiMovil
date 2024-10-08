import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CCrearConductorComponent } from './c-crear-conductor.component';

describe('CCrearConductorComponent', () => {
  let component: CCrearConductorComponent;
  let fixture: ComponentFixture<CCrearConductorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CCrearConductorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CCrearConductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
