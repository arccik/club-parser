import compareAsc from "date-fns/compareAsc";
import formatDistance from "date-fns/formatDistance";
import IEvent from "../interfaces/event";

export default async (data: any) => {
  const json = data.sort((a: IEvent, b: IEvent): Date | number =>
    compareAsc(new Date(a.date), new Date(b.date))
  );
  return json.forEach((club: IEvent, i: number) => {
    club.date = formatDistance(new Date(club.date), new Date(), {
      addSuffix: true,
    });
  });
};
