import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServidorDetail } from './servidor-detail';

describe('ServidorDetail', () => {
  let component: ServidorDetail;
  let fixture: ComponentFixture<ServidorDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServidorDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(ServidorDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
