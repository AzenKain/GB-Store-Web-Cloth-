import { FilterOption, FilterSection, FilterUpdate } from '@/types/filter';
import { OrderType } from '@/types/order';
import { OrderType } from '@/types/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    value: OrderType[];
    tmpValue: OrderType[];
}

const initialState: InitialState = {
    value: [],
    tmpValue: []
}



export const OrderRedux = createSlice({
    name: 'OrderRedux',
    initialState,
    reducers: {
        AddListOrder: (state, action: PayloadAction<OrderType[]>) => {
            return {
                value: action.payload,
                tmpValue: action.payload
            }
        },
        AddFilterOrder: (state, action: PayloadAction<FilterSection[]>) => {
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
        SortOrder: (state, action: PayloadAction<string>) => {
            let sortedOrders: OrderType[] = [...state.value];

            if (action.payload === "Most Popular") {
                sortedOrders.sort(compareByBuyCount);
            } else if (action.payload === "Best Rating") {
                sortedOrders.sort(compareByRating);
            } else if (action.payload === "Newest") {
                sortedOrders.sort(compareByNewest);
            } else if (action.payload === "Price: Low to High") {
                sortedOrders.sort(compareByPriceLowToHigh);
            } else if (action.payload === "Price: High to Low") {
                sortedOrders.sort(compareByPriceHighToLow);
            }

            return { ...state, value: sortedOrders };
        },
        FindByName: (state, action: PayloadAction<string>) => {
            state.value = state.value.filter(product => product.productName.toLowerCase().includes(action.payload.toLowerCase()))
        }
    }
})

export const { AddListOrder, AddFilterOrder, SortOrder, FindByName } = OrderRedux.actions;

export default OrderRedux.reducer;