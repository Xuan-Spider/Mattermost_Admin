import * as Types from "../constants/action-type";
import callApi, { callApiLogin } from "../ultils/apiCaller";
import ToastServive from "react-material-toast";
const toast = ToastServive.new({
  place: "topRight",
  duration: 1,
  maxCount: 8,
});


// Hàm xử lý login
export const actCallApiSignIn = (user) => {

  return (dispatch) => {
    return callApi("api/v4/users/login", "POST", user).then((data) => {
      if(data && data.headers && data.headers.token) {
        localStorage.setItem("token", data.headers.token);
      }
      if (data && data.data && data.data.roles.includes("system_user")) {
        dispatch(actSignIn(data.data));
      } else {
        toast.error("Tài khoản hoặc mật khẩu không chính xác!");
      }
    })
  };
};

// hành động sigin
export const actSignIn = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
  return {
    type: Types.SIGNIN,
    user,
  };
};

// action gọi service đăng ký
export const actCallApiSignUp = (user) => {
  const admin = {
    login_id: "dinhxuan9807@gmail.com",
    password: "Daihoccongnghe_98",
    token: "",
  };
  return (dispatch) => {
    return callApi("api/v4/users/login", "POST", admin).then((data) => {
      const adminToken =  data.headers.token;
      callApi("api/v4/users", "POST", user).then(res => {
        if (res.status === 201) {
          console.log(res);
          // update role

          updateRole(res.data.id, adminToken);

          toast.success("Đăng ký thành công");
          dispatch(actSignUp(res.data));
        } else {
            toast.error("Email đã tồn tại !");
        }
      }).catch(res => {
        toast.error("Email đã tồn tại !");
      });
    });
  };
};


/**
 * Hàm xử lý update role 
 * @param {} userId 
 * @param {*} token 
 */
export const updateRole = (userId, token) => {

  const adminRole = {
      "roles": "system_admin system_user"
  }
  callApiLogin(`api/v4/users/${userId}/roles`, 'PUT', adminRole, token).then(data => {
    console.log(data);
  })
}

// action thực hiện trả về đăng ký thành công hay thất bại
export const actSignUp = (user) => {
  return {
    type: Types.SIGNUP,
    user,
  };
};

// Xử lý logout
export const actLogout = () => {
  localStorage.clear();
  return { type: Types.LOGOUT };
};
