import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NO_ERRORS_SCHEMA} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TeslaConfigService } from '../shared/services/tesla-config.service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store, StoreModule } from '@ngrx/store';
import { AppState, ConfigState  } from '../shared/store-data/store.reducers';
import { ConfigModel, DataModel } from '../models/tesla.models';

@Component({
  selector: 'app-dashbaord',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ CommonModule,RouterModule,FormsModule, StoreModule],
  schemas: [NO_ERRORS_SCHEMA],
  providers:[{ provide: TeslaConfigService,useClass:TeslaConfigService }],
  templateUrl: './dashbaord.component.html',
  styleUrl: './dashbaord.component.scss',
})
export class DashbaordComponent {
  checkoutSteps = [
    { id: 'step1', label: 'Step 1', link: '/step1', active: false },
    { id: 'step2', label: 'Step 2', link: '/step2', active: true },
    { id: 'step3', label: 'Step 3', link: '/step3', active: true }
  ];
  selectedLevel: string | undefined;
  selectedModel: string | undefined;
  imageUrl: string | undefined;
  color: string |undefined;
  subscription: Subscription | undefined;
  isRouteActive: boolean | undefined ;
  configData: ConfigModel | undefined;
  modelData: DataModel | undefined;

  constructor(private router: Router, private cd: ChangeDetectorRef, private store: Store<AppState>, private config: Store<ConfigState>) { }

  ngOnInit(): void {
    this.selectedLevel = this.checkoutSteps[0].id;
    this.nextLevel(this.selectedLevel,this.checkoutSteps[0].link)
    this.getModelsOptions();
    this.getConfiguration();
  }

  getModelsOptions(): void {
    this.subscription = this.store.select(state => state.app.data).subscribe({
      next: (data) => {
        if(data){
            this.imageUrl = data?.imageurl;
            this.modelData =  data;
            if( data?.model && data?.color) {
              this.configData = undefined;
              this.checkoutSteps[1].active = false;
              this.checkoutSteps[2].active = true;
            } else {
              this.checkoutSteps[1].active = true;
              this.checkoutSteps[2].active = true;
            }
        } else {
          this.configData = undefined;
          this.checkoutSteps[2].active = true;
        }
        this.cd.detectChanges();
          },
      error: (error) => console.error('Error downloading photo:', error),
      complete: () => console.info('complete') 
  });

  }

  getConfiguration(): void {
    this.subscription = this.config.select(state => state.config.model).subscribe({
      next: (data) => {
        if(data){
          this.configData = data;
          if(data?.description && !this.checkoutSteps[1].active) {
            this.checkoutSteps[2].active = false;
          } else {
            this.checkoutSteps[2].active = true;
          }
        } else {
          this.checkoutSteps[2].active = true;
        }
        this.cd.detectChanges();
          },
      error: (error) => console.error('Error downloading photo:', error),
      complete: () => console.info('complete') 
  });
  }

  nextLevel(value: string, link: string): void {
      this.selectedLevel = value;
      this.router.navigate([link], { state : {model : this.modelData , config : this.configData }});
      this.cd.detectChanges();

  }

  
  ngOnDestroy(): void {
    // Unsubscribe from the subscription to avoid memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
