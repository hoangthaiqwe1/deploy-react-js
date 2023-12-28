import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import BaseComponent from "./Component/BaseComponent";
import HomeComponent from "./Component/HomeComponent/HomeComponent";
import IntroduComponent from "./Component/IntroduComponent/IntroduComponent";
import ProductComponent from "./Component/ProductComponent/ProductComponent";
import ContactComponent from "./Component/ContactComponent/ContactComponent";
import NotFoundComponent from "./Component/NotFoundComponent/NotFoundComponent";
import DetailComponent from "./Component/DetailComponent/DetailComponent";
import AppContext from "./utils/AppContext";
import CartComponent from "./Component/CartComponent/CartComponent";
import { ToastContainer} from "react-toastify";
import ScrollToTop from "./Component/ScrolltoTop";

function App() {
  return (
    <>
      <AppContext>
        <ScrollToTop/>
        <Routes>
          <Route path="/" element={<BaseComponent />}>
            <Route index element={<HomeComponent />} />
            <Route path="/introduce" element={<IntroduComponent />} />
            <Route path="/product" element={<ProductComponent />} />
            <Route path="/contact" element={<ContactComponent />} />
            <Route path="/detail/:id" element={<DetailComponent />} />
            <Route path="/cart" element={<CartComponent />} />
            <Route path="*" element={<NotFoundComponent />} />
          </Route>
        </Routes>
      </AppContext>
      <ToastContainer />
    </>
  );
}

export default App;
