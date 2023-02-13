import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://nextjs-course-e6529-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart(cartData));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed!",
        })
      );
    }
  };
};

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
