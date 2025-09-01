import { api } from '../../api';

export const petsSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createPet: builder.mutation({
      query: (newPet) => ({
        url: '/pets',
        method: 'POST',
        body: newPet,
      }),
      invalidatesTags: ['Pets'],
    }),
    getUserPets: builder.query({
      query: () => '/pets',
      providesTags: ['Pets'],
    }),
    updatePet: builder.mutation({
      query: ({ id, ...updatedPet }) => ({
        url: `/pets/${id}`,
        method: 'PUT',
        body: updatedPet,
      }),
      invalidatesTags: ['Pets'],
    }),
  }),
  overrideExisting: false,
});

export const { useCreatePetMutation, useGetUserPetsQuery, useUpdatePetMutation } = petsSlice;
