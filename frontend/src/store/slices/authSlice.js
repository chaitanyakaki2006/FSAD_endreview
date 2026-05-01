import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '../../api/api';

const getErrorMessage = (error, fallback) => {
    if (error.response?.data?.message) {
        return error.response.data.message;
    }

    if (error.response?.data?.data) {
        return Object.values(error.response.data.data).join(', ');
    }

    if (error.request) {
        return 'Cannot reach the server. Please check that the backend is running and CORS is configured.';
    }

    return fallback;
};

// Async thunks
export const login = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await authAPI.login(credentials);
            const { token, user } = response.data.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            return { token, user };
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, 'Login failed'));
        }
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await authAPI.register(userData);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, 'Registration failed'));
        }
    }
);

export const registerAdmin = createAsyncThunk(
    'auth/registerAdmin',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await authAPI.registerAdmin(userData);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, 'Admin registration failed'));
        }
    }
);

export const registerModerator = createAsyncThunk(
    'auth/registerModerator',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await authAPI.registerModerator(userData);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, 'Moderator registration failed'));
        }
    }
);

export const registerPolitician = createAsyncThunk(
    'auth/registerPolitician',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await authAPI.registerPolitician(userData);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, 'Politician registration failed'));
        }
    }
);

export const fetchCurrentUser = createAsyncThunk(
    'auth/fetchCurrentUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await authAPI.getCurrentUser();
            return response.data.data;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, 'Failed to fetch user'));
        }
    }
);

// Initial state
const storedUser = localStorage.getItem('user');
const storedToken = localStorage.getItem('token');

const initialState = {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken || null,
    isAuthenticated: !!storedToken,
    loading: false,
    error: null,
};

// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
        clearError: (state) => {
            state.error = null;
        },
        updateUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Register
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Register Admin
            .addCase(registerAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerAdmin.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(registerAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Register Moderator
            .addCase(registerModerator.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerModerator.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(registerModerator.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Register Politician
            .addCase(registerPolitician.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerPolitician.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(registerPolitician.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch current user
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.user = action.payload;
                localStorage.setItem('user', JSON.stringify(action.payload));
            });
    },
});

export const { logout, clearError, updateUser } = authSlice.actions;
export default authSlice.reducer;
