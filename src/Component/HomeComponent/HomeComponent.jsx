import { Carousel, Col, Row, Tab, Tabs } from "react-bootstrap";
import MutiCarouselComponent from "../MutiCarouselComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "../../../public/style.css";
import ItemComponent from "../ItemComponent";
import { useContext, useEffect } from "react";
import { Context } from "../../utils/AppContext";

function HomeComponent() {
  const { Dataproduct} = useContext(Context);
  const navigate = useNavigate();
  const redirectAboutUS = () => {
    navigate("/deploy-react-js/product");
  };
  useEffect(() => {
    document.title = "Home watches";
  }, []);

  return (
    <>
      <div className="HomeComponent">
        {/* carousel-introdu */}
        <Carousel data-bs-theme="dark" indicators={false}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/slide-bg-1.jpg"
              alt="First slide"
            />
            <Carousel.Caption className="content-carousel">
              <h4>Mona Watch</h4>
              <p>Đồng hồ Classico</p>
              <button className="button-carousel" onClick={redirectAboutUS}>
                XEM SẢN PHẨM
              </button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/slide-bg-2.jpg"
              alt="Second slide"
            />
            <Carousel.Caption className="content-carousel">
              <h4>Mona Watch</h4>
              <p>Bộ Sưu Tập Đồng Hồ Mới Nhất</p>
              <button className="button-carousel" onClick={redirectAboutUS}>
                XEM SẢN PHẨM
              </button>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        {/* banner */}
        <div className="banner">
          <Row>
            <Col md={6}>
              <div className="image-banner" onClick={redirectAboutUS}>
                <img
                  src="https://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/trend-1.jpg"
                  alt="banner1"
                />
                <div className="content-banner">
                  <h3>Xu hướng 2023</h3>
                  <h1>ĐỒNG HỒ NAM</h1>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="image-banner" onClick={redirectAboutUS}>
                <img
                  className="w-100 d-block"
                  src="https://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/trend-2.jpg"
                  alt="banner2"
                />
                <div className="content-banner">
                  <h3>Xu hướng 2023</h3>
                  <h1>ĐỒNG HỒ NỮ</h1>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* muti carousel */}

        <MutiCarouselComponent />

        {/* banner2 */}
        <div className="banner2">
          <Row>
            <Col md={6}>
              <div className="image-banner2">
                <img
                  src="https://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/banner-03.jpg"
                  alt="banner3"
                />
                <div className="content-banner2">
                  <h2>CỔ ĐIỂN</h2>
                  <h4>Đa dạng về phong cách, kiểu dáng, màu sắc, kích cỡ…</h4>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="image-banner2">
                <img
                  className="w-100 d-block"
                  src="https://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/banner-04.jpg"
                  alt="banner4"
                />
                <div className="content-banner3">
                  <h2>SMART WATCH</h2>
                  <h4>Đa dạng về phong cách, kiểu dáng, màu sắc, kích cỡ…</h4>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* tab-product */}
        <div className="Tab-product">
          <Tabs
            defaultActiveKey="Popular"
            transition={false}
            id="noanim-tab-example"
            className="mb-3"
            style={{ border: "none", fontSize: "22px", fontWeight: "bold" }}
          >
            <Tab eventKey="Popular" title="Sản Phẩm Phổ Biến">
              <Row>
                {Dataproduct.map((value) =>
                  value.product.map(
                    (value, key) =>
                      value.popular == "popular" && (
                        <Col sm={6} md={6} lg={4} key={key}>
                          <ItemComponent value={value} />
                        </Col>
                      )
                  )
                )}
              </Row>
            </Tab>
            <Tab eventKey="BestSeller" title="Sản Phẩm Khuyến Mãi">
              <Row>
                {Dataproduct.map((value) =>
                  value.product.map(
                    (value, key) =>
                      value.salecost && (
                        <Col sm={6} md={6} lg={4} key={key}>
                          <ItemComponent value={value} />
                        </Col>
                      )
                  )
                )}
              </Row>
            </Tab>
            <Tab eventKey="New" title="Sản Phẩm Mới">
              <Row>
                {Dataproduct.map((value) =>
                  value.product.map(
                    (value, key) =>
                      value.new == "new" && (
                        <Col sm={6} md={6} lg={4} key={key}>
                          <ItemComponent value={value} />
                        </Col>
                      )
                  )
                )}
              </Row>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default HomeComponent;
