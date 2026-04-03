import axios from "axios";

export const getToken = (): string => {
  const userString = sessionStorage.getItem("user");
  if (!userString) return "";

  try {
    const data = JSON.parse(userString);
    
    return data.token ?? "";
  } catch {
    return "";
  }
};

export const getId = (): string => {
  const userString = sessionStorage.getItem("user");
  if (!userString) return "";

  try {
    const data = JSON.parse(userString);
    
    return data.id ?? "";
  } catch {
    return "";
  }
};