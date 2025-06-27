import { api } from '../../api';

const usersSlice = api.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useLoginUserMutation } = usersSlice;

export default usersSlice;
