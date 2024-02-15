import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isLogin: false,
    user: null,
    profilePicture: null,
    isAdmin: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userLogin: (state, action) => {
            state.isLogin = true;
            state.user = action.payload;
            state.token = action.payload.token;
            state.isAdmin = action.payload.isAdmin;
          },
          

        userLogout: (state, action) => {
            state.isLogin = false;
            state.user = null;
            state.token = null; 
        },

        checkAuthentication: (state) => {
            const jwtToken = localStorage.getItem('jwt');
            if (jwtToken) {
              const decodedToken = JSON.parse(jwtToken);
              state.isLogin = true;
              state.user = decodedToken;
              state.token = decodedToken.token;
              state.profilePicture = localStorage.getItem(`ProfilePicture_${decodedToken._id}`);
            }
          },

          
          clearUserData: (state) => {
            state.isLogin = false;
            state.user = null;
            state.token = null;
            state.profilePicture = null;
        },

        updateProfilePicture:(state,action)=>{
            state.profilePicture=action.payload;
            localStorage.setItem(`ProfilePicture_${state.user._id}`, action.payload);
        }
    },
});




export const { userLogin, userLogout, checkAuthentication ,clearUserData,updateProfilePicture} = authSlice.actions;


export default authSlice.reducer;
