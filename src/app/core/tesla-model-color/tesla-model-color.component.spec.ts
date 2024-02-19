import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeslaModelColorComponent } from './tesla-model-color.component';

describe('TeslaModelColorComponent', () => {
  let component: TeslaModelColorComponent;
  let fixture: ComponentFixture<TeslaModelColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeslaModelColorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeslaModelColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
