import { Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../../public/product.css";
import "react-toastify/dist/ReactToastify.css";
import ItemComponent from "../ItemComponent";
import { useEffect, useState } from "react";

function ProductComponent() {
  const [Dataproduct, setDataproduct] = useState([]);
  const [priceFilter, setPriceFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [watchFaceFilter, setWatchFaceFilter] = useState("all");
  const [strapMaterialFilter, setStrapMaterialFilter] = useState("all");
  const [waterResistanceFilter, setWaterResistanceFilter] = useState("all");
  const [brandwatch, setbrandwatch] = useState("all");
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    fetch("https://657849fff08799dc8044ce22.mockapi.io/ProductFillter")
      .then((data) => {
        return data.json();
      })
      .then((result) => {
        setDataproduct(result);
      });
  }, []);
  const applySortOption = (products) => {
    switch (sortOption) {
      case "price-asc":
        // Logic sắp xếp theo giá thấp đến cao
        return [...products].sort((a, b) => {
          const discountedPriceA = a.salecost
            ? a.price - a.price * (a.salecost / 100)
            : a.price;
          const discountedPriceB = b.salecost
            ? b.price - b.price * (b.salecost / 100)
            : b.price;
          return discountedPriceA - discountedPriceB;
        });
      case "price-desc":
        // Logic sắp xếp theo giá cao xuống thấp
        return [...products].sort((a, b) => {
          const discountedPriceA = a.salecost
            ? a.price - a.price * (a.salecost / 100)
            : a.price;
          const discountedPriceB = b.salecost
            ? b.price - b.price * (b.salecost / 100)
            : b.price;
          return discountedPriceB - discountedPriceA;
        });
        case "rank-product":
          return [...products].sort((a, b) => {return b.rank - a.rank})
      default:
        // Mặc định là không sắp xếp
        return products;
    }
  };

  const [minPrice, maxPrice] = priceFilter
    .split("-")
    .map((value) => parseInt(value));

  const filteredProducts = Dataproduct.map((value) => {
    const filtered = applySortOption(
      value.product.filter((product) => {
        const discountedPrice = product.salecost
          ? product.price - product.price * (product.salecost / 100)
          : product.price;

        return (
          (priceFilter === "all" ||
            (discountedPrice >= minPrice && discountedPrice <= maxPrice)) &&
          (genderFilter === "all" || product.genre === genderFilter) &&
          (brandwatch === "all" || product.rand_product === brandwatch) &&
          (watchFaceFilter === "all" ||
            product.dial_diameter === watchFaceFilter) &&
          (strapMaterialFilter === "all" ||
            product.strap === strapMaterialFilter) &&
          (waterResistanceFilter === "all" ||
            product.Waterproof === waterResistanceFilter)
        );
      })
    );

    return filtered.length > 0 ? (
      filtered.map((product, key) => (
        <Col sm={6} md={6} lg={4} key={key}>
          <ItemComponent value={product} />
        </Col>
      ))
    ) : (
      <div className="result-search" key={"not_found"}>
        <h2>Không tìm thấy sản phẩm</h2>
      </div>
    );
  });

  return (
    <>
      <div className="box-product ">
        <div className="navbar-product ">
          <div className="back-home">
            <ul className="m-0 p-0">
              <li>
                <Link to={"/"} style={{ textDecoration: "none" }}>
                  TRANG CHỦ
                </Link>
                <span className="mx-2">/</span>SẢN PHẨM
              </li>
            </ul>
          </div>

          <div className="filter-product">
            <p className="m-0 me-2" style={{ fontSize: "20px" }}>
              Hiển thị một kết quả duy nhất
            </p>
            <div className="select-fillter">
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="default">Mặc Định</option>
                <option value="rank-product">
                  Xếp Hạng
                </option>
                <option value="price-asc">Gía Thấp Đến Cao</option>
                <option value="price-desc">
                  Gía Cao Đến Thấp
                </option>
              </Form.Select>
            </div>
          </div>
        </div>
        <div className="content-product">
          <div className="fillter">
            <select
              aria-label="Default select example"
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="all">Gía Tiền</option>
              <option value="0-1000000">Dưới 1 Triệu</option>
              <option value="1000000-3000000">1-3 Triệu</option>
              <option value="3000000-6000000">3-6 Triệu</option>
              <option value="6000000-20000000">6-20 Triệu</option>
              <option value="20000000-500000000">20-50 Triệu</option>
            </select>
          </div>
          <div className="fillter">
            <select
              aria-label="Default select example"
              onChange={(e) => setbrandwatch(e.target.value)}
            >
              <option value="all">Thương Hiệu</option>
              <option value="ORIENT">ORIENT</option>
              <option value="MOVADO">MOVADO</option>
              <option value="FREDERIQUE">FREDERIQUE</option>
              <option value="MICHAEL KORS">MICHAEL KORS</option>
              <option value="LONGINES">LONGINES</option>
              <option value="TISSOT">TISSOT</option>
            </select>
          </div>
          <div className="fillter">
            <select
              aria-label="Default select example"
              onChange={(e) => setGenderFilter(e.target.value)}
            >
              <option value="all">Giới Tính</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>
          <div className="fillter">
            <select
              aria-label="Default select example"
              onChange={(e) => setWatchFaceFilter(e.target.value)}
            >
              <option value="all">Kích Thước Mặt Số</option>
              <option value="26 mm">26 mm</option>
              <option value="28 mm">28 mm</option>
              <option value="30 mm">30 mm</option>
              <option value="38 mm">38 mm</option>
              <option value="40 mm">40 mm</option>
              <option value="44 mm">44 mm</option>
            </select>
          </div>
          <div
            className="fillter"
            onChange={(e) => setStrapMaterialFilter(e.target.value)}
          >
            <select aria-label="Default select example">
              <option value="all">Chất Liệu Dây</option>
              <option value="Dây Da">Dây Da</option>
              <option value="Dây Kim Loại">Dây Kim Loại</option>
              <option value="Dây Cao Su">Dây Cao Su</option>
              <option value="Dây Vải">Dây Vải</option>
            </select>
          </div>
          <div className="fillter">
            <select
              aria-label="Default select example"
              onChange={(e) => setWaterResistanceFilter(e.target.value)}
            >
              <option value="all">Mức Chống Nước</option>
              <option value="Đi Mưa Nhỏ (3ATM)">Đi Mưa Nhỏ (3ATM)</option>
              <option value="Đi Tắm (5 ATM)">Đi Tắm (5 ATM)</option>
              <option value="Đi Bơi (10 ATM)">Đi Bơi (10 ATM)</option>
              <option value="Lặn Biển (20 ATM)">Lặn Biển (20 ATM)</option>
              <option value="Lặn Sâu (30 ATM)">Lặn Sâu (30ATM)</option>
            </select>
          </div>
        </div>
        <div className="buyproduct">
          <Row>{filteredProducts}</Row>
        </div>
      </div>
    </>
  );
}

export default ProductComponent;
