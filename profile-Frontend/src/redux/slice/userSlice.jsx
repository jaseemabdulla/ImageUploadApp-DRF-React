import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name:"user",
    initialState:{
      
      user:null,
      token:''
    },
    reducers:{
        userLogin:(state,action) => {
         
          state.user = action.payload.user
          state.token = action.payload.jwt
        },
        userLogout:(state) => {
            state.user = {
              
              user:null,
              token:''
            }
          }
        }
      })
      export const {userLogin,userLogout} = userSlice.actions
      export default userSlice.reducer