import React, { useEffect } from "react";
import ShopBanner from "../ShopPage/ShopBanner";
import "./CheckoutPage.css";

import { useDispatch, useSelector } from "react-redux";
// import productApi from "../../api/productApi";
import { getProduct } from "../../redux/productCartSlice";
import payment6 from "../../assets/image/payment-6.png";
import payment7 from "../../assets/image/payment-7.png";
import payment9 from "../../assets/image/payment-9.png";
import formatMoney from "../../utils/utils";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useField, useFormik } from "formik";
import * as Yup from "yup";

const CheckoutPage = () => {
  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      phone: "",
      address: "",
      note: "",
    },
    validationSchema: Yup.object({
      fullname: Yup.string()
        .required("Chua nhap fullname")
        .min(6, "Khong duoc it hon 6 ki tu"),
      email: Yup.string()
        .required("Chua nhap email")
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "email chua dung dinh dang"
        ),
      phone: Yup.string()
        .required("Chua nhap phone")
        .min(6, "Khong duoc it hon 6 ki tu"),
      address: Yup.string()
        .required("Chua nhap address")
        .min(6, "Khong duoc it hon 6 ki tu"),
      note: Yup.string()
        .required("Chua nhap note")
        .min(6, "Khong duoc it hon 6 ki tu"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  console.log(formik.errors.fullname);
  const productCart = useSelector((state) => state.productCart.productCart);
  const dispatch = useDispatch();

  const [priceDiscount, setPriceDiscount] = useState(0);
  const [inputDiscount, setInputDiscount] = useState("");
  const [codeDiscount, setCodeDiscount] = useState({
    GIAM10: 10,
    GIAM20: 20,
    GIAM30: 30,
    GIAM40: 40,
  });

  const handleDiscount = () => {
    if (!inputDiscount) {
      toast.warning("Ch??a nh???p m?? gi???m gi??", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      if (!codeDiscount[inputDiscount]) {
        toast.error("M?? gi???m gi?? ch??a ch??nh x??c", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        setPriceDiscount(
          (totalMoneyProductCart * codeDiscount[inputDiscount]) / 100
        );
        toast.success("S??? d???ng th??nh c??ng m?? gi???m gi??", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  };

  useEffect(() => {
    dispatch(getProduct());
  }, []);

  const totalMoneyProductCart = productCart.reduce((total, p) => {
    return total + p.price * p.count;
  }, 0);

  console.log(formik.touched.fullname);

  return (
    <>
      <ToastContainer />
      <ShopBanner />
      <section className="checkout">
        <div className="container">
          <div className="row flex-wrap-reverse">
            <div className="col-lg-7 col-md-7">
              <form onSubmit={formik.handleSubmit}>
                <div className="checkout-info">
                  <div className="info-ship">
                    <h2>Th??ng tin v???n chuy???n</h2>
                    <p>
                      B???n c?? t??i kho???n ch??a?
                      <Link to="/login">????ng nh???p</Link>
                    </p>
                    <div className="info-ship-input">
                      {/* <!-- <label htmlFor="fullname"></label> --> */}
                      <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        placeholder="T??n ?????y ?????"
                        value={formik.values.fullname}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.fullname && !formik.values.fullname && (
                        <small>{formik.errors.fullname}</small>
                      )}
                    </div>
                    <div className="input-email-phone">
                      <div className="info-ship-input">
                        {/* <!-- <label htmlFor="email"></label> --> */}
                        <input
                          type="text"
                          id="email"
                          name="email"
                          placeholder="Email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.email && !formik.values.email && (
                          <small>{formik.errors.email}</small>
                        )}
                      </div>
                      <div className="info-ship-input">
                        {/* <!-- <label htmlFor="phone"></label> --> */}
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          placeholder="S??? ??i???n tho???i"
                          value={formik.values.phone}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.phone && !formik.values.phone && (
                          <small>{formik.errors.phone}</small>
                        )}
                      </div>
                    </div>
                    <div className="info-ship-input">
                      {/* <!-- <label htmlFor="address"></label> --> */}
                      <input
                        type="text"
                        id="address"
                        name="address"
                        placeholder="?????a ch???"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.address && !formik.values.address && (
                        <small>{formik.errors.address}</small>
                      )}
                    </div>
                    <div className="input-address-detail">
                      <div className="info-ship-input">
                        <select name="province" id="citis">
                          <option value="">T???nh / th??nh</option>
                        </select>
                        <small>Error message</small>
                      </div>
                      <div className="info-ship-input">
                        <select name="province" id="district">
                          <option value="">Qu???n / huy???n</option>
                        </select>
                        <small>Error message</small>
                      </div>
                      <div className="info-ship-input">
                        <select name="province" id="ward">
                          <option value="">X?? / ph?????ng</option>
                        </select>
                        <small>Error message</small>
                      </div>
                    </div>
                    <div className="info-ship-input">
                      {/* <!-- <label htmlFor="note"></label> --> */}
                      <input
                        type="text"
                        id="note"
                        name="note"
                        placeholder="Ghi ch??"
                        value={formik.values.note}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.note && !formik.values.note && (
                        <small>{formik.errors.note}</small>
                      )}
                    </div>
                  </div>
                  <div className="payments">
                    <h2>H??nh th???c thanh to??n</h2>
                    <div className="radio-wrapper">
                      <input type="radio" name="payments" id="payments" />
                      <label htmlFor="payments">
                        <span>Thanh to??n qua VNPAY-QR</span>
                        <img src={payment6} alt="" />
                      </label>
                    </div>
                    <div className="radio-wrapper">
                      <input type="radio" name="payments" id="payments" />
                      <label htmlFor="payments">
                        <span>Thanh to??n qua V?? MoMo</span>
                        <img src={payment7} alt="" />
                      </label>
                    </div>
                    <div className="radio-wrapper">
                      <input
                        type="radio"
                        // checked="checked"
                        name="payments"
                        id="payments"
                      />
                      <label htmlFor="payments">
                        <span> Thanh to??n khi nh???n h??ng (COD)</span>
                        <img src={payment9} alt="" />
                      </label>
                    </div>
                  </div>
                  <div className="confirm">
                    <Link to={`/shop-page`}>Ti???p t???c mua h??ng</Link>
                    <button>
                      <span>Thanh To??n</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="col-lg-5 col-md-5">
              <div className="checkout-order">
                <div className="order-product">
                  <ul className="order-product-list">
                    {productCart.map((product) => (
                      <li key={product.id} className="order-product-item">
                        <div className="order-product-image">
                          <img src={product.image} alt="" />
                          <span className="order-product-number">
                            {product.count}
                          </span>
                        </div>
                        <div className="order-product-content">
                          <h6 className="order-product-name">{product.name}</h6>
                          <p className="order-product-price">
                            {formatMoney(product.price * product.count)}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="order-discount-btn">
                  <input
                    type="text"
                    placeholder="M?? gi???m gi??"
                    value={inputDiscount}
                    onChange={(e) => setInputDiscount(e.target.value)}
                  />
                  <button onClick={handleDiscount}>S??? d???ng</button>
                </div>
                <div className="order-bill">
                  <div className="bill-money bill-subtotal">
                    <span>T???m t??nh</span>
                    <span className="sub-total-money">
                      {formatMoney(totalMoneyProductCart)}
                    </span>
                  </div>
                  <div className="bill-money bill-discount">
                    <span>Gi???m gi??</span>
                    <span className="discount-money">
                      {formatMoney(priceDiscount)}
                    </span>
                  </div>
                  <div className="bill-money bill-total">
                    <span>T???ng ti???n</span>
                    <span className="total-money">
                      {formatMoney(totalMoneyProductCart - priceDiscount)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckoutPage;
