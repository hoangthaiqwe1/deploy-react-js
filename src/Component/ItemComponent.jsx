import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom";
import "../../public/style.css";
import "react-multi-carousel/lib/styles.css";
import { useContext } from "react";
import { Context } from "../utils/AppContext";
import { toast } from "react-toastify";

ItemComponent.propTypes={
    value:PropTypes.object,
}
function ItemComponent({value}) {
    const detailproduct = useNavigate();
    const handledetail = (value) => {
      detailproduct("/detail/" + value.id,{state:{product:value}});
    };
    const formatCurrency = (amount) => {
      const formattedAmount = amount.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });

      return formattedAmount;
    };

    const { history, sethistory } = useContext(Context);
    const handleAddCard =(value)=>{
        const isProductExist = history.some(
          (item) => item.id_product === value.id_product
        );
        if (!isProductExist) {
          sethistory((current) => [...current, value]);
           toast.success("Thêm sản phẩm vào giỏ hàng thành công", {
             position: toast.POSITION.TOP_CENTER,
           });
        }
        else{
          const updatedHistory = history.map((item) =>
            item.id_product === value.id_product
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          sethistory(updatedHistory);
          toast.success("Cập nhật giỏ hàng thành công", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
    }
    return (
      <>
        <div className="product">
          <div
            className="image-vegetarian"
            style={{
              margin: "0 auto",
            }}
            onClick={() => handledetail(value)}
          >
            <img src={value.img} alt="" />
            {value.salecost ? (
              <p className="sale-cost">{value.salecost}%</p>
            ) : (
              ""
            )}
          </div>
          <div className="content-vegetarian">
            <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>
              {value.name}
            </h3>
            {value.salecost ? (
              <p style={{ fontSize: "18px" }}>
                <span
                  style={{
                    fontSize: "18px",
                    textDecoration: "line-through",
                    color: "#ccc",
                    marginRight: "10px",
                  }}
                >
                  {formatCurrency(Number(value.price))}
                </span>
                {formatCurrency(
                  Number(value.price - value.price * (value.salecost / 100))
                )}
              </p>
            ) : (
              <p style={{ fontSize: "18px" }}>
                <span
                  style={{
                    fontSize: "18px",
                    color: "#000",
                  }}
                >
                  {formatCurrency(Number(value.price))}
                </span>
              </p>
            )}
            <button className="button-product" onClick={()=>handleAddCard(value)}>
              THÊM VÀO GIỎ
            </button>
          </div>
        </div>
        
      </>
    );
}

export default ItemComponent;