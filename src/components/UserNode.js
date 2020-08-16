import React, { useState, useEffect } from "react";
import { Circle } from 'react-konva';

const UserNode = ({ user, handleClick, index }) => {
  let timage
  const circleRef = React.useRef();
  const [image, setImage] = useState(null);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  })
  const [radiusIndex, setRadiusIndex] = useState(0);

  useEffect(() => {
    const loadImage = () => {
      timage = new window.Image();
      timage.src = user.avatar_url;
      timage.addEventListener("load", handleLoad);
    }
    const handleLoad = () => {
      setImage(timage);
    }
    loadImage();
  }, [user]);

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
    circleRef.current.to({
      x: getX(dimensions.width),
      y: getY(dimensions.height),
      opacity: 0.6,
      duration: 0.5
    })
    circleRef.current.on('mouseover', () => {
      circleRef.current.to({
        scaleX: 1.2,
        scaleY: 1.2,
        opacity: 1,
        duration: 0.2
      })
    })
    circleRef.current.on('mouseleave', () => {
      circleRef.current.to({
        scaleX: 1,
        scaleY: 1,
        opacity: 0.6,
        duration: 0.2
      })
    })
  })

  useEffect(() => {
    if(index <= 4) {
      setRadiusIndex(0);
    }
    else if(index >= 5 && index < 10) {
      setRadiusIndex(1);
    }
    else if(index >= 10 && index < 15) {
      setRadiusIndex(2);
    }
    else if(index >= 15 && index < 20) {
      setRadiusIndex(3);
    }
    else if(index >= 20 && index < 25) {
      setRadiusIndex(4);
    }
    else if(index >= 25 && index < 30) {
      setRadiusIndex(5);
    }
  }, [index])

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

  const getX = (width) => {
    let radiusArr = [100, 200, 280, 370, 470, 570];
    let angle = (index) * ((Math.PI * 2) / (5+(radiusIndex*2)));
    return ((radiusArr[radiusIndex]) * Math.cos(angle)) + (width/3);
  }

  const getY = (height) => {
    let radiusArr = [100, 200, 280, 370, 470, 570];
    let angle = (index) * ((Math.PI * 2) / (5+(radiusIndex*2)));
    return ((radiusArr[radiusIndex]) * Math.sin(angle)) + (height/2);
  }


  return (
    <Circle
      key={user.id}
      id={user.id}
      x={dimensions.width/2}
      y={dimensions.height/2}
      opacity={0}
      draggable
      radius={50}
      shadowBlur={10}
      shadowOpacity={0.6}
      fillPatternImage={image}
      fillPatternOffset={{x: -50, y: -50}}
      onClick={handleClick}
      ref={circleRef}
      onMouseEnter={e => {
        const container = e.target.getStage().container();
        container.style.cursor = "pointer";
      }}
      onMouseLeave={e => {
        const container = e.target.getStage().container();
        container.style.cursor = "default";
      }}
    />
  );
};

export default UserNode;
