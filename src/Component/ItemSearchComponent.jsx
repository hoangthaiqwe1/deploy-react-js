import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom";
import "../../public/itemsearch.css"
ItemSearchComponent.propTypes = {
  value: PropTypes.object,
  searchDetail:PropTypes.func,
};
function ItemSearchComponent({value,searchDetail}) {
     const detailproduct = useNavigate();
     const handledetail = (value) => {
       detailproduct("/deploy-react-js/detail/" + value.id, {
         state: { product: value },
       });
       searchDetail("")
     };
     const formatCurrency = (amount) => {
       const formattedAmount = amount.toLocaleString("vi-VN", {
         style: "currency",
         currency: "VND",
       });
       return formattedAmount;
     };

    
    return (
      <>
        <div className="search-product">
          <div
            className="image-search"
            style={{
              margin: "0 auto",
            }}
            onClick={() => handledetail(value)}
          >
            <img src={value.img} alt="" />
          </div>
          <div className="content-search">
            <h6 style={{  fontWeight: "bold" }}>
              {value.title}
            </h6>
            {value.salecost ? (
              <p style={{ fontSize: "16px" }}>
                {formatCurrency(
                  Number(value.price - value.price * (value.salecost / 100))
                )}
              </p>
            ) : (
              <p style={{ fontSize: "16px" }}>
                <span
                  style={{
                    fontSize: "16px",
                    color: "#000",
                  }}
                >
                  {formatCurrency(Number(value.price))}
                </span>
              </p>
            )}
          </div>
        </div>
      </>
    );
}

export default ItemSearchComponent;