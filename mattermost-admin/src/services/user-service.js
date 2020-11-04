import { authHeader } from "../helpers/auth";
import { appConfig } from "../constants/config-app";

export const userService = {
  login,
  logout,
  register,
  update,
  getAdminSession
};

function login(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  };

  return fetch(`${appConfig}/api/v4/users/login`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      // Lưu lại thông tin user trong localStorage
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    });
}

function logout() {
  // Xóa thông tin khi đăng xuất
  localStorage.removeItem("user");
}

// Đăng ký
function register(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(`/users/register`, requestOptions).then(handleResponse);
}

function update(user) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(`/users/${user.id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // Tự động báo đăng xuất khi có lỗi
        logout();
        window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

/**
 * Lấy session của admin 
 */
function getAdminSession() {
  const systemUserInfor = {
    device_id: "",
    login_id: "dinhxuan9807@gmail.com",
    password: "Daihoccongnghe_98",
    token: "",
  };

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(systemUserInfor),
  };

  return fetch(`${appConfig}/api/v4/users/login`, requestOptions)
    .then((response) => response.json())
    .then((data) => data );
}
