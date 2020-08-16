import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Layer, Stage, Image } from 'react-konva';
import SC from 'soundcloud';
import UserNode from './UserNode';

const Graph = ({ user, handleChange, dispatch }) => {

  const [relatedArtists, setRelatedArtists] = useState()

  useEffect(() => {
    if (user)
      populateUserProfile()
  }, [user])

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
          setRelatedArtists(scUsers)
        }
      });
    })
  }

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

  return (
    relatedArtists ? (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {relatedArtists.map((artist, index) => {
            return <UserNode user={artist} handleClick={handleChange} index={index} key={index}/>;
          })
        }
        </Layer>
      </Stage>
    ) : null
  )
}

const mapStateToProps = (state) => ({
  user: state.user.user
})

export default connect(mapStateToProps)(Graph);
