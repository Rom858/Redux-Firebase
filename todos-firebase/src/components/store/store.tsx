import { createStore, applyMiddleware,Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducers';
import { ITodosState } from './types';
import {IAuthState} from './AuthType'
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { getFirebase } from 'react-redux-firebase'


const middlewares = [
    thunk.withExtraArgument(getFirebase)
  ]
export interface ApplicationState{
    todosReducer: ITodosState
    authReducers: IAuthState
}
const store: Store<ApplicationState> = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
)
export default store;
export const TypedUseTodos: TypedUseSelectorHook<ApplicationState> = useSelector;
export const TypeUseSongs: TypedUseSelectorHook<ApplicationState> = useSelector;



// if u want to share this data then go to children component that u want to share data with
// then 
// import { TypedUseTodos, TypeUseSongs } from './store'; 
// example:   const data = TypedUseTodos(state=> state.rootReducers.todos);
// data.map(data=> (<TodoList data={data} />))



//  ************** another pattern we can split  these data**********************
//  **************  MAKE STORE CLEAN CODE WHEN COMPLICATE DATA ******************
// export const TypedUseTodos: TypedUseSelectorHook<ApplicationState> = useSelector;
// export const TypeUseSongs: TypedUseSelectorHook<ApplicationState> = useSelector;



// example :
// shareData.tsx
// import { ApplicationState } from './store';
// import { TypedUseSelectorHook,useSelector } from 'react-redux';
// export const TypedUseTodos: TypedUseSelectorHook<ApplicationState> = useSelector;
// export const TypeUseSongs: TypedUseSelectorHook<ApplicationState> = useSelector;
