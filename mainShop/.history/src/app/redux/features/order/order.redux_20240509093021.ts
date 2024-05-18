import { FilterOption, FilterSection, FilterUpdate } from '@/types/filter';
import { OrderType } from '@/types/order';
import { ProductType } from '@/types/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    value: OrderType[];
    tmpValue: OrderType[];
}

const initialState: InitialState = {
    value: [],
    tmpValue: []
}



export const ProductRedux = createSlice({
    name: 'ProductRedux',
    initialState,
    reducers: {
        AddListProduct: (state, action: PayloadAction<ProductType[]>) => {
            return {
                value: action.payload,
                tmpValue: action.payload
            }
        },
        AddFilterProduct: (state, action: PayloadAction<FilterSection[]>) => {
            state.value = state.tmpValue
            action.payload.forEach(filterSection => {
                filterSection.options.forEach((filterOption: FilterOption) => {
                    if (filterOption.checked) {
                        state.value = state.value.filter(product => {
                            switch (filterSection.id) {
                                case 'brand':
                                    return product?.productName.toLowerCase() === filterOption.value.toLowerCase();
                                case 'color':
                                    return product?.color.includes(filterOption.value.toLowerCase());
                                case 'size':
                                    return product?.size.includes(filterOption.value.toLowerCase());
                                case 'category':
                                    return product?.productType.toLowerCase() === filterOption.value.toLowerCase();
                                case 'tags':
                                    return product?.detail?.tags.includes(filterOption.value.toLowerCase());
                                default:
                                    return true;
                            }
                        });
                    }
                });
            });
        },
        SortProduct: (state, action: PayloadAction<string>) => {
            let sortedProducts: ProductType[] = [...state.value];

            if (action.payload === "Most Popular") {
                sortedProducts.sort(compareByBuyCount);
            } else if (action.payload === "Best Rating") {
                sortedProducts.sort(compareByRating);
            } else if (action.payload === "Newest") {
                sortedProducts.sort(compareByNewest);
            } else if (action.payload === "Price: Low to High") {
                sortedProducts.sort(compareByPriceLowToHigh);
            } else if (action.payload === "Price: High to Low") {
                sortedProducts.sort(compareByPriceHighToLow);
            }

            return { ...state, value: sortedProducts };
        },
        FindByName: (state, action: PayloadAction<string>) => {
            state.value = state.value.filter(product => product.productName.toLowerCase().includes(action.payload.toLowerCase()))
        }
    }
})

export const { AddListProduct, AddFilterProduct, SortProduct, FindByName } = ProductRedux.actions;

export default ProductRedux.reducer;