import { api } from '../../api';

export const medicationsSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getMedicationsByPetId: builder.query({
      query: (petId) => `/medications/pet/${petId}`,
      providesTags: ['Medications'],
    }),
    getMedicationById: builder.query({
      query: (medicationId) => `/medications/single/${medicationId}`,
      providesTags: (result, error, medicationId) => [
        { type: 'SingleMedication', id: medicationId },
      ],
    }),
    createMedication: builder.mutation({
      query: (newMedication) => ({
        url: '/medications',
        method: 'POST',
        body: newMedication,
      }),
      invalidatesTags: ['Medications'],
    }),
    updateMedication: builder.mutation({
      query: ({ id, ...updatedMedication }) => ({
        url: `/medications/${id}`,
        method: 'PUT',
        body: updatedMedication,
      }),
      invalidatesTags: (result, error, { id }) => [
        'Medications',
        { type: 'SingleMedication', id },
      ],
    }),
    deleteMedication: builder.mutation({
      query: (medicationId) => ({
        url: `/medications/${medicationId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Medications'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMedicationsByPetIdQuery,
  useGetMedicationByIdQuery,
  useCreateMedicationMutation,
  useUpdateMedicationMutation,
  useDeleteMedicationMutation,
} = medicationsSlice;

export default medicationsSlice;