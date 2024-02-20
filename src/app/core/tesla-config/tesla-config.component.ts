import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NO_ERRORS_SCHEMA, inject } from '@angular/core';
import { TeslaConfigService } from '../../shared/services/tesla-config.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ConfigDetails, ConfigOptions } from '../../models/tesla.models';
import { ConfigState } from '../../shared/store-data/store.reducers';
import { setModelData } from '../../shared/store-data/store.actions';

@Component({
  selector: 'app-tesla-config',
  standalone: true,
  imports: [HttpClientModule, CommonModule,FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [NO_ERRORS_SCHEMA],
  providers:[{ provide: TeslaConfigService,useClass:TeslaConfigService }],
  templateUrl: './tesla-config.component.html',
  styleUrl: './tesla-config.component.scss'
})

export class TeslaConfigComponent {
  configsOptions: ConfigOptions | undefined;
  selectedConfig: ConfigDetails | undefined;
  selectedDescription: string | undefined;
  hitch: boolean | undefined;
  steering: boolean | undefined;
  subscription: Subscription | undefined;
  private readonly teslaService = inject(TeslaConfigService);

  constructor(private cd: ChangeDetectorRef,private route: ActivatedRoute, private configStore: Store<ConfigState>){}

  ngOnInit(): void {
    const data = history.state;
    if(data.navigationId !== 1) {
    this.fetchConfigurationDetails(data.model?.model);
    if(data.config) {
      this.selectedDescription = data.config?.description;
      this.hitch = data.config?.towHitch;
      this.steering = data.config?.yoke;
      this.selectedConfig = data.config?.configDetails;
    } else {
      this.selectedDescription = undefined;
    }
    }
   }

   fetchConfigurationDetails(selectedModel:string) {
    if(selectedModel)
       this.subscription =  this.teslaService.fetchDescription(selectedModel).subscribe({
        next: (response: ConfigOptions) => {
          if (response) {
          //  Handle the response data, which contains ConfigOptions from API
            this.configsOptions = Object.assign([], response);
            this.cd.detectChanges();
          }
        },
        error: (error) => {
          console.error('Error fetching Tesla models:', error);
        },
        complete: () => console.info('complete') 
      }); 
    
  }

  getConfigDetails(value: string | undefined) {
    this.selectedDescription = value;
    if(this.configsOptions && this.configsOptions?.configs){
    this.configsOptions.configs.map((element: ConfigDetails)=>{
      if(element.description === this.selectedDescription){
        this.selectedConfig = element;
      }
    })
    }
    this.updateConfigurationData();
  }

  updateConfigurationData(): void {
    this.configStore.dispatch(setModelData({ model : {
      configDetails: this.selectedConfig,  
      description: this.selectedDescription,
      towHitch: this.hitch, 
      yoke: this.steering
       }         
     }));   
   }   

      
  updateHitchChange(): void {
    this.updateConfigurationData();
  }

  ngOnDestroy(): void {
    // Unsubscribe from the subscription to prevent memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}


