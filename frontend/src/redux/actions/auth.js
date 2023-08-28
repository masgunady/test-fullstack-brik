import { createAsyncThunk } from '@reduxjs/toolkit'
import http from '../../helpers/http'

export const asyncLoginAction = createAsyncThunk(
    'auth/login',
    async (payload, {rejectWithValue}) => {
        try {
            const body = new URLSearchParams(payload).toString()
            const {data} = await http().post('auth/login', body)
            return data.results.token
        } catch (err) {

            console.log(err)
            const results = err?.response?.data?.results
            const message = err?.response?.data?.message
            
            if(results){
                return rejectWithValue(results)
            }
            if(err.code === 'ERR_NETWORK'){
                return rejectWithValue('Error: Connection to backend failed!')
            }
            
            // return rejectWithValue('Username or password invalid')
            return rejectWithValue(message)
        }
    }
)

export const asyncRegisterAction = createAsyncThunk(
    'auth/register',
    async (payload, {rejectWithValue}) => {
        try {
            const body = new URLSearchParams(payload).toString()
            const {data} = await http().post('auth/register', body)
            return data.message
        } catch (err) {
            const results = err?.response?.data?.results
            const message = err?.response?.data?.message
            
            if(results){
                return rejectWithValue(results)
            }
            if(err.code === 'ERR_NETWORK'){
                
                return rejectWithValue('Error: Connection to backend failed!')
            }
            
            // return rejectWithValue('Username or password invalid')
            return rejectWithValue(message)
        }
    }
)
