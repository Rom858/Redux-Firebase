import { Reducer } from 'redux';
import { ITodosState, TodoTypes } from '../types';



const initialState: ITodosState = {
    todos: [],
    loading: false,
    error: false,
    current:null,
    filtered: '',  
    search: ''
};
const todosReducers: Reducer<ITodosState> = (state = initialState, action) => {
    switch (action.type) {
        case TodoTypes.FETCH_REQUEST:
            return {
                ...state,
                todos: action.payload,
            }
        case TodoTypes.FILTER_TODOS:
            return {
                ...state,
                search:action.payload,
            }
        case TodoTypes.ADD_TODO:
            return{
                ...state,
                loading: false,
                error:false
            }
        case TodoTypes.DELETE_TODO:
            return {
                ...state
            }
        case TodoTypes.SET_CURRENT:
            return {
                ...state,
                current : action.payload
                
            }
        case TodoTypes.CLEAR_CURRENT:
            return {
                ...state,
                current: action.payload
            }
        case TodoTypes.UPDATE_TODO:
            return {
                ...state
            }
        default:
            return state;
    }
}
export default todosReducers;
