import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    products:[],
    userInfo:null,  
}
export const amazonSlice = createSlice({
    name:"amazon",
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            const item = state.products.find((item)=>item.id===action.payload.id)
            if(item){
                item.quantity+=action.payload.quantity;
            }
            else{
            state.products.push(action.payload)
            }
        },
        incrmentQuentity:(state,action)=>{
            const item = state.products.find((item)=>item.id===action.payload);
            item.quantity++;
        },
        decrmentQuentity:(state,action)=>{
            const item = state.products.find((item)=>item.id===action.payload);
           if(item.quantity!==1) item.quantity--;
        },
        deleteItem:(state,action)=>{
            state.products = state.products.filter((item)=>item.id!==action.payload)
        },
        resetCart:(state)=>{
            state.products = []
        },
        // User authentication
        setUserInfo:(state,action)=>{
            state.userInfo = action.payload;
        },
        singnoutUser:(state)=>{
            state.userInfo = null;
            state.products = null;
        },
    }
})
export const{
    addToCart,
    deleteItem,
    resetCart,
    incrmentQuentity,
    decrmentQuentity,
    setUserInfo,
    singnoutUser,
}= amazonSlice.actions;
export default amazonSlice.reducer;