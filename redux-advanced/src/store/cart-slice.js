import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    // 상태 슬라이스의 구조를 잘 생각해보는 게 중요해보임
    // 상품 항목(배열), 총 수량의 합, 총 가격
    items: [],
    totalQuantity: 0,
    // totalPrice: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      // action에 데이터가 추가되어야 하므로 action 을 매개변수로 받아서 사용
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      // 기존 아이템 유무 여부에 관계없이 총수량은 증가
      state.totalQuantity++;

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

// 액션 생성자 Thunk 사용
// 슬라이스 객체 외부에서 새 함수를 생성하고 장바구니 데이터를 보내는 작업
// 다른 함수인 비동기 함수를 즉시 반환함
// 리덕스 파일의 사용자 지정 작업 크리에이터 함수 내부에서 복잡한 작업의 로직을 작성하고
// 이 함수를 사용할 컴포넌트에서는 그냥 불러와서 사용만 하면 됨(App.js)

// const sendCartData = (cart) => {
export const sendCartData = (cart) => {
  // return { type: '', payload: ...}
  return async (dispatch) => {
    // 수행하려는 실제 작업을 디스패치
    // 디스패치를 호출하기 전에 다른 작업(비동기 코드, 부수효과)을 할 수도 있음(아직 리듀서에 도달하지 않았기 때문)

    // 알림 표시 작업 디스패치
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    // 바로 함수를 만들어서 비동기로 사용할 수도 있음(그 안에서 http 요청을 보냄)
    const sendRequest = async () => {
      const response = await fetch(
        "https://nextjs-course-e6529-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      // 응답이 정상이 아닐 때 에러를 던져서 에러를 만들고 아래에서 catch로 핸들링
      if (!response.ok) {
        throw new Error("Sending cart data failed");
      }
    };

    // 데이터 요청 비동기 함수를 await으로 실행하고 에러 캐치
    try {
      await sendRequest();

      // 응답이 정상적인 경우
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;

export default cartSlice;
