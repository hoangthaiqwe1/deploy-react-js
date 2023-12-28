import {
  faCartShopping,
  faLocationArrow,
  faPhone,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Container, Row, Form } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import "../../public/style.css";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../utils/AppContext";
import { toast } from "react-toastify";
import ItemSearchComponent from "./ItemSearchComponent";

function BaseComponent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchNotFound, setSearchNotFound] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [regiterinformail, setregiterinformail] = useState("");
  const cardSearchRef = useRef(null);
  const { number, history, gmailinfor, setgmailinfor, Dataproduct } =
    useContext(Context);
  //search
  const handleOnChangeSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    // Filter products based on the search term
    const filteredProducts = Dataproduct.flatMap((value) =>
      value.product.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setSearchResults(filteredProducts);
    setSearchNotFound(filteredProducts.length === 0);
  };
  useEffect(() => {
    if (search) {
      const timeout = setTimeout(() => {}, 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [search]);
  //bar dạng movie

  const handleNavbarToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const handleMail = (e) => {
    e.preventDefault();
    if (regiterinformail == "") {
      toast.error("Vui lòng điền đầy đủ thông tin", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (
      !regiterinformail.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ) {
      toast.error("Email không hợp lệ, vui lòng kiểm tra lại", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      if (gmailinfor.some((user) => user.name == regiterinformail)) {
        toast.error("Email đã được đăng ký", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        const userinfor = {
          name: regiterinformail,
        };
        setgmailinfor((curent) => [...curent, userinfor]);
        toast.success("Email đăng ký nhận thông tin thành công", {
          position: toast.POSITION.TOP_CENTER,
        });
        document.querySelector("#email").value = "";
      }
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cardSearchRef.current &&
        !cardSearchRef.current.contains(event.target)
      ) {
       setSearch("");
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []); 
  return (
    <>
      {/* Contact support */}
      <Container fluid>
        <div className="contact">
          <div className="number-gmail d-flex">
            <p className="numberphone m-0 me-4">
              <FontAwesomeIcon icon={faPhone} className="me-1" />
              +84-347389536
            </p>
            <p className="gmail m-0 ">
              <FontAwesomeIcon icon={faLocationArrow} className="me-1" />
              319 - C16 Lý Thường Kiệt, P.15, Q.11, Tp.HCM
            </p>
          </div>
          <div className="login">
            <p className="signup m-0">
              <FontAwesomeIcon icon={faSearch} className="me-2" />
              <Form.Control
                className="search"
                type="Text"
                placeholder="Tên Sản Phẩm..."
                onChange={handleOnChangeSearch}
                value={search}
              />
            </p>
          </div>
        </div>
        {/* Navbar menu */}
        <div className="navbar justify-content-around p-3 ">
          <div className="logo">
            <Link to={"/deploy-react-js/"} style={{ textDecoration: "none" }}>
              <img
                src="https://mauweb.monamedia.net/rolex/wp-content/uploads/2018/12/logo.png"
                alt="Đồng Hồ Hải Triều"
              />
            </Link>
          </div>
          <ul
            className={`subnavbar d-flex justify-content-between m-0 ${
              mobileMenuOpen ? "open" : ""
            }`}
          >
            <li className="menunavbar">
              <Link to={"/deploy-react-js/"} style={{ textDecoration: "none" }}>
                TRANG CHỦ
              </Link>
            </li>
            <li className="menunavbar">
              <Link
                to={"/deploy-react-js/introduce"}
                style={{ textDecoration: "none" }}
              >
                GIỚI THIỆU
              </Link>
            </li>
            <li className="menunavbar">
              <Link
                to={"/deploy-react-js/product"}
                style={{ textDecoration: "none" }}
              >
                SẢN PHẨM
              </Link>
            </li>
            <li className="menunavbar">
              <Link
                to={"/deploy-react-js/contact"}
                style={{ textDecoration: "none" }}
              >
                LIÊN HỆ
              </Link>
            </li>
          </ul>
          <div className="bars">
            <i className="fa-solid fa-bars" onClick={handleNavbarToggle}></i>
            <button className="booking">
              <Link
                to={"/deploy-react-js/cart"}
                style={{
                  textDecoration: "none",
                  color: "#000",
                  fontSize: "19px",
                }}
              >
                GIỎ HÀNG <FontAwesomeIcon icon={faCartShopping} />
              </Link>
              {history.length > 0 ? (
                <div className="product-number">{number}</div>
              ) : (
                ""
              )}
            </button>
          </div>
        </div>
        <div className="search-product">
          <p className="search-item-product m-0">
            <FontAwesomeIcon icon={faSearch} className="me-2" />
            <Form.Control
              className="search1"
              type="Text"
              placeholder="Tên Sản Phẩm..."
              onChange={handleOnChangeSearch}
              value={search}
            />
          </p>
        </div>
        <Outlet />
        {/* footer */}
        <div className="input-infor">
          <Row>
            <Col md={6}>
              <h2 className="tittle-register" style={{ fontWeight: "bold" }}>
                ĐĂNG KÝ NHẬN THÔNG TIN
              </h2>
            </Col>
            <Col md={6}>
              <div className="input">
                <input
                  type="email"
                  id="email"
                  onChange={(e) => setregiterinformail(e.target.value)}
                  placeholder="Email..."
                />
                <button onClick={handleMail}>Đăng ký</button>
              </div>
            </Col>
          </Row>
        </div>
        <div className="box-aboutus">
          <div className="all-about-us">
            <Row>
              <Col xs={12} sm={6} md={6} lg={3}>
                <div className="call-gmail">
                  <h3>LIÊN HỆ CHÚNG TÔI</h3>
                  <p>
                    <i className="fa-solid fa-phone"></i> +6-345-3456-233
                  </p>
                  <h3>ĐỊA CHỈ</h3>
                  <p>
                    <FontAwesomeIcon icon={faLocationArrow} /> 319 - C16 Lý
                    Thường Kiệt, P.15, Q.11, Tp.HCM
                  </p>
                </div>
              </Col>
              <Col xs={12} sm={6} md={6} lg={3}>
                <div className="about-us">
                  <h3>LIÊN KẾT</h3>
                  <ul className="p-0">
                    <li>
                      <a href="">Giới Thiệu</a>
                    </li>
                    <li>
                      <a href="">Đồng Hồ Nam</a>
                    </li>
                    <li>
                      <a href="">Đồng Hồ Nữ</a>
                    </li>
                    <li>
                      <a href="">Liên Hệ</a>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col xs={12} sm={6} md={6} lg={3}>
                <div className="about-us">
                  <h3>HỖ TRỢ</h3>
                  <ul className="p-0">
                    <li>
                      <a href="">Hướng dẫn mua hàng</a>
                    </li>
                    <li>
                      <a href="">Hướng dẫn thanh toán</a>
                    </li>
                    <li>
                      <a href="">Chính sách bảo hành</a>
                    </li>
                    <li>
                      <a href="">Chính sách đổi trả</a>
                    </li>
                    <li>
                      <a href="">Tư vấn khách hàng</a>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col xs={12} sm={4} md={6} lg={3}>
                <div className="pay">
                  <h3>Thanh toán an toàn</h3>
                  <p>
                    Khoản thanh toán được mã hóa và truyền an toàn bằng giao
                    thức SSL.
                  </p>
                  <div className="icon-pay" style={{ marginBottom: "10px" }}>
                    <span style={{ marginRight: "5px" }}>
                      <i className="fa-brands fa-cc-visa"></i>
                    </span>
                    <span style={{ marginRight: "5px" }}>
                      <i className="fa-brands fa-cc-mastercard"></i>
                    </span>
                    <span>
                      <i className="fa-brands fa-cc-jcb"></i>
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="skyhuner">© 2023 MONA WATCHES All Rights Reserved.</div>

        {search.length > 0 && (
          <>
            <div className="background-search"></div>
            <div className="Card-search" ref={cardSearchRef}>
              <Row>
                <h4>Sản phẩm</h4>
                {searchNotFound ? (
                  <p style={{ fontSize: "20px" }}>
                    Không tìm thấy kết quả phù hợp
                  </p>
                ) : (
                  searchResults.map((value, key) => (
                    <Col key={key} sm={4} md={6} lg={4}>
                      <ItemSearchComponent
                        value={value}
                        key={key}
                        searchDetail={setSearch}
                      />
                    </Col>
                  ))
                )}
              </Row>
            </div>
          </>
        )}
      </Container>
    </>
  );
}

export default BaseComponent;
