import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Card } from "antd";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Button } from "@mui/material";
import _ from "lodash";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import {
  addToWishList,
  getWishList,
  deleteWishList,
} from "../../functions/user";

const { Meta } = Card;

const ProductCard = ({ data }) => {
  console.log(data);
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [wishlist, setWishlist] = useState();
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  useEffect(() => {
    if (user && user.user.token) {
      loadData();
    }
  }, [user]);
  const loadData = () => {
    if (user && user.user.token) {
      getWishList(user.user.token).then((res) => {
        setWishlist(res.data.wishlist);
      });
    }
  };

  const handleAddToCart = () => {
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({
      ...data,
      count: 1,
    });

    let unique = _.uniqWith(cart, _.isEqual);
    localStorage.setItem("cart", JSON.stringify(unique));

    dispatch({
      type: "ADD_TO_CART",
      payload: unique,
    });
    setIsAddedToCart(true);
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 500); // Change back after 1000 milliseconds (1 second)
  };

  const handleAddToWishList = (e) => {
    if (user && user.user.token) {
      addToWishList(user.user.token, data._id)
        .then((res) => {
          console.log(res.data);
          loadData();
        })
        .catch((err) => console.log(err));
    } else {
      alert("กรุณา login ");
    }
  };
  const handleRemoveWishlist = () => {
    if (user && user.user.token) {
      deleteWishList(user.user.token, data._id)
        .then((res) => {
          console.log(res.data);
          loadData();
        })
        .catch((err) => console.log(err));
    }
  };

  const title = (data) => {
    return (
      <span
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 30px",
          fontSize: "20px",
          fontWeight: "1",
        }}
      >
        {data.name}

        <span>
          {data.price}
          <symbol className="text-primary">&#3647;</symbol>
        </span>
      </span>
    );
  };
  return (
    <div>
      
        <Button variant="text" sx={{ padding: 0 }}>
          <Card
            style={{
              width: 400,
              marginTop: 20,
              marginRight: 5,
            }}
            cover={
              <div style={{ height: 200, overflow: "hidden" }}>
                <img
                  alt={data.name}
                  src={"https://pos-backend-f8yf.onrender.com/" + data.file}
                  style={{ width: "100%", objectFit: "cover" }}
                />
              </div>
            }
            actions={[
              <Link onClick={handleAddToCart}>
                <AddShoppingCartIcon
                  key="gocart"
                  onClick={handleAddToCart}
                  sx={{ color: isAddedToCart ? "green" : "black" }}
                />
              </Link>,

              user.user.token ? (
                wishlist ? (
                  wishlist.some((item) => item._id === data._id) ? (
                    <Link>
                      <HeartFilled
                        className="text-danger"
                        style={{ fontSize: "20px" }}
                        onClick={handleRemoveWishlist}
                      />
                    </Link>
                  ) : (
                    <Link>
                      <HeartOutlined
                        className="text-danger"
                        style={{ fontSize: "20px" }}
                        onClick={handleAddToWishList}
                      />
                    </Link>
                  )
                ) : null
              ) : (
                <Link to={"/login"}>
                  <HeartOutlined
                    className="text-danger"
                    style={{ fontSize: "20px" }}
                  />
                </Link>
              ),
            ]}
          >
            <Meta
              title={<span style={{ color: "black" }}>{title(data)}</span>}
              description={
                <span style={{ color: "black" }}>
                  <div style={{ display: "flex" ,textAlign:"left"}}>
                    <div style={{ flex: "2" }}>{data.detail}</div>
                    <div style={{textAlign:"right"}}>
                      จำนวนคงเหลือ {data.quantity}
                      <br />
                      ขายไปแล้ว {data.sold}
                    </div>
                  </div>
                </span>
              }
            />
          </Card>
        </Button>
  
    </div>
  );
};

export default ProductCard;
