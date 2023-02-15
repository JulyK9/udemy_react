import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    // 상태 슬라이스의 구조를 잘 생각해보는 게 중요해보임
    // 상품 항목(배열), 총 수량의 합, 총 가격
    items: [],
    totalQuantity: 0,
    // totalPrice: 0,
    // 장바구니를 교체한 경우에는 변경하지 않지만, 항목을 추가하거나 제거하는 경우엔 변경하는 로직 적용을 위해 상태 속성 추가
    // 이걸 통해서 특정 리듀서가 실행됐을 때만 상태를 바꿔주고, 컴포넌트에서 이 상태값에 따라 분기 처리할 수 있음
    changed: false,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
      // 이 리듀서를 실행할 때는 state.changed가 false로 유지
    },
    addItemToCart(state, action) {
      // action에 데이터가 추가되어야 하므로 action 을 매개변수로 받아서 사용
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      // 기존 아이템 유무 여부에 관계없이 총수량은 증가
      state.totalQuantity++;

      // 장바구니에 항목을 추가하는 경우에는 변경
      state.changed = true;

      // 기존에 없는 아이템인 경우
      if (!existingItem) {
        state.items.push({
          // itemId: newItem.id, 위에서 existingItem을 뽑아낼때 item.id로 기존 아이템을 비교하기 때문에 itemId가 아닌 id로 설정해줘야 함
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          // title: newItem.title,
          name: newItem.title,
        });
      } else {
        // 기존에 있는 아이템인 경우
        existingItem.quantity++; // 수량 증가시키고
        existingItem.totalPrice = existingItem.totalPrice + newItem.price; // 총가격 증가
      }
    },
    removeItemToCart(state, action) {
      // const targetItem = action.payload;
      const id = action.payload;
      // const existingItem = state.items.find(
      //   (item) => item.id === targetItem.id
      // );
      const existingItem = state.items.find((item) => item.id === id);
      // 기존 아이템의 수량에 관계없이 총 수량은 하나씩 줄어듦
      state.totalQuantity--;

      // 장바구니에 항목을 삭제하는 경우에는 변경
      state.changed = true;

      if (existingItem.quantity === 1) {
        // 배열에서 다른 모든 항목을 유지하면서 한 항목을 제거하기 위해 업데이트하는 방법(filter)
        // state.items = state.items.filter((item) => item.id !== targetItem.id);
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
