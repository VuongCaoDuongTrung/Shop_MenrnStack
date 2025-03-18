import React, { Fragment, useState, useContext } from "react";
import { loginReq } from "./fetchApi";
import { LayoutContext } from "../index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS

const Login = (props) => {
  const { data: layoutData, dispatch: layoutDispatch } = useContext(
    LayoutContext
  );

  const [data, setData] = useState({
    email: "",
    password: "",
    showPassword: false,
    error: false,
    loading: false,
  });

  const notifySuccess = () => {
    toast.success("✅ Bạn đã đăng nhập thành công!", {
      position: "top-right",
      autoClose: 3000, // 3 giây
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  const notifyError = (message) => {
    toast.error(`❌ ${message}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  const formSubmit = async () => {
    setData({ ...data, loading: true });
    try {
      let responseData = await loginReq({
        email: data.email,
        password: data.password,
      });

      if (responseData.error) {
        setData({
          ...data,
          loading: false,
          error: responseData.error,
          password: "",
        });
        notifyError(responseData.error);
      } else if (responseData.token) {
        setData({ email: "", password: "", loading: false, error: false });
        localStorage.setItem("jwt", JSON.stringify(responseData));
        notifySuccess();
        setTimeout(() => {
          window.location.href = "/";
        }, 1500); // Chờ 2 giây rồi chuyển trang
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <ToastContainer /> {/* Thanh thông báo Toast */}
      <div className="text-center text-2xl mb-6">Login</div>
      {layoutData.loginSignupError && (
        <div className="bg-red-200 py-2 px-4 rounded">
          Bạn cần đăng nhập để thanh toán. Chưa có tài khoản? Tạo mới.
        </div>
      )}
      <form className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name">
            Tên đăng nhập hoặc email
            <span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={(e) => {
              setData({ ...data, email: e.target.value, error: false });
              layoutDispatch({ type: "loginSignupError", payload: false });
            }}
            value={data.email}
            type="text"
            id="name"
            className="px-4 py-2 border focus:outline-none"
          />
        </div>

        {/* Mật khẩu với nút hiển thị 👁️ */}
        <div className="flex flex-col">
          <label htmlFor="password">
            Mật khẩu<span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <div className="relative">
            <input
              onChange={(e) => {
                setData({ ...data, password: e.target.value, error: false });
                layoutDispatch({ type: "loginSignupError", payload: false });
              }}
              value={data.password}
              type={data.showPassword ? "text" : "password"} // 👁️ Toggle type
              id="password"
              className="px-4 py-2 border w-full pr-10 focus:outline-none"
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer "
              onClick={() =>
                setData({ ...data, showPassword: !data.showPassword })
              }
            >
              {data.showPassword ? "🙈" : "👁️"}
            </span>
          </div>
        </div>

        <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:items-center">
          <div>
            <input type="checkbox" id="rememberMe" className="mr-1" />
            <label htmlFor="rememberMe">
              Ghi nhớ<span className="text-sm text-gray-600">*</span>
            </label>
          </div>
          <a className="text-gray-600" href="/">
            Quên mật khẩu?
          </a>
        </div>

        <div
          onClick={() => formSubmit()}
          className="font-medium px-4 py-2 text-white text-center cursor-pointer bg-gray-800"
        >
          Đăng nhập
        </div>
      </form>
    </Fragment>
  );
};

export default Login;
