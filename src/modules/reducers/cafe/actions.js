import types from './types';

export const setLoading = (data) => ({
    type: types.SET_LOADING,
    payload: data,
});

export const setSelectedFeature = (data) => ({
    type: types.SET_SELECTEDFEATURE,
    payload: data,
});

export const setSelectedFeatureIndex = (data) => ({
    type: types.SET_SELECTEDFEATUREINDEX,
    payload: data,
});

export const setNormalCard = (data) => ({
    type: types.SET_NORMALCARD,
    payload: data,
});

export const setSelectedSubFeatures = (data) => ({
    type: types.SET_SELECTEDSUBFEATURES,
    payload: data,
});

export const setSelectedSubFeatureIndex = (data) => ({
    type: types.SET_SELECTEDSUBFEATUREINDEX,
    payload: data,
});
