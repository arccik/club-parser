import { useState, useEffect } from "react";

const useCookie = (cname) => {
  const [cookie, setCookieData] = useState("");

  useEffect(() => {
    if (!cookie) setCookieData(getCookie(cname));
  }, []);

  const setCookie = (cvalue) => {
    const d = new Date();
    d.setTime(d.getTime() + 5 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  };
  const getCookie = () => {
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
