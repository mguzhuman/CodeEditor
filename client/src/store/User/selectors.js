import { createSelector } from 'reselect';

const baseState = state => state.userReducer;

export const isPremium = createSelector(
    baseState,
    s => s.isPremium
)
