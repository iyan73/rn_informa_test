

const initState = {
    data : [],
    loading : true
}

export const reducer = (state = initState, action) => {
    // console.log("acc", action.payload)
    if(action.type == "LOAD_DATA"){
        return {
            ...state,
            data: action.payload.data,
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