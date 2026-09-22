import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServidorForm } from './servidor-form';

describe('ServidorForm', () => {
  let component: ServidorForm;
  let fixture: ComponentFixture<ServidorForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServidorForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ServidorForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
