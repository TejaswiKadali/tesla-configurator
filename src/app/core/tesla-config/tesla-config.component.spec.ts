import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeslaConfigComponent } from './tesla-config.component';

describe('TeslaConfigComponent', () => {
  let component: TeslaConfigComponent;
  let fixture: ComponentFixture<TeslaConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeslaConfigComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeslaConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
