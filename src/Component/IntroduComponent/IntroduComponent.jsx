import { Row, Col } from "react-bootstrap";
import "../../../public/introduce.css";
import { useEffect } from "react";
function IntroduComponent() {
  useEffect(() => {
    document.title = "Introdu Watches";
  }, []);
  return (
    <>
      <div className="introduce">
        <Row>
          <Col md={6}>
            <div className="img-introduce">
              <img
                src="https://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/about-us_bg-1024x737.jpg"
                alt="img-introdu"
              />
            </div>
          </Col>
          <Col md={6} style={{ margin: "auto 0px" }}>
            <div className="title-introduce">
              <h1>Giới thiệu về Watch Mona</h1>
              <p>
                “Cùng với sự phát triển không ngừng của thời trang thế giới, rất
                nhiều thương hiệu cho ra đời những mẫu đồng hồ nam chính hãng đa
                dạng về phong cách, kiểu dáng, màu sắc, kích cỡ… Một chiếc đồng
                hồ nam cao cấp chính hãng khắc họa một giá trị đích thực khi nói
                đến phụ kiện xa xỉ dành cho phái mạnh. Hiện nay, đồng hồ là phụ
                kiện thời trang thiết yếu đối với những người đàn ông hiện đại
                ngày nay. Trên cổ tay của những người đàn ông thành đạt luôn
                dành vị trí cho một chiếc đồng hồ nam cao cấp.”
              </p>
            </div>
          </Col>
        </Row>
      </div>
      <div className="content-introduce">
        <Row>
          <Col>
            <h2 style={{ fontSize: "25px", fontWeight: "bold" ,marginTop:"10px"}}>
              Chào mừng đến với MONA WATCHES
            </h2>
            <p style={{ fontSize: "20px", color: "#676767" }}>
              MONA WATCHES - nơi mang đến cho bạn những chiếc đồng hồ không chỉ
              là công cụ đo giờ mà còn là biểu tượng của phong cách và đẳng cấp.
              Với niềm đam mê sâu sắc đối với nghệ thuật đồng hồ, chúng tôi tự
              hào giới thiệu những sản phẩm chất lượng cao, độc đáo và phản ánh
              đẳng cấp thời trang.
            </p>
          </Col>
        </Row>
        <Row className="mt-1">
          <Col>
            <p style={{ fontSize: "20px", color: "#676767" }}>
              MONA WATCHES không chỉ là một thương hiệu đồng hồ, mà là một biểu
              tượng của sự tinh tế và đẳng cấp. Với sự kết hợp tinh tế giữa
              thiết kế hiện đại và chất lượng vững chắc, mỗi chiếc đồng hồ MONA
              đều là một tác phẩm nghệ thuật độc đáo, thể hiện đẳng cấp và gu
              thẩm mỹ riêng biệt.
            </p>
            <p style={{ fontSize: "20px", color: "#676767" }}>
              Chúng tôi cam kết mang đến cho khách hàng trải nghiệm mua sắm đồng
              hồ trực tuyến tốt nhất. Đồng hồ MONA không chỉ là một phụ kiện
              thời trang, mà còn là người bạn đồng hành đáng tin cậy, theo dõi
              mọi bước chân của bạn trên hành trình đời mình.
            </p>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default IntroduComponent;
