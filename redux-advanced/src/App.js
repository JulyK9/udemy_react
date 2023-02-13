import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";

function App() {
  const toggleCart = useSelector((state) => state.ui.cartIsVisible);

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    const sendCartData = async () => {
      // 요청을 보내기 전에 보류 상태의 메시지 표시
      // 카트 데이터를 보내는 것이 핵심 작업이라 응답 데이터는 크게 중요하지 않음
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data!",
        })
      );
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

      // 응답이 정상적인 경우
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );

      // 이 로직에서 응답 데이터는 크게 사용할 일이 없으므로
      // const responseData = await response.json();
    };

    // 응답이 정상이 아닐 때 catch로 에러 핸들링
    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {toggleCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
