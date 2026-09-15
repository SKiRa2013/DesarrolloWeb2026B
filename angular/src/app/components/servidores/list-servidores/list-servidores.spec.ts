import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListServidores } from './list-servidores';

describe('ListServidores', () => {
  let component: ListServidores;
  let fixture: ComponentFixture<ListServidores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListServidores],
    }).compileComponents();

    fixture = TestBed.createComponent(ListServidores);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
