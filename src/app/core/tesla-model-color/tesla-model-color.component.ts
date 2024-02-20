import { ChangeDetectionStrategy, ChangeDetectorRef, Component,NO_ERRORS_SCHEMA,inject  } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TeslaConfigService } from '../../shared/services/tesla-config.service';
import { FormsModule } from '@angular/forms';
import { DashbaordComponent } from '../../dashbaord/dashbaord.component';
import { Store, StoreModule } from '@ngrx/store';
import { setData } from '../../shared/store-data/store.actions';
import { AppState } from '../../shared/store-data/store.reducers';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { StandardColor, StandardModel } from '../../models/tesla.models';

@Component({
  selector: 'app-tesla-model-color',
  standalone: true,
  imports: [HttpClientModule, CommonModule,FormsModule, DashbaordComponent, StoreModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [NO_ERRORS_SCHEMA],
  providers:[{ provide: TeslaConfigService, useClass: TeslaConfigService }],
  templateUrl: './tesla-model-color.component.html',
  styleUrl: './tesla-model-color.component.scss',
})

export class TeslaModelColorComponent {
  teslaModels: StandardModel[] | undefined;
  selectedColor: string | undefined ;
  selectedModel: string | undefined ;
  teslaColors: StandardColor[] | undefined;
  downloadPhoto: FileReader | undefined;
  modelDetails: StandardModel | undefined;
  subscription: Subscription | undefined;
  imageUrl: string | undefined;


  private readonly teslaService = inject(TeslaConfigService);
  private readonly url = 'https://interstate21.com/tesla-app/images';


  constructor(private cd: ChangeDetectorRef,private store: Store<AppState>, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.getTeslaModels();
    this.bindSelectedData();
  }

  getTeslaModels(): void {
    this.subscription = this.teslaService.fetchModels().subscribe({
      next: (resp: StandardModel[]) => {
        if (resp && resp?.length) {
          //  Handle the response data, which contains StandardModel from
          this.teslaModels = Object.assign([], resp);
          this.cd.detectChanges();
        }
      },
      error: (error) => {
        console.error('Error fetching Tesla models:', error);
      },
      complete: () => console.info('complete') 

    }); 
  }

  bindSelectedData(): void {
    const data = history.state;
    if(data.navigationId !== 1 && data?.model) {
    this.selectedModel = data?.model.model;
    this.teslaColors = data?.model.details.colors;
    this.selectedColor =  data?.model.color;
    this.modelDetails = data?.model.details;
    }
  }

  fetchColorDetails(value : string | undefined) {
    this.selectedModel = value;
    this.selectedColor = undefined;
    if(this.teslaModels)
    this.teslaModels.map((element: StandardModel ) => { 
      if(element.code === value) this.modelDetails = element;
    })
    this.teslaColors =  this.modelDetails?.colors
    this.sendModelDetails();
  }

  fetchImageDetails(value : string | undefined) {
    this.selectedColor = value;
    if(this.selectedModel &&  this.selectedColor) 
    this.imageUrl = `${this.teslaService.API}/${this.selectedModel}/${this.selectedColor}.jpg`
    this.sendModelDetails();
  }

  sendModelDetails(): void {
    this.store.dispatch(setData({ data : {
      imageurl : this.imageUrl,
      model : this.selectedModel,
      details: this.modelDetails,
      color: this.selectedColor
    }
    }));
  }

  ngOnDestroy(): void {
    // Unsubscribe from the subscription to prevent memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}


