import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeslaSummaryComponent } from './tesla-summary.component';

describe('TeslaSummaryComponent', () => {
  let component: TeslaSummaryComponent;
  let fixture: ComponentFixture<TeslaSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeslaSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeslaSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
