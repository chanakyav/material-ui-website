import React from "react";
import useStyles from "./footerStyles";

export function Footer() {
  const classes = useStyles();
  return <footer className={classes.footer}>Example Footer</footer>;
}
