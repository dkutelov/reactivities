import { observer } from "mobx-react-lite";
import React, { Fragment, SyntheticEvent, useState } from "react";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityListItem from "./ActivityListItem";

export default observer(function ActivityList() {
  const [target, setTarget] = useState("");
  const { activityStore } = useStore();
  const { activitiesGroupedByDate, deleteActivity, loading } = activityStore;

  function handleActivityDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  }
  return (
    <>
      {activitiesGroupedByDate.map(([group, activities]) => (
        <Fragment key={group}>
          <Header sub style={{ color: "#F43B86" }}>
            {group}
          </Header>
          {activities.map((activity) => (
            <ActivityListItem
              key={activity.id}
              activity={activity}
              loading={loading}
              target={target}
              handleActivityDelete={handleActivityDelete}
            />
          ))}
        </Fragment>
      ))}
    </>
  );
});
