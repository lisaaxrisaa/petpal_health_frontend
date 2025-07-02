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
    getSingleHealthLog: builder.query({
      query: (logId) => `/healthlogs/log/${logId}`,
      providesTags: (result, error, logId) => [
        { type: 'SingleHealthLog', id: logId },
      ],
    }),

    updateHealthLog: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/healthlogs/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        'HealthLogs',
        { type: 'SingleHealthLog', id },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetHealthLogsQuery,
  useCreateHealthLogMutation,
  useDeleteHealthLogMutation,
  useGetSingleHealthLogQuery,
  useUpdateHealthLogMutation,
} = healthLogsSlice;

export default healthLogsSlice;
