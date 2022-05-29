export const ADD_TO_CART = "ADD_TO_CART";

export const addToCartAction = (tenKhoaHoc, hinhAnh) => {
  return { type: ADD_TO_CART, tenKhoaHoc, hinhAnh };
};
