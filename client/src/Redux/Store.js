    import {configureStore} from '@reduxjs/toolkit'
    import userReducer from './userSlice'
    import authReducer from './AuthSlice'


    const Store=configureStore({
        reducer:{
            auth:authReducer,
            userdata:userReducer
        }
    })

    export default Store