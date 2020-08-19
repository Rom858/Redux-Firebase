import { Dispatch } from 'redux';
import firebase from '../../../firebase';
import {AuthTypes,IUser} from '../AuthType';



const auth = firebase.auth();
interface IRegisterSuccess{
    type: AuthTypes.AUTH_REGISTER_SUCCESS
    payload: any
}
interface IRegisterFail{
    type: AuthTypes.AUTH_REGISTER_FAIL,
    payload: any
}
interface ILoginSuccess{
    type: AuthTypes.AUTH_LOGIN_SUCCESS
    payload: IUser
}
interface ILoginError{
    type: AuthTypes.AUTH_LOGIN_ERROR,
    payload: any
}
interface ILogOutSuccess{
    type: AuthTypes.AUTH_LOG_OUT_SUCCESS,
    payload: any
}
interface ILogOutErorr{
    type: AuthTypes.AUTH_LOG_OUT_ERROR,
    payload: any
}

export const registerEmail = (reg: IUser) => {
    return async (dispatch: Dispatch) => {
        try {
            await auth.createUserWithEmailAndPassword(reg.username,
                reg.password).then(() => {
                        auth.onAuthStateChanged(function (userData) {
                            userData?.sendEmailVerification();
                        })
                    }
                ).then(() => {
                    auth.onAuthStateChanged(function (userData) {
                        if (userData?.emailVerified) {
                            dispatch<IRegisterSuccess>({
                                type: AuthTypes.AUTH_REGISTER_SUCCESS,
                                payload: "success"
                            })
                        }
                    })
                }).catch(function(error) {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(`ErrorCode ${errorCode}`);
                    console.log(`ErrorMessage ${errorMessage}`);
                    dispatch<IRegisterFail>({
                        type: AuthTypes.AUTH_REGISTER_FAIL,
                        payload: error.code
                    })
                });
           
        } catch (error) {
            dispatch<IRegisterFail>({
                type: AuthTypes.AUTH_REGISTER_FAIL,
                payload: error.code
            })
    
        }
            
    }
}
export const loginEmail = (user:IUser) => {
    return async (dispatch: Dispatch) => {
        try {
            await auth.signInWithEmailAndPassword(user.username, user.password).then(data => {
                if (data.user?.emailVerified) {
                    dispatch<ILoginSuccess>({
                        type: AuthTypes.AUTH_LOGIN_SUCCESS,
                        payload: user
                    })
                    localStorage.setItem('Auth', 'true');

                }
            })
                .catch(function (error){
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(`error authentication ${errorCode}`);
                    console.log(`ErrorMessage ${errorMessage}`);
                    dispatch<ILoginError>({
                        type: AuthTypes.AUTH_LOGIN_ERROR,
                        payload: "Invalid Credential"
                    })
                });
           
        } catch (err) {
            dispatch<ILoginError>({
                type: AuthTypes.AUTH_LOGIN_ERROR,
                payload: err.message
            })
        }
    }
}


export const signout = () => async (dispatch:Dispatch) => {
    try {
      firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: AuthTypes.AUTH_LOG_OUT_SUCCESS });
      })
      .catch(() => {
        dispatch<ILogOutErorr>({ 
          type: AuthTypes.AUTH_LOG_OUT_ERROR, 
          payload: "...some error message for the user..."
        });
      });
    } catch (err) {
      dispatch<ILogOutErorr>({ 
        type: AuthTypes.AUTH_LOG_OUT_ERROR, 
        payload: "...some error message for the user..."
      });
    }
  };