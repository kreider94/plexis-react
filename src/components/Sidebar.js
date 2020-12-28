import React, { useEffect, useState } from "react";
import { Card, Row, Col } from 'react-bootstrap';
import ReactPlayer from "react-player/soundcloud";
import SC from 'soundcloud';
import { BiRefresh } from "react-icons/bi";

const Sidebar = ({ user }) => {
  const [artistTrack, setArtistTrack] = useState();
  const [artistTracks, setArtistTracks] = useState([]);

  useEffect(() => {
    getArtistTrack();
  }, [user])

  useEffect(() => {
    if (artistTracks.length) {
      setTopTrack();
    }
  }, [artistTracks])

  const setTopTrack = () => {
    var top = artistTracks.reduce(function(prev, curr) {
        return prev.favoritings_count < curr.favoritings_count ? prev : curr;
    });
    const track = top.permalink_url;
    setArtistTrack(track);
  }
  
  const refreshArtistTrack = () => {
    if (artistTracks) {
      let tracks = artistTracks.filter((item) => item.permalink_url !== artistTrack);
      setArtistTracks(tracks);
    }
  }

  const getArtistTrack = () => {
    SC.get("/users/" + user.id + "/tracks").then(function(tracks) {
      setArtistTracks(tracks);
    })
  }

  if (user) {
    return (
      <div>
        <Card>
          <Card.Img src={user.avatar_url.replace('large', 't200x200')} />
          <Card.Body>
            <Card.Title>
              <a className="user__title" target="_blank" href={user.permalink_url}>
                {user.username}
                <span className="hover__note hover__note_sc">go to SoundCloud profile</span>
              </a>
            </Card.Title>
            <Card.Text>{user.city}</Card.Text>
          </Card.Body>
          { artistTrack ? <ReactPlayer className="sc__player" url={artistTrack} /> : ''}
        </Card>
        <Row>
          <Col>
            <Row className="refresh" onClick={() => refreshArtistTrack()} style={{height:'40px'}}>
              <Col md={2}>
                <BiRefresh className="refresh__icon" fill="white" size="40px"/>
              </Col>
              <span className="hover__note hover__note_refresh">load new track</span>
            </Row>
          </Col>
        </Row>
      </div>
    )
  } else {
    return null;
  }
}


export default Sidebar;
