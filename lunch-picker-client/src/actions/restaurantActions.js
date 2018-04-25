import * as appActions from './appActions';
import { RESTAURANT_ACTIONS } from './types';
import { restaurantService } from '../aws/api';
import { getCurrentPosition } from '../utils';

export const detectTextInLogo = fileKey => async dispatch => {
  dispatch(appActions.loading());
  try {
    const data = await restaurantService.detect(fileKey);
    dispatch({
      type: RESTAURANT_ACTIONS.DETECT_SUCCESS,
      payload: { results: data.results }
    });
  } catch (e) {
    dispatch(appActions.showError(e.message));
  }
  dispatch(appActions.loading(false));
};

export const searchByName = name => async dispatch => {
  dispatch(appActions.loading());
  try {
    const { latitude, longitude } = await getCurrentPosition();
    const data = await restaurantService.search(name, latitude, longitude);
    dispatch({
      type: RESTAURANT_ACTIONS.SEARCH_SUCCESS,
      payload: { searchSummary: data[0] }
    });
  } catch (e) {
    dispatch(appActions.showError(e.message));
  }
  dispatch(appActions.loading(false));
};

export const getDetailById = id => async dispatch => {
  dispatch(appActions.loading());
  try {
    const data = await restaurantService.detail(id);
    dispatch({
      type: RESTAURANT_ACTIONS.GET_DETAIL_SUCCESS,
      payload: { onlineDetail: data }
    });
  } catch (e) {
    dispatch(appActions.showError(e.message));
  }
  dispatch(appActions.loading(false));
};

export const getReviewsById = id => async dispatch => {
  dispatch(appActions.loading());
  try {
    const { data } = await restaurantService.reviews(id);
    dispatch({
      type: RESTAURANT_ACTIONS.GET_REVIEWS_SUCCESS,
      payload: { onlineReviews: data }
    });
  } catch (e) {
    dispatch(appActions.showError(e.message));
  }
  dispatch(appActions.loading(false));
};
