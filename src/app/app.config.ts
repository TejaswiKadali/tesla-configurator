import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { dataReducer, modelReducer } from './shared/store-data/store.reducers';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    importProvidersFrom(StoreModule.forRoot({ app: dataReducer, config : modelReducer })),
    importProvidersFrom(RouterModule.forRoot(routes)),{ 
    provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
};


