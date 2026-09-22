import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServidorDelete } from './servidor-delete';

describe('ServidorDelete', () => {
  let component: ServidorDelete;
  let fixture: ComponentFixture<ServidorDelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServidorDelete],
    }).compileComponents();

    fixture = TestBed.createComponent(ServidorDelete);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
