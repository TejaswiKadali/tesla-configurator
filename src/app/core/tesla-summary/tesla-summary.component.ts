import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ConfigModel, DataModel, StandardColor } from '../../models/tesla.models';

@Component({
  selector: 'app-tesla-summary',
  standalone: true,
  imports: [HttpClientModule, CommonModule,FormsModule],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './tesla-summary.component.html',
  styleUrl: './tesla-summary.component.scss'
})

export class TeslaSummaryComponent {
  selectedModels: DataModel | undefined ;
  selectedConfig: ConfigModel | undefined
  selectedColor: string | undefined;
  rangePrice: number  = 0;
  hitchPrice: number  = 0;
  subscription: Subscription | undefined;
  configPrice: number  = 0;

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    const data = history.state;
    this.selectedModels = data?.model;
    this.selectedConfig = data?.config
    this.getModelDetails();
    this.getConfiguredata(); 
  }

  getModelDetails(): void {
    if(this.selectedModels && this.selectedModels.details && this.selectedModels.details.colors)
    this.selectedModels.details?.colors.forEach((element:StandardColor) =>{
      if(element.code === this.selectedModels?.color){
      this.selectedColor = element.description;
      this.rangePrice = element.price ? element.price : 0 ;
      }
    })
  }

  getConfiguredata(): void {
    if(this.selectedConfig?.towHitch || this.selectedConfig?.yoke)
    this.hitchPrice = 1000;
    if(this.selectedConfig?.configDetails && this.selectedConfig?.configDetails.price)
    this.configPrice = this.selectedConfig?.configDetails.price;
  }


}
