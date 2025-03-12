import { createSlice } from "@reduxjs/toolkit";

export let initialState = {
    token   : localStorage.getItem('token'),
    loading : false,
    error  : false,
}


let authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        setLoading :(state,action)=>{
            state.loading = action.payload
        },
        setToken :(state,action)=>{
            state.token = action.payload
            state.loading = false
            localStorage.setItem('token' , action.payload.token)
        },
        setError :(state,action)=>{
            state.loading = false
            state.error =action.payload
        },
        removToken :(state)=>{
            state.token  = null
            localStorage.removeItem('token')
        },
    }
})

export let authReducer = authSlice.reducer
export let {setLoading, setToken,setError,removToken} = authSlice.actions