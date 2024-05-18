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

// Hàm so sánh để sắp xếp theo số lượng mua hàng giảm dần
const compareByBuyCount = (a: ProductType, b: ProductType) => {
    return b.buyCount - a.buyCount;
  };
  
  // Hàm so sánh để sắp xếp theo xếp hạng tốt nhất giảm dần
  const compareByRating = (a: ProductType, b: ProductType) => {
    return b.rating - a.rating;
  };
  
  // Hàm so sánh để sắp xếp theo ngày tạo mới nhất
  const compareByNewest = (a: ProductType, b: ProductType) => {
    return b.createdAt.getTime() - a.createdAt.getTime();
  };
  
  // Hàm so sánh để sắp xếp theo giá tăng dần
  const compareByPriceLowToHigh = (a: ProductType, b: ProductType) => {
    return a.price - b.price;
  };
  
  // Hàm so sánh để sắp xếp theo giá giảm dần
  const compareByPriceHighToLow = (a: ProductType, b: ProductType) => {
    return b.price - a.price;
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