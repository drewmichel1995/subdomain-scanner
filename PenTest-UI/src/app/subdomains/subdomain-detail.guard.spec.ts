import { TestBed, async, inject } from '@angular/core/testing';

import { SubdomainDetailGuard } from './subdomain-detail.guard';

describe('SubdomainDetailGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubdomainDetailGuard]
    });
  });

  it('should ...', inject([SubdomainDetailGuard], (guard: SubdomainDetailGuard) => {
    expect(guard).toBeTruthy();
  }));
});
