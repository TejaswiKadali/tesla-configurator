import { createAction, props } from '@ngrx/store';
import { ConfigModel, DataModel } from '../../models/tesla.models';

export const setData = createAction('[Data] Set Data', props<{ data: DataModel }>());

export const setModelData = createAction('[Data] Set Data', props<{ model: ConfigModel }>());

