import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { read, update } from "../../../functions/product";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextField } from "@mui/material";
import { Input } from "antd";

const FormEditProduct = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    detail: "",
    price: "",
    quantity: "",
    file: null, // Add file field to state
  });
  const [fileold, setFileold] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    loadData(params.id);
  }, []);

  const loadData = async (id) => {
    read(id)
      .then((res) => {
        setData(res.data);
        setFileold(res.data.file);
        setImagePreview("http://localhost:5000/uploads/" + res.data.file); // Set image preview
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    if (e.target.name === "file") {
      setData({
        ...data,
        file: e.target.files[0], // Update file state
      });
      // Update image preview
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const FormWithImageData = new FormData();
    for (const key in data) {
      FormWithImageData.append(key, data[key]);
    }
    FormWithImageData.append("fileold", fileold);
    update(params.id, FormWithImageData)
      .then((res) => {
        navigate("/admin/viewdata");
        toast.success("แก้ไขสินค้าเรียบร้อย", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000, // Close the notification after  seconds
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "60% 40%",
        gap: "5px",
        paddingLeft: "100px",
      }}
    >
      <div>
        <img
          src={
            imagePreview
              ? imagePreview
              : "https://pos-backend-f8yf.onrender.com/uploads/" + data.file
          }
          alt="Product Preview"
          style={{ width: "400px", height: "400px", objectFit: "cover" }}
        />
        <br /> <input type="file" name="file" onChange={handleChange} />
      </div>
      <div style={{ marginTop: "20px" }}>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div style={{ paddingLeft: "10px", marginTop: "10px" }}>
            <div style={{ marginBottom: "10px" }}>
              ชื่อ{" "}
              <Input
                type="text"
                name="name"
                onChange={handleChange}
                placeholder={data.name}
                value={data.name}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              จำนวนสินค้า{" "}
              <Input
                type="text"
                name="quantity"
                placeholder={data.quantity}
                value={data.quantity}
                onChange={handleChange}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              รายละเอียดสินค้า{" "}
              <Input
                type="text"
                name="detail"
                placeholder={data.detail}
                value={data.detail}
                onChange={handleChange}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              ราคาสินค้า{" "}
              <Input
                type="text"
                name="price"
                placeholder={data.price}
                value={data.price}
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            style={{ marginLeft: "10px", marginTop: "10px" }}
            className="btn btn-success"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormEditProduct;
