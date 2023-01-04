import { useState } from "react";

const useCookie = (key, value) => {
  const [cookie, setCookieData] = useState(getCookie(location));

  const setCookie = (cname, cvalue, exMinutes) => {
    const d = new Date();
    // d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    d.setTime(d.getTime() + exMinutes * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  };
  const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };

  return [cookie, setCookie, getCookie];
};

export default useCookie;

export function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function setCookie(cname, cvalue, exMinutes) {
  const d = new Date();
  // d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  d.setTime(d.getTime() + exMinutes * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
