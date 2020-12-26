import React, { useState, useEffect } from "react";
import { Circle, Image } from 'react-konva';
import useImage from 'use-image';
import { Spring, animated } from 'react-spring/renderprops-konva';

const UserNode = ({ userId, avatar, username, batch, batchAmount, handleClick, handleHover, index }) => {
  const circleRef = React.useRef();
  const [hovered, setHovered] = useState(false);
  const [image] = useImage(avatar);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  })
  const [angle, setAngle] = useState(0);


  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }, 200)

    window.addEventListener('resize', debouncedHandleResize)

    return _ =>
      window.removeEventListener('resize', debouncedHandleResize)
  })

  useEffect(() => {
    setAngle((((360/batchAmount) * index) + (batch % 2 === 0 ? (360/batchAmount)/2 : 0)) * (Math.PI / 180))
  }, [index])

  const onMouseEnter = e => {
    const container = e.target.getStage().container();
    container.style.cursor = "pointer";
    setHovered(true);
    handleHover(username);
  }

  const onMouseLeave = e => {
    const container = e.target.getStage().container();
    container.style.cursor = "default";
    setHovered(false);
    handleHover(false);
  }

  const debounce = (fn, ms) => {
    let timer
    return _ => {
      clearTimeout(timer)
      timer = setTimeout(_ => {
        timer = null
        fn.apply(this, arguments)
      }, ms)
    };
  }

  return (
    <Spring
      native
      from={{ opacity: 0.6, shadowEnabled: true }}
      to={{
        opacity: hovered ? 1 : 0.6,
        radius: hovered ? 50 : 40,
        x: ((batch + 1) * 75 * Math.cos(angle)) + (dimensions.width/3),
        y: ((batch + 1) * 75 * Math.sin(angle)) + (dimensions.height/2.5),
        shadowEnabled: hovered ? true : false
      }}
    >
      {props => (
        <animated.Circle
          {...props}
          fillPatternImage={image}
          fillPatternOffset={{x: -50, y: -50}}
          key={userId}
          id={userId}
          image={image}
          onClick={handleClick}
          ref={circleRef}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          />
      )}
    </Spring>
  );
};

export default UserNode;