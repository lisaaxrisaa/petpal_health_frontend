import { api } from '../../api';

export const vaccinesSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getVaccinesByPetId: builder.query({
      query: (petId) => `/vaccines/pet/${petId}`,
      providesTags: ['Vaccines'],
    }),
    getVaccineById: builder.query({
      query: (vaccineId) => `/vaccines/single/${vaccineId}`,
      providesTags: (result, error, vaccineId) => [
        { type: 'SingleVaccine', id: vaccineId },
      ],
    }),
    getUpcomingVaccines: builder.query({
      query: (petId) => `/vaccines/pet/${petId}/upcoming`,
      providesTags: ['UpcomingVaccines'],
    }),
    createVaccine: builder.mutation({
      query: (vaccineData) => ({
        url: '/vaccines',
        method: 'POST',
        body: vaccineData,
      }),
      invalidatesTags: ['Vaccines', 'UpcomingVaccines'],
    }),
    updateVaccine: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/vaccines/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        'Vaccines',
        'UpcomingVaccines',
        { type: 'SingleVaccine', id },
      ],
    }),
    deleteVaccine: builder.mutation({
      query: (id) => ({
        url: `/vaccines/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Vaccines', 'UpcomingVaccines'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetVaccinesByPetIdQuery,
  useGetVaccineByIdQuery,
  useGetUpcomingVaccinesQuery,
  useCreateVaccineMutation,
  useUpdateVaccineMutation,
  useDeleteVaccineMutation,
} = vaccinesSlice;

export default vaccinesSlice;