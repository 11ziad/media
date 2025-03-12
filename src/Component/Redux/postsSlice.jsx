import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export let initialState = {

    loading : false,
    posts : [],
    userPost : [],
    post : {},
    error : false,
}

export let getPosts = createAsyncThunk('posts/getPosts', async()=>{


        let {data} = await axios.get('https://linked-posts.routemisr.com/posts?limit=50', {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        // console.log(data); 
        return data

})

export let getPost = createAsyncThunk('posts/getPost', async(id)=>{

        let {data} = await axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        // console.log(data); 
        return data.post

})
export let userPosts = createAsyncThunk('posts/userPosts', async(id)=>{

        let {data} = await axios.get(`https://linked-posts.routemisr.com/users/${id}/posts?`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        // console.log(data); 
        return data

})


let postsSlice =  createSlice({
    name : 'posts',
    initialState,
    reducers : {
    },
    extraReducers (builder){    
        builder.addCase(getPosts.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(getPosts.fulfilled,(state,action)=>{
            state.loading = false
            state.posts = action.payload
        })
        builder.addCase(getPosts.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(getPost.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(getPost.fulfilled,(state,action)=>{
            state.loading = false
            state.post = action.payload
        })
        builder.addCase(getPost.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(userPosts.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(userPosts.fulfilled,(state,action)=>{
            state.loading = false
            state.userPost = action.payload
        })
        builder.addCase(userPosts.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })

    } 
})

export let postsReducer = postsSlice.reducer