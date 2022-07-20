export const setToken = (token) => {
  localStorage.setItem("CS-JWT", token);
};

export const getToken = () => {
  return localStorage.getItem("CS-JWT");
};

export const removeToken = () => {
  return localStorage.removeItem("CS-JWT");
};
