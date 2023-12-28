import { Col, Row } from "react-bootstrap";
import "../../../public/detail.css";
import { useContext} from "react";
import { Context } from "../../utils/AppContext";
import { toast } from "react-toastify";
import { useLocation} from "react-router-dom";
import MutiCarouselProduct from "../MutiCarouselProduct";

function DetailComponent() {
  const formatCurrency = (amount) => {
    const formattedAmount = amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return formattedAmount;
  };
  const { history, sethistory } = useContext(Context);
  const handleAddCard = (id) => {
    const isProductExist = history.some((item) => item.id_product === id);
    if (!isProductExist) {
      sethistory((current) => [...current, location.state.product]);
      toast.success("Thêm sản phẩm vào giỏ hàng thành công", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      const updatedHistory = history.map((item) =>
        item.id_product === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      sethistory(updatedHistory);
      toast.success("Cập nhật giỏ hàng thành công", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  const location = useLocation();
  return (
    <>
      <div className="box-detail">
        <div className="detail-product">
          <Row>
            <Col md={6} lg={6}>
              <div className="detail-img">
                <img src={location.state.product.img} alt="" />
              </div>
            </Col>
            <Col md={6} lg={6}>
              <div className="content-detail">
                <h3 style={{ fontWeight: "bold", fontSize: "24px" }}>
                  {location.state.product.name}
                </h3>
                <h4 style={{ color: "#676767", fontSize: "20px" }}>
                  {location.state.product.title}
                </h4>
                <p style={{ fontSize: "20px", margin: "0", color: "#676767" }}>
                  Mã số sản phẩm: {location.state.product.seri}
                </p>
                {location.state.product.salecost ? (
                  <p className="detail-price">
                    {formatCurrency(
                      Number(
                        location.state.product.price -
                          location.state.product.price *
                            (location.state.product.salecost / 100)
                      )
                    )}
                  </p>
                ) : (
                  <p className="detail-price">
                    {formatCurrency(Number(location.state.product.price))}
                  </p>
                )}
                <p style={{ fontSize: "17px" }}>
                  {location.state.product.content}
                </p>
                <button
                  onClick={() => handleAddCard(location.state.product.id_product)}
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
            </Col>
          </Row>
        </div>
        <div className="infor-detail">
          <Row>
            <Col md={6} lg={6}>
              <h2>
                <i className="fa-regular fa-newspaper"></i> Thông tin sản Phẩm
              </h2>
              <ul style={{ padding: "0" }}>
                <li>Thương Hiệu: {location.state.product.rand_product}</li>
                <li>Số Hiệu Sản Phẩm: {location.state.product.seri}</li>
                <li>Xuất Xứ: {location.state.product.origin}</li>
                <li>Giới Tính: {location.state.product.genre}</li>
                <li>Kính: {location.state.product.terrible}</li>
                <li>Máy: {location.state.product.machine}</li>
                <li>
                  Đường Kính Mặt Số: {location.state.product.dial_diameter}
                </li>
                <li>Dây Đeo: {location.state.product.strap}</li>
                <li>Màu Mặt Số: {location.state.product.dial_color}</li>
                <li>Chống Nước: {location.state.product.Waterproof}</li>
              </ul>
            </Col>
            <Col md={6} lg={6}>
              <h2>
                <i className="fa-solid fa-layer-group"></i> Chi tiết sản phẩm
              </h2>
              <h4>1. Thiết Kế Sang Trọng và Đa Dạng:</h4>
              <p>{location.state.product.content_Product}</p>
            </Col>
          </Row>
        </div>
        <div className="related-products">
          <h2>Sản Phẩm Liên Quan</h2>
          <MutiCarouselProduct/>
        </div>
      </div>
    </>
  );
}

export default DetailComponent;
