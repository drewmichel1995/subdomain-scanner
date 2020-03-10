import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdomainDetailComponent } from './subdomain-detail.component';

describe('SubdomainDetailComponent', () => {
  let component: SubdomainDetailComponent;
  let fixture: ComponentFixture<SubdomainDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubdomainDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubdomainDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
