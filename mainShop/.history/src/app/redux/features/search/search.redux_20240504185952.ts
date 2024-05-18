import { FilterSection, FilterUpdate } from '@/types/filter';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    value: FilterSection[]
}

const initialState: InitialState = {
    value: [
        {

            id: 'category',
            name: 'Category',
            options: [
                { value: 'Shirt', label: 'Shirt', checked: false },
                { value: 'Pant', label: 'Pant', checked: false },
                { value: 'Dress', label: 'Dress', checked: false },
                { value: 'Accessories', label: 'Accessories', checked: false },
                { value: 'other', label: 'Other', checked: false },
            ],
        },
        {

            id: 'tags',
            name: 'Tags',
            options: [
                { value: 'men', label: 'Men', checked: false },
                { value: 'women', label: 'Women', checked: false },
                { value: 'hot-sales', label: 'Hot Sales', checked: false },
                { value: 'new-arrival', label: 'New Arrival', checked: false },
                { value: 'other', label: 'Other', checked: false },
            ],
        },
        {
            id: 'color',
            name: 'Color',
            options: [
                { value: 'white', label: 'White', checked: false },
                { value: 'black', label: 'Black', checked: false },
                { value: 'gray', label: 'Gray', checked: false },
                { value: 'navy', label: 'Navy', checked: false },
                { value: 'khaki', label: 'Khaki', checked: false },
                { value: 'red', label: 'Red', checked: false },
                { value: 'pink', label: 'Pink', checked: false },
                { value: 'orange', label: 'Orange', checked: false },
                { value: 'yellow', label: 'Yellow', checked: false },
                { value: 'green', label: 'Green', checked: false },
                { value: 'blue', label: 'Blue', checked: false },
                { value: 'purple', label: 'Purple', checked: false },
                { value: 'brown', label: 'Brown', checked: false },
                { value: 'beige', label: 'Beige', checked: false },
                { value: 'cream', label: 'Cream', checked: false },
                { value: 'silver', label: 'Silver', checked: false },
                { value: 'gold', label: 'Gold', checked: false },
                { value: 'other', label: 'Other', checked: false },
            ],
        },
        {
            id: 'size',
            name: 'Size',
            options: [
                { value: 's', label: 's', checked: false },
                { value: 'm', label: 'm', checked: false },
                { value: 'l', label: 'l', checked: false },
                { value: 'xl', label: 'xl', checked: false },
                { value: 'xxl', label: 'xxl', checked: false },
                { value: 'other', label: 'Other', checked: false },
            ],
        },
        {
            id: 'brand',
            name: 'Brand',
            options: [
                { value: 'gucci', label: 'Gucci', checked: false },
                { value: 'louisvuitton', label: 'Louis Vuitton', checked: false },
                { value: 'chanel', label: 'Chanel', checked: false },
                { value: 'prada', label: 'Prada', checked: false },
                { value: 'versace', label: 'Versace', checked: false },
                { value: 'armani', label: 'Armani', checked: false },
                { value: 'dior', label: 'Dior', checked: false },
                { value: 'other', label: 'Other', checked: false },
            ],
        },
    ]
}

export const SearchRedux = createSlice({
    name: 'SearchRedux',
    initialState,
    reducers: {
        updateFilter: (state, action: PayloadAction<FilterUpdate>) => {
            const { id, value, checked } = action.payload;
            const section = state.value.find(section => section.id === id);
            if (section) {
                const option = section.options.find(option => option.value === value);
                if (option) {
                    option.checked = checked;
                }
            }
        },
        resetFilter: (state) => {
            state.value.forEach(section => {
                section.options.forEach(option => {
                    option.checked = false;
                });
            });
        }
    }
})

export const { updateFilter, resetFilter } = SearchRedux.actions;

export default SearchRedux.reducer;