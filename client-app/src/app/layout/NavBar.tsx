import React from "react";
import { NavLink } from "react-router-dom";

import { Button, Container, Menu } from "semantic-ui-react";
//import { useStore } from "../stores/store";

export default function NavBar() {
  //const { activityStore } = useStore();
  return (
    <div>
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={NavLink} exact to="/" header>
            <img
              src="/assets/logo.png"
              alt="logo"
              style={{ marginRight: "10px" }}
            />
            Reactivities
          </Menu.Item>
          <Menu.Item as={NavLink} to="/activities" name="Activities" />
          <Menu.Item as={NavLink} to="/errors" name="Errors" />
          <Menu.Item>
            <Button
              as={NavLink}
              to="/create-activity"
              style={{ backgroundColor: "#F43B86", color: "#fff" }}
              content="Create Activity"
            />
          </Menu.Item>
        </Container>
      </Menu>
    </div>
  );
}
