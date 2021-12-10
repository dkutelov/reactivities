import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

// interface Props {
//   openForm: () => void;
// }

export default function NavBar() {
  const { activityStore } = useStore();
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
              onClick={() => activityStore.openForm()}
              style={{ backgroundColor: "#F43B86", color: "#fff" }}
              content="Create Activity"
            />
          </Menu.Item>
        </Container>
      </Menu>
    </div>
  );
}
