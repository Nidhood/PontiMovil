import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CGestionConductoresComponent } from './c-gestion-conductores.component';

describe('CGestionConductoresComponent', () => {
  let component: CGestionConductoresComponent;
  let fixture: ComponentFixture<CGestionConductoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CGestionConductoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CGestionConductoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
