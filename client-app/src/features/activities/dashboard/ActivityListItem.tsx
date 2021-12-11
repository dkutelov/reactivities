import React, { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";

interface Props {
  activity: Activity;
  loading: boolean;
  target: string;
  handleActivityDelete: (
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => void;
}

export default function ActivityListItem({
  activity,
  loading,
  target,
  handleActivityDelete,
}: Props) {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.title}
              </Item.Header>
              <Item.Description>Hosted by Bob</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {activity.date}
          <Icon name="marker" /> {activity.venue}
        </span>
      </Segment>
      <Segment secondary>Attendies go here</Segment>
      <Segment clearing>
        <span>{activity.descriptiony}</span>
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          floated="right"
          content="View"
          style={{ backgroundColor: "#3D087B", color: "#fff" }}
        />
      </Segment>
    </Segment.Group>
  );
}

//   <Item key={activity.id}>
//     <Item.Extra>
//       <Button
//         name={activity.id}
//         loading={loading && target === activity.id}
//         onClick={(e) => handleActivityDelete(e, activity.id)}
//         floated="right"
//         content="Delete"
//         style={{ backgroundColor: "#F43B86", color: "#fff" }}
//       />
//       <Label basic content={activity.category} />
//     </Item.Extra>
//   </Item>;
