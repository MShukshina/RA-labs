import { TestBed } from '@angular/core/testing';

import { OkService } from './ok.service';

describe('OkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OkService = TestBed.get(OkService);
    expect(service).toBeTruthy();
  });
});
