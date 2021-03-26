import types from './types';

const initialState = {
    loading: false,
    logged: false,
    selectedFeature: [],
    selectedFeatureIndex: 0,
    normalCard: false,
    selectedSubFeatures: [],
    selectedSubFeatureIndex: 0
};

export default function CafeReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };

        case types.SET_SELECTEDFEATURE:
            return {
                ...state,
                selectedFeature: action.payload,
            };

        case types.SET_SELECTEDFEATUREINDEX:
            return {
                ...state,
                selectedFeatureIndex: action.payload,
            };

        case types.SET_NORMALCARD:
            return {
                ...state,
                normalCard: action.payload,
            };

        case types.SET_SELECTEDSUBFEATURES:
            return {
                ...state,
                selectedSubFeatures: action.payload,
            };

        case types.SET_SELECTEDSUBFEATUREINDEX:
            return {
                ...state,
                selectedSubFeatureIndex: action.payload,
            };

        default:
            return state;
    }
}