import React, { useState, ChangeEvent, SyntheticEvent, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const {
    createActivity,
    updateActivity,
    initialLoading,
    loadActivity,
    loading,
  } = activityStore;
  const { id } = useParams();
  let navigate = useNavigate();

  const [activity, setActivity] = useState({
    id: "",
    title: "",
    category: "",
    descriptiony: "",
    date: "",
    city: "",
    venue: "",
  });

  useEffect(() => {
    if (id)
      loadActivity(id).then((activity) => {
        setActivity(activity!);
      });
  }, [id, loadActivity]);

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setActivity({ ...activity, [name]: value });
  }

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity).then(() => {
        navigate(`/activities/${newActivity.id}`);
      });
    } else {
      updateActivity(activity).then(() => {
        navigate(`/activities/${activity.id}`);
      });
    }
  }

  if (initialLoading) return <LoadingComponent content={"Loading ..."} />;

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={activity.title}
          name="title"
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder="Description"
          value={activity.descriptiony}
          name="descriptiony"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Category"
          value={activity.category}
          name="category"
          onChange={handleInputChange}
        />
        <Form.Input
          type="date"
          placeholder="Date"
          value={activity.date}
          name="date"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="City"
          value={activity.city}
          name="city"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Venue"
          value={activity.venue}
          name="venue"
          onChange={handleInputChange}
        />
        <Button
          loading={loading}
          floated="right"
          style={{ backgroundColor: "#3D087B", color: "#fff" }}
          type="submit"
          content="Submit"
        />
        <Button
          as={Link}
          to="/activities"
          style={{ backgroundColor: "#F43B86", color: "#fff" }}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
});
