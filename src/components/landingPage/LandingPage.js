import React from "react";
import Lottie from "react-lottie";

import animationData from "../../animations/landinganimation/data";
import useStyles from "./landingPageStyles";

export function LandingPage() {
  const classes = useStyles();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie options={defaultOptions} height={"100%"} width={"100%"} />;
}
