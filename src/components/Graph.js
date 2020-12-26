import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Layer, Stage, Text, Rect } from 'react-konva';
import SC from 'soundcloud';
import UserNode from './UserNode';

const Graph = ({ user, handleChange, dispatch }) => {

  const [allArtists, setAllArtists] = useState([])
  const [relatedArtists, setRelatedArtists] = useState([]);
  const [hoveredArtist, setHoveredArtist] = useState(null);

  const hoveredStyle = {

  }
  useEffect(() => {
    if (user)
      populateUserProfile()
  }, [user])

  // cache result in browser
  const populateUserProfile = () => {
    SC.get("/users/" + user.id + "/favorites", {
      limit: 200,
      linked_partitioning: 1
    }).then((tracks) => {
      const liked = tracks.collection.map((track) => track.user);
      SC.get("/users/" + user.id + "/followings", {
        limit: 200,
        linked_partitioning: 1
      }).then((users) => {
        const following = users.collection;
        if (following.length && liked.length) {
          const data = getUniqueArtists(following.concat(liked))
          const users = data.filter((item) => {
            return (item.followings_count > 10) && (item.track_count > 0) && (item.followers_count > item.followings_count) && (item.followers_count !== 0)
          });
          let scUsers = users.sort(function(a,b) { return (b.ranking) - (a.ranking) } ).splice(0, 30);
          dispatch({ type: "ADD_SC_USERS", payload: scUsers});
          setAllArtists(scUsers)
        }
      });
    })
  }

  useEffect(() => {
    if (allArtists.length) {
      let relatedArtists = [];
      while (allArtists.length) {
        relatedArtists.push(allArtists.splice(0, allArtists.length > 24 ? 5 : 10));
      }
      setRelatedArtists(relatedArtists);
    }
  }, [allArtists])

  const getUniqueArtists = (array) => {
    const count = array =>
      array.reduce((a, b) => ({
        ...a,
        [b]: (a[b] || 0) + 1
      }), {})

    var artistsRanking = count(array.map((item) => item.id));

    return array.map((item) => {
      const index = Object.keys(artistsRanking).indexOf(item.id.toString());
      if (index > -1) {
        item.ranking = artistsRanking[item.id];
      }
      return item;
    })
  }

  const handleHover = (artist) => {
    if (artist) {
      setHoveredArtist(artist);
    } else {
      setHoveredArtist(false);
    }
  }

  return (
      relatedArtists ? (
        <Stage width={window.innerWidth} height={window.innerHeight}>
         <Layer>
            {hoveredArtist ? 
              <Text 
                text={hoveredArtist}
                x={window.innerWidth-(window.innerWidth/2)}
                y={100}
                fontSize='34'
                fontFamily='Helvetica Neue'
                fontStyle='bold'
                />
            : null}
            {relatedArtists.map((batch, batchNum) => {
              return batch.map((artist, index) => {
                return <UserNode 
                  userId={artist.id}
                  avatar={artist.avatar_url}
                  username={artist.username}
                  batch={batchNum}
                  batchAmount={batch.length}
                  handleClick={handleChange}
                  handleHover={handleHover}
                  index={index} 
                  key={artist.id}/>;
                })
              })}
          </Layer>
        </Stage>
      ) : null
  )
}

const mapStateToProps = (state) => ({
  user: state.user.user
})

export default connect(mapStateToProps)(Graph);
