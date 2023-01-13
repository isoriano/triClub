import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { User } from '../models';
import { USER_FEATURE_KEY, UserState, userAdapter } from './user.reducer';

// Lookup the 'User' feature state managed by NgRx
export const selectUserState = createFeatureSelector<UserState>(USER_FEATURE_KEY);

const { selectEntities } = userAdapter.getSelectors();

export const isUpdating = createSelector(selectUserState, (state: UserState) => state.isUpdating);
export const isUpdated = createSelector(selectUserState, (state: UserState) => state.isUpdated);
export const selectUserLoaded = createSelector(selectUserState, (state: UserState) => state.loaded);
export const selectUserError = createSelector(selectUserState, (state: UserState) => state.error);

// export const selectAllUser = createSelector(selectUserState, (state: UserState) => selectAll(state));

export const selectUser = createSelector(selectUserState, (state: UserState) => {
  const entities: Dictionary<User> = selectEntities(state);
  const [first] = Object.keys(entities);
  return entities[first];
});

// export const selectDemosStoreEntities = createSelector(selectDemosStoreState, (state: DemosStoreState) => selectEntities(state));

// export const selectSelectedId = createSelector(selectDemosStoreState, (state: DemosStoreState) => state.selectedId);

// export const selectEntity = createSelector(selectDemosStoreEntities, selectSelectedId, (entities, selectedId) =>
//   selectedId ? entities[selectedId] : undefined
// );
