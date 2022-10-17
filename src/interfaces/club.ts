export default interface IClub {
  id: string;
  link: string;
  largeimageurl: string;
  startdate: string;
  date: string;
  eventname: string;
  description: string;
  openingtimes: {
    doorsopen: string;
    doorsclose: string;
  };
  entryprice: string;
  artists: [];
  venue: {
    type: string;
    name: string;
    town: string;
    address: string;
    postcode: string;
    rating: string;
    latitude: string;
    longitude: string;
  };
  minage: number | number;
}
