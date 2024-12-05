import { TestBed } from '@angular/core/testing';

import { CRUDAnimalsService } from './crud-animals.service';

describe('CRUDAnimalsService', () => {
  let service: CRUDAnimalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CRUDAnimalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
