import { Grid } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import windowBg from "../../images/window.webp";
import leftHand1 from "../../images/hand-paper-rubber-bandsL.png";
import leftHand1B from "../../images/hand-paper-rubber-bands.png";
import leftHand2 from "../../images/hand-scissorsL.png";
import leftHand2B from "../../images/scissors.png";
import leftHand3 from "../../images/hand-rock-rubber-bands1.png";
import leftHand3B from "../../images/hand-rock-rubber-bands.png";
import { observer } from "mobx-react-lite";
import homeState from "../../store/homeState";

const AnimationLeft = observer(() => {

  const initialValues = [
    {
      position: 1,
      foreground: leftHand3,
      background: leftHand3B,
      rotateY: 75,
      translateX: 108,
      translateZ: 90,
      zIndex: 3
    },
    {
      position: 2,
      foreground: leftHand2,
      background: leftHand2B,
      rotateY: 65,
      translateX: 63,
      translateZ: 22,
      zIndex: 2
    },
    {
      position: 3,
      foreground: leftHand1,
      background: leftHand1B,
      rotateY: 45,
      translateX: -50,
      translateZ: 0,
      zIndex: 1
    }
  ];

  const [left, setLeft] = useState([...initialValues]);
  const [store] = useState(homeState);

  useEffect(() => {
    let interval;

    const checkState = () => {
      if (store.selHand !== null && store.changedStatus) {
        clearInterval(interval);
        store.changeChanged(false);
        let newValues;
        if (store.selHand === 0) {
          if (left !== initialValues) setLeft([...initialValues]);
        } else if (store.selHand === 1) {
          newValues = [
            {
              position: 2,
              foreground: leftHand3,
              background: leftHand3B,
              rotateY: 65,
              translateX: 63,
              translateZ: 22,
              zIndex: 2
            },
            {
              position: 3,
              foreground: leftHand2,
              background: leftHand2B,
              rotateY: 45,
              translateX: -50,
              translateZ: 0,
              zIndex: 1
            },
            {
              position: 1,
              foreground: leftHand1,
              background: leftHand1B,
              rotateY: 75,
              translateX: 108,
              translateZ: 90,
              zIndex: 3
            }
          ];
          if (left !== newValues) setLeft([...newValues]);
        } else {
          newValues = [
            {
              position: 3,
              foreground: leftHand3,
              background: leftHand3B,
              rotateY: 45,
              translateX: -50,
              translateZ: 0,
              zIndex: 1
            },
            {
              position: 1,
              foreground: leftHand2,
              background: leftHand2B,
              rotateY: 75,
              translateX: 108,
              translateZ: 90,
              zIndex: 3
            },
            {
              position: 2,
              foreground: leftHand1,
              background: leftHand1B,
              rotateY: 65,
              translateX: 63,
              translateZ: 22,
              zIndex: 2
            }
          ];
          if (left !== newValues) setLeft([...newValues]);
        }
      } else if (store.selHand === null) {
        interval = setInterval(() => {
          const newValues = [...left];
          const lastItem = newValues.pop();
          const firstPosition = newValues[0].position;
          const newPosition = firstPosition === 1 ? 3 : firstPosition - 1;
          lastItem.position = newPosition;
          newValues.unshift(lastItem);
          newValues[0].foreground = initialValues[0].foreground;
          newValues[0].background = initialValues[0].background;
          newValues[1].foreground = initialValues[1].foreground;
          newValues[1].background = initialValues[1].background;
          newValues[2].foreground = initialValues[2].foreground;
          newValues[2].background = initialValues[2].background;
          setLeft([...newValues]);
        }, 3000);
      }
    };

    checkState();
    return () => clearInterval(interval);
  }, [initialValues, store.selHand]);

  return (
    <div className="wrap m-auto">
      <div className="cube" style={{ zIndex: `${left[2].zIndex}`, transform: `rotateY(${left[2].rotateY}deg) translateX(${left[2].translateX}px) translateZ(${left[2].translateZ}px)` }}>
        <div className="front" style={{
          background: left[2].position === 1 ? `url(${windowBg})` : `url(${left[2].background}), url(${windowBg})`,
          filter: left[2].position === 1 ? 'brightness(0.5)' : 'brightness(1)'
        }}></div>
        <div className="back"></div>
        <div className="top"></div>
        <div className="bottom"></div>
        <div className="left"></div>
        <div className="right"></div>
      </div>
      <div className="cube" style={{ zIndex: `${left[1].zIndex}`, transform: `rotateY(${left[1].rotateY}deg) translateX(${left[1].translateX}px) translateZ(${left[1].translateZ}px)` }}>
        <div className="front" style={{
          background: left[1].position === 1 ? `url(${windowBg})` : `url(${left[1].background}), url(${windowBg})`,
          filter: left[1].position === 1 ? 'brightness(0.5)' : 'brightness(1)'
        }}></div>
        <div className="back"></div>
        <div className="top"></div>
        <div className="bottom"></div>
        <div className="left"></div>
        <div className="right"></div>
      </div>
      <div className="cube" style={{ zIndex: `${left[0].zIndex}`, transform: `rotateY(${left[0].rotateY}deg) translateX(${left[0].translateX}px) translateZ(${left[0].translateZ}px)` }}>
        <div className="front" style={{
          background: left[0].position === 1 ? `url(${windowBg})` : `url(${left[0].background}), url(${windowBg})`,
          filter: left[0].position === 1 ? 'brightness(0.5)' : 'brightness(1)'
        }}></div>
        <div className="back"></div>
        <div className="top"></div>
        <div className="bottom"></div>
        <div className="left"></div>
        <div className="right"></div>
      </div>
      <div className="paper" style={{
        background: `url(${left[2].foreground})`,
        opacity: left[2].position === 1 ? '1' : '0'
      }}></div>
      <div className="rock" style={{
        background: `url(${left[1].foreground})`,
        opacity: left[1].position === 1 ? '1' : '0'
      }}></div>
      <div className="scissors" style={{
        background: `url(${left[0].foreground})`,
        opacity: left[0].position === 1 ? '1' : '0'
      }}></div>
    </div>
  )
});

export default AnimationLeft;