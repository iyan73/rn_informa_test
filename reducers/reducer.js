

const initState = {
    data : [],
    dataTracking : [],
    loading : true
}

export const reducer = (state = initState, action) => {
    if(action.type == "LOAD_DATA"){
        return {
            ...state,
            data: action.payload.data,
            loading: action.payload.loading
        }
    }
    if(action.type == "LOAD_DATA_TRACKING"){
        return {
            ...state,
            dataTracking: action.payload.data,
            loading: action.payload.loading
        }
    }
    if(action.type == "CHANGE_LOADING"){
        return {
            ...state,
            loading: action.payload.loading
        }
    }
    return state;
}