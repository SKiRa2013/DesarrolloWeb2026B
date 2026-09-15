import { TestBed } from '@angular/core/testing';
import { Servidores } from './servidores';

describe('Servidores', () => {
  let service: Servidores;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Servidores);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
