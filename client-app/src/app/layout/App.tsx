import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Container } from "semantic-ui-react";

import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/activities/*" element={<Activities />} />
      </Routes>
    </>
  );

  function Activities() {
    // different key will re-render ActivityForm to clear of fill data according to route
    const location = useLocation();

    return (
      <>
        <NavBar />
        <Container style={{ marginTop: "7em" }}>
          <Routes>
            <Route path="/" element={<ActivityDashboard />} />
            <Route path="/:id" element={<ActivityDetails />} />
            <Route
              path={"/create-activity"}
              element={<ActivityForm key={location.key} />}
            />
            <Route
              path={"/manage/:id"}
              element={<ActivityForm key={location.key} />}
            />
          </Routes>
        </Container>
      </>
    );
  }
}

export default observer(App);
