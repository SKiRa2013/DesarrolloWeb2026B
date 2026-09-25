import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IncidenciasDelete } from './incidencias-delete';

describe('IncidenciasDelete', () => {
  let component: IncidenciasDelete;
  let fixture: ComponentFixture<IncidenciasDelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidenciasDelete],
    }).compileComponents();

    fixture = TestBed.createComponent(IncidenciasDelete);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
