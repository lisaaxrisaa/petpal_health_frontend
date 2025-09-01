import { api } from '../../api';

export const foodSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getFoodEntriesByPetId: builder.query({
      query: (petId) => `/food/pet/${petId}`,
      providesTags: ['Food'],
    }),
    getFoodEntryById: builder.query({
      query: (foodEntryId) => `/food/single/${foodEntryId}`,
      providesTags: (result, error, foodEntryId) => [
        { type: 'SingleFoodEntry', id: foodEntryId },
      ],
    }),
    createFoodEntry: builder.mutation({
      query: (foodEntryData) => ({
        url: '/food',
        method: 'POST',
        body: foodEntryData,
      }),
      invalidatesTags: ['Food'],
    }),
    updateFoodEntry: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/food/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        'Food',
        { type: 'SingleFoodEntry', id },
      ],
    }),
    deleteFoodEntry: builder.mutation({
      query: (id) => ({
        url: `/food/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Food'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetFoodEntriesByPetIdQuery,
  useGetFoodEntryByIdQuery,
  useCreateFoodEntryMutation,
  useUpdateFoodEntryMutation,
  useDeleteFoodEntryMutation,
} = foodSlice;

export default foodSlice;