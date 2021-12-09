import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";

interface Props {
  openForm: () => void;
}

export default function NavBar({ openForm }: Props) {
  return (
    <div>
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item>
            <img
              src="/assets/logo.png"
              alt="logo"
              style={{ marginRight: "10px" }}
            />
            Reactivities
          </Menu.Item>
          <Menu.Item name="Activitie" />
          <Menu.Item>
            <Button
              onClick={openForm}
              style={{ backgroundColor: "#F43B86", color: "#fff" }}
              content="Create Activity"
            />
          </Menu.Item>
        </Container>
      </Menu>
    </div>
  );
}
