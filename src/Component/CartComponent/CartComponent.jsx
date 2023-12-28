import { useContext, useEffect, useState } from "react";
import { Context } from "../../utils/AppContext";
import { Button, Container, Form, Modal } from "react-bootstrap";
import "../../../public/cart.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CartComponent() {
  const { history, sethistory, cartuser, setcartuser } = useContext(Context);
  const [totalPrice, setTotalPrice] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerCity, setCustomerCity] = useState("");
  const [order, setorder] = useState(false);
  const navigate = useNavigate();
  const redirectHome = () => {
    navigate("/");
  };
  useEffect(() => {
    const newTotalPrice = history.reduce(
      (acc, item) =>
        acc +
        (item.salecost
          ? item.quantity * (item.price - item.price * (item.salecost / 100))
          : item.quantity * item.price),
      0
    );

    setTotalPrice(newTotalPrice);
  }, [history]);
  const deleteseenMovie = (id) => {
    if (id > -1) {
      sethistory((h) => h.filter((value, key) => key != id));
      toast.error("Bạn đã xóa sản phẩm khỏi giỏ hàng", {
        position: "top-center",
      });
    }
  };
  const formatCurrency = (amount) => {
    const formattedAmount = amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });

    return formattedAmount;
  };
  const handleIncrement = (id) => {
    const updatedHistory = history.map((item, key) =>
      key === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    sethistory(updatedHistory);
  };
  const handleDecrement = (id) => {
    const updatedHistory = history.map((item, key) =>
      key === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    sethistory(updatedHistory);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(customerName.match(/^[\p{L}\s]{2,20}$/u));
    if (
      customerName == "" ||
      customerPhone == "" ||
      customerEmail == "" ||
      customerAddress == "" ||
      customerCity == ""
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (!customerName.match(/^[\p{L}\s]{2,20}$/u)) {
      toast.error("Tên không hợp lệ, vui lòng kiểm tra lại", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (!customerPhone.match(/^(0|\+84)[3|5|7}8|9][1-9]\d{7}$/)) {
      toast.error("Số điện thoại không hợp lệ, vui lòng kiểm tra lại", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (
      !customerEmail.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ) {
      toast.error("Email không hợp lệ, vui lòng kiểm tra lại", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (document.getElementById("customerShipcode").checked == false) {
      toast.error("Vui lòng chọn phương thức thanh toán", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      const customerInfo = {
        name: customerName,
        phone: customerPhone,
        email: customerEmail,
        address: customerAddress,
        city: customerCity,
        totalPrice: formatCurrency(Number(totalPrice)),
        paymentMethod: getSelectedPaymentMethod(),
      };
      const selectedProducts = history.map((item) => ({
        id: item.id_product,
        title: item.title,
        quantity: item.quantity,
        img: item.img,
        price: item.salecost
          ? formatCurrency(
              Number(item.price - item.price * (item.salecost / 100))
            )
          : formatCurrency(Number(item.price)),
      }));

      setcartuser((current) => [
        ...current,
        {
          ...customerInfo,
          selectedProducts,
        },
      ]);
      const dataToSend = {
        customerInfo,
        selectedProducts,
      };
      await axios.post(
        "https://658035516ae0629a3f54a05c.mockapi.io/user",
        dataToSend
      );

      document.querySelector("#cityvalue").value = "";
      document.querySelector("#addressvalue").value = "";
      document.querySelector("#phonevalue").value = "";
      document.querySelector("#namevalue").value = "";
      document.querySelector("#emailvalue").value = "";
      document.getElementById("customerShipcode").checked = false;
      setorder(true);
      sethistory([]);
    }
  };

  const getSelectedPaymentMethod = () => {
    const shipcodeRadio = document.getElementById("customerShipcode");
    if (shipcodeRadio && shipcodeRadio.checked) {
      return "Thanh toán khi nhận hàng";
    }
  };
  const handlebuyproduct = () => {
    navigate("/product");
    setorder(false);
    setcartuser([]);
  };
  return (
    <>
      <Container fluid>
        <div className="box-cart">
          {history.length > 0 ? (
            history.map((value, key) => (
              <div className="cart" key={key}>
                <div className="image-cart">
                  <img src={value.img} alt={value.name} />
                </div>
                <div className="content-cart">
                  <p>{value.title}</p>
                  <div className="price-cart">
                    <div className="quality-card">
                      <span onClick={() => handleIncrement(key)}>+</span>
                      <input type="text" value={value.quantity} readOnly />
                      <span onClick={() => handleDecrement(key)}>-</span>
                    </div>
                    {value.salecost ? (
                      <h4 style={{ margin: "0", marginLeft: "10px" }}>
                        {formatCurrency(
                          Number(
                            value.quantity *
                              (value.price -
                                value.price * (value.salecost / 100))
                          )
                        )}
                      </h4>
                    ) : (
                      <h4 style={{ margin: "0", marginLeft: "10px" }}>
                        {formatCurrency(Number(value.quantity * value.price))}
                      </h4>
                    )}
                  </div>
                  <button onClick={() => deleteseenMovie(key)}>
                    <i className="fa-solid fa-trash"></i> Xóa
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="cart-message">
              <p>Vui lòng thêm sản phẩm vào giỏ hàng</p>
              <button onClick={redirectHome}>Quay Trở Lại Trang Chủ</button>
            </div>
          )}

          {history.length > 0 && (
            <div className="total-cart">
              <div className="total-first">
                <h5 style={{ color: "#676767" }}>Tạm tính</h5>
                <h5>{formatCurrency(totalPrice)}</h5>
              </div>
              <div className="total-first">
                <h5 style={{ color: "#676767" }}>Tổng</h5>
                <h5 style={{ fontWeight: "bold" }}>
                  {formatCurrency(totalPrice)}
                </h5>
              </div>
            </div>
          )}

          {history.length > 0 && (
            <div className="infor-cart">
              <h4>
                <i className="fa-regular fa-newspaper"></i> Thông tin khách hàng
              </h4>
              <div className="input-cart">
                <input
                  type="text"
                  onChange={(e) => setCustomerName(e.target.value)}
                  id="namevalue"
                  placeholder="Tên Khách Hàng"
                />
                <input
                  type="text"
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  id="phonevalue"
                  placeholder="Số điện thoại"
                />
              </div>
              <input
                type="email"
                onChange={(e) => setCustomerEmail(e.target.value)}
                id="emailvalue"
                placeholder="Email"
              />
              <h4>
                <i className="fa-solid fa-map-location-dot"></i> Thông tin nhận
                hàng
              </h4>
              <h5>Quốc Gia: Việt Nam</h5>
              <h5>Địa chỉ *</h5>
              <input
                type="text"
                onChange={(e) => setCustomerAddress(e.target.value)}
                placeholder="Số nhà - Tên đường - Thường/Xã"
                id="addressvalue"
              />
              <h5>Tỉnh/Thành Phố *</h5>
              <input
                type="text"
                onChange={(e) => setCustomerCity(e.target.value)}
                id="cityvalue"
                placeholder="Tỉnh/Huyện/Thành phố"
              />
              <h4>
                <i className="fa-regular fa-credit-card"></i> Phương Thức Thanh
                Toán
              </h4>
              <Form.Check
                label="Thanh Toán Khi Nhận Hàng"
                name="group1"
                id="customerShipcode"
                type={"radio"}
              />
              <button onClick={onSubmit}>Đặt Hàng</button>
            </div>
          )}
        </div>
        <Modal show={order} size={"lg"}>
          <Modal.Header className="modalpayment">
            <Modal.Title>
              <h4 className="ordersuccess" style={{ margin: "0" }}>
                <i className="fa-solid fa-check"></i> Bạn đã đặt hàng thành công
              </h4>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5 className="thanks">
              Cảm ơn bạn đã lựa chọn dịch vụ của <span>ĐỒNG HỒ MONA</span>
            </h5>
            {cartuser.map((value, key) => (
              <div className="order" key={key}>
                <h3 className="productpaypent">{value.paymentMethod}</h3>
                <p>Người nhận: {value.name}</p>
                <p>Số điện thoại: {value.phone}</p>
                <p>Email: {value.email}</p>
                <p>Địa chỉ: {value.address}</p>
                <p>Thành phố: {value.city}</p>
                <p>Phương thức thanh toán:{value.paymentMethod}</p>
                <p className="ship">Miễn Phí Giao Hàng</p>
                <p>
                  Tổng tiền:{" "}
                  <span className="priceorder">{value.totalPrice}</span>
                </p>
              </div>
            ))}
            <h3 className="productBuyOrder">Sản phẩm đặt mua</h3>
            {cartuser.map((value) =>
              value.selectedProducts.map((item, key) => (
                <div className="productorder" key={key}>
                  <div className="imgorder">
                    <img src={item.img} alt="" />
                  </div>
                  <div className="contentorder">
                    <p>{item.title}</p>
                    <p>Số Lượng: {item.quantity}</p>
                  </div>
                </div>
              ))
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="buttonOrder"
              variant="primary"
              onClick={handlebuyproduct}
            >
              Mua thêm sản phẩm khác
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default CartComponent;
