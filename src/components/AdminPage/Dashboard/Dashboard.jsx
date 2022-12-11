import styles from "./styles.module.css";
import { useState } from "react";
import { useGetDocumentsCountQuery } from "../../../features/event/eventSlice";

const Dashboard = () => {
  const { data: venueData, isLoading: venuesLoading } =
    useGetDocumentsCountQuery("venues");
  const { data: eventData, isLoading: eventsLoading } =
    useGetDocumentsCountQuery("events");
  const [state, setState] = useState();
  if (venuesLoading || eventsLoading) return <p>Loading...</p>;
  return (
    <>
      <div
        className={state ? styles.details : ""}
        onClick={() => setState((prev) => !prev)}
      >
        <div className={styles.card}>
          <div className={styles.photo}></div>
          <div className={styles.chart}>
            <div className={[styles.bar, styles.bar1].join(" ")}>
              <span>{venueData.totalCount}</span>
            </div>
            <div className={[styles.bar, styles.bar2].join(" ")}>
              <span>{eventData.totalCount}</span>
            </div>
            {/* <div className={[styles.bar, styles.bar3].join(" ")}>
              <span>15,000</span>
            </div> */}
          </div>
          <h3>{venueData.totalCount + eventData.totalCount}</h3>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
