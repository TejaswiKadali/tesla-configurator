import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StandardColor } from '../../models/tesla.models';

@Component({
  selector: 'app-tesla-summary',
  standalone: true,
  imports: [HttpClientModule, CommonModule,FormsModule],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './tesla-summary.component.html',
  styleUrl: './tesla-summary.component.scss'
})

export class TeslaSummaryComponent {
  selectedDetails: any | undefined;
  selectedColor: string | undefined;
  rangePrice: number | undefined;
  hitchPrice: number  = 0;
  subscription: Subscription | undefined;

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    const data = history.state;
    this.selectedDetails = data;
    if(this.selectedDetails)
    this.selectedDetails?.model?.details?.colors.forEach((element:StandardColor) =>{
      if(element.code === data?.model.color)
      this.selectedColor = element.description;
      this.rangePrice = element?.price;
      if(this.selectedDetails?.config?.towHitch || this.selectedDetails?.config?.yoke)
      this.hitchPrice = 1000;
    })
   
  }


}
