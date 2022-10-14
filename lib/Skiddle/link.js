const baseURL = "https://www.skiddle.com/api/v1/events/search";
const url = new URL(baseURL);

url.searchParams.set("limit", "100");
url.searchParams.set("offset", "0");
url.searchParams.set("radius", "30");
url.searchParams.set("date", "" + new Date().toISOString().split(".")[0]);
url.searchParams.set("keyword", "party");
url.searchParams.set("hidecancelled", "1");
url.searchParams.set("pub_key", "42f25");
url.searchParams.set("platform", "web");
url.searchParams.set("order", "date");

export default url;
