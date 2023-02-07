import Auth from "./components/Auth";
import Counter from "./components/Counter";
import Header from "./components/Header";
import UserProfile from "./components/UserProfile";
import { useSelector } from "react-redux";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  // console.log(auth);

  return (
    <>
      <Header />
      {!isAuth ? <Auth /> : <UserProfile />}
      <Counter />
    </>
  );
}

export default App;
