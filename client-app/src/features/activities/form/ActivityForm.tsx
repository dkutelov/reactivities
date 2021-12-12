import React, { useState, ChangeEvent, SyntheticEvent, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import DateInput from "../../../app/common/form/DateInput";
import { Activity } from "../../../app/models/Activity";

export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const {
    createActivity,
    updateActivity,
    initialLoading,
    loadActivity,
    loading,
  } = activityStore;
  const { id } = useParams<{ id: string }>();
  let history = useHistory();

  const [activity, setActivity] = useState<Activity>({
    id: "",
    title: "",
    category: "",
    descriptiony: "",
    date: null,
    city: "",
    venue: "",
  });

  useEffect(() => {
    if (id)
      loadActivity(id).then((activity) => {
        setActivity(activity!);
      });
  }, [id, loadActivity]);

  const validationSchema = Yup.object({
    title: Yup.string().required("The activity title is required!"),
    descriptiony: Yup.string().required(
      "The activity description is required!"
    ),
    category: Yup.string().required(),
    date: Yup.string().required("Date is required").nullable(),
    venue: Yup.string().required(),
    city: Yup.string().required(),
  });

  function handleFormSubmit(activity: Activity) {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity).then(() => {
        history.push(`/activities/${newActivity.id}`);
      });
    } else {
      updateActivity(activity).then(() => {
        history.push(`/activities/${activity.id}`);
      });
    }
  }

  if (initialLoading) return <LoadingComponent content={"Loading ..."} />;

  return (
    <Segment clearing>
      <Header
        content="Activity Details"
        sub
        style={{ marginBottom: 9, color: "rgb(244, 59, 134)" }}
      />
      <Formik
        enableReinitialize //re-builds the form if initial values change
        initialValues={activity}
        onSubmit={(values) => handleFormSubmit(values)}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            {/* Formik needs only name */}
            <TextInput name="title" placeholder="title" />
            <TextArea rows={3} placeholder="Description" name="descriptiony" />
            <SelectInput
              options={categoryOptions}
              placeholder="Category"
              name="category"
            />
            <DateInput
              placeholderText="Date"
              name="date"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            <Header
              content="Location Details"
              sub
              style={{ marginBottom: 9 }}
            />
            <TextInput placeholder="City" name="city" />
            <TextInput placeholder="Venue" name="venue" />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
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
        )}
      </Formik>
    </Segment>
  );
});
