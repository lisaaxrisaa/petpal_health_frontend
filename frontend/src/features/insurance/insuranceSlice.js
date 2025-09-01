import { api } from '../../api';

export const insuranceSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getInsuranceByPetId: builder.query({
      query: (petId) => `/insurance/pet/${petId}`,
      providesTags: ['Insurance'],
    }),
    getInsuranceById: builder.query({
      query: (insuranceId) => `/insurance/single/${insuranceId}`,
      providesTags: (result, error, insuranceId) => [
        { type: 'SingleInsurance', id: insuranceId },
      ],
    }),
    createInsurance: builder.mutation({
      query: (insuranceData) => ({
        url: '/insurance',
        method: 'POST',
        body: insuranceData,
      }),
      invalidatesTags: ['Insurance'],
    }),
    updateInsurance: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/insurance/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        'Insurance',
        { type: 'SingleInsurance', id },
      ],
    }),
    deleteInsurance: builder.mutation({
      query: (id) => ({
        url: `/insurance/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Insurance'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetInsuranceByPetIdQuery,
  useGetInsuranceByIdQuery,
  useCreateInsuranceMutation,
  useUpdateInsuranceMutation,
  useDeleteInsuranceMutation,
} = insuranceSlice;

export default insuranceSlice;