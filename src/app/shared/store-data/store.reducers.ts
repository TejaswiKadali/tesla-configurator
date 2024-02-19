// app.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as AppActions from './store.actions';
import { AppReducer, ConfigModel, ConfigReducre, DataModel } from '../../models/tesla.models';

export interface AppState {
  app: AppReducer;
  data: DataModel;
}

export const initialState: AppState = {
    data: {
      imageurl : undefined,
      model :  undefined,
      details: undefined,
      color:  undefined,
    },
    app: {
      data: undefined
    },
};

export const dataReducer = createReducer(
  initialState,
  on(AppActions.setData, (state, { data }) => ({ ...state, data }))
);

export interface ConfigState {
  config: ConfigReducre;
  model: ConfigModel;
}

export const initialModelState: ConfigState = {
  model: {
      configDetails: undefined,
      description: undefined,
      towHitch: undefined,
      yoke: undefined
    },
    config: {
      model:undefined
    },
};

export const modelReducer = createReducer(
  initialModelState,
  on(AppActions.setModelData, (state, { model }) => ({ ...state, model }))
)


