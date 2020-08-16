import React from 'react';
import { Card } from 'react-bootstrap';

const UserInfo = ({ user }) => {
  return (
    <Card>
      <Card.Img src={user.avatar_url.replace('large', 't200x200')} />
      <Card.Body>
        <Card.Title>{user.username}</Card.Title>
        <Card.Text>
          {user.description}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default UserInfo;
