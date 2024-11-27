import { TestBed } from '@angular/core/testing';

import { FirebaseAutenticationService } from './firebase-autentication.service';

describe('FirebaseAutenticationService', () => {
  let service: FirebaseAutenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseAutenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
