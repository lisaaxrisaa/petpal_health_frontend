import { api } from '../../api';

const healthLogsSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getHealthLogs: builder.query({
      query: (petId) => `/healthlogs/${petId}`,
      providesTags: ['HealthLogs'],
    }),
    createHealthLog: builder.mutation({
      query: (newLog) => ({
        url: '/healthlogs',
        method: 'POST',
        body: newLog,
      }),
      invalidatesTags: ['HealthLogs'],
    }),
    deleteHealthLog: builder.mutation({
      query: (id) => ({
        url: `/healthlogs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['HealthLogs'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetHealthLogsQuery,
  useCreateHealthLogMutation,
  useDeleteHealthLogMutation,
} = healthLogsSlice;

export default healthLogsSlice;
