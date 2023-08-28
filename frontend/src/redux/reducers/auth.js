import { createSlice } from '@reduxjs/toolkit'
import { asyncLoginAction, asyncRegisterAction } from '../actions/auth'

const initialState = {
    token: '',
    errorMessage:'',
    successMessage:'',
    warningMessage:'',
    formError: []
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload
        },
        setWarningMessage: (state, action) => {
            state.warningMessage = action.payload
        },
        
        clearMessage: (state) => {
            state.errorMessage = ''
            state.warningMessage = ''
            state.successMessage = ''
            state.formError= []
        },
        logout: () => {
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder.addCase(asyncLoginAction.rejected, (state, action) => {
            // console.log(action)
            if(typeof action.payload === 'string'){
                state.errorMessage = action.payload
            }else{
                state.formError = action.payload
            }
        })

        builder.addCase(asyncLoginAction.fulfilled, (state, action) => {
            state.token = action.payload
        })

        builder.addCase(asyncRegisterAction.rejected, (state, action) => {
            // console.log(action)
            if(typeof action.payload === 'string'){
                state.errorMessage = action.payload
            }else{
                state.formError = action.payload
            }
        })

        builder.addCase(asyncRegisterAction.fulfilled, (state, action) => {
            state.successMessage = action.payload
        })
    }

})

export const {setErrorMessage, setWarningMessage, clearMessage, logout} = authSlice.actions
export default authSlice.reducer
