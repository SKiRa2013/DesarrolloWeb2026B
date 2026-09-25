import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IncidenciasForm } from './incidencias-form';

describe('IncidenciasForm', () => {
  let component: IncidenciasForm;
  let fixture: ComponentFixture<IncidenciasForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidenciasForm],
    }).compileComponents();

    fixture = TestBed.createComponent(IncidenciasForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
