import { api } from '../../api';

const authSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: '/users',
        method: 'POST',
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: '/users/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useRegisterUserMutation, useLoginUserMutation } = authSlice;

export default authSlice;
