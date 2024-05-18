import { FilterOption, FilterSection, FilterUpdate } from '@/types/filter';
import { ProductType } from '@/types/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    value: ProductType[];
    tmpValue: ProductType[];
}

const initialState: InitialState = {
    value: [],
    tmpValue: []
}

const removeDuplicates = (products: ProductType[]): ProductType[] => {
    const uniqueProducts: { [key: string]: ProductType } = {};
    products.forEach(product => {
        if (product.id !== undefined) {
            uniqueProducts[product.id] = product;
        }
    });
    return Object.values(uniqueProducts);
};

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
                                    return product.productName.toLowerCase() === filterOption.value.toLowerCase();
                                case 'color':
                                    return product.color.includes(filterOption.value.toLowerCase());
                                case 'size':
                                    return product.size.includes(filterOption.value.toLowerCase());
                                case 'category':
                                    return product.productType.toLowerCase() === filterOption.value.toLowerCase();
                                case 'tags':
                                    return product.detail?.tags.includes(filterOption.value.toLowerCase());
                                default:
                                    return true;
                            }
                        });
                    }
                });
            });
        },
        SortProduct: (state, action: PayloadAction<string>) => {
            if (action.payload == "Most Popular") {

            }
            else if (action.payload == "Best Rating") {

            }
            else if (action.payload == "Newest") {

            }
            else if (action.payload == "Price: Low to High") {

            }
            else if (action.payload == "Price: High to Low") {
                
            }
        }
    }
})

export const { AddListProduct, AddFilterProduct} = ProductRedux.actions;

export default ProductRedux.reducer;