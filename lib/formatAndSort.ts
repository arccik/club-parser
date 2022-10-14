import compareAsc from "date-fns/compareAsc";
import formatDistance from "date-fns/formatDistance";
import IEvent from "../interfaces/event";

export default async (data: any) => {
  const json = data.sort((a: IEvent, b: IEvent): Date | number =>
    compareAsc(new Date(a.startdate), new Date(b.startdate))
  );
  return json.forEach((club: IEvent, i: number) => {
    club.date = formatDistance(new Date(club.startdate), new Date(), {
      addSuffix: true,
    });
  });
};
