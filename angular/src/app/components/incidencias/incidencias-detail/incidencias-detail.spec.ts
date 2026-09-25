import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IncidenciasDetail } from './incidencias-detail';

describe('IncidenciasDetail', () => {
  let component: IncidenciasDetail;
  let fixture: ComponentFixture<IncidenciasDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidenciasDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(IncidenciasDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
