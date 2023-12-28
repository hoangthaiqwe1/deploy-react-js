import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../public/style.css";
import "react-toastify/dist/ReactToastify.css";
import ItemComponent from "./ItemComponent";
import { useContext} from "react";
import { Context } from "../utils/AppContext";

function MutiCarouselComponent() {
    const { Dataproduct } = useContext(Context);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 992 },
      items: 3,
      slidesToSlide: 3, // Số lượng slide chuyển động khi nhấn nút next/prev
    },
    tablet: {
      breakpoint: { max: 992, min: 576 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 576, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };
  return (
    <>
      <div className="Carousel-vegetarian">
        <h2 style={{ fontWeight: "700", marginBottom: "20px" }}>
          Sản Phẩm Bán Chạy
        </h2>

        <Carousel
          responsive={responsive}
          draggable={true} // Cho phép kéo Carousel trên thiết bị cảm ứng
          swipeable={true} // Cho phép swipe trên thiết bị cảm ứng
          showDots={true} // Hiển thị các chấm chấm dưới Carousel
          infinite={true} // vong lap lai ko gioi han
          autoPlaySpeed={3000} // thoi gian chuyen cac slide la 3s
          autoPlay={true} //tu dong chuyen slide
          arrows={false}
        >
          {Dataproduct.map((value) =>
            value.product.map(
              (value, key) =>
                value.bestseller === "bestseller" && (
                  <ItemComponent value={value} key={key} />
                )
            )
          )}
        </Carousel>
      </div>
    </>
  );
}

export default MutiCarouselComponent;
