import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { Link } from "react-router-dom";

import logo from "../../../assets/logo.svg";
import styles from "./stylesOptions";

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = styles;

export default function Header(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleMenuItemClick = (event, index) => {
    setAnchorEl(null);
    setOpen(false);
    setSelectedIndex(index);
  };

  const menuOptions = [
    { name: "Services", link: "/services" },
    { name: "Custom Software Development", link: "/customsoftware" },
    { name: "Mobile App Development", link: "/mobileapps" },
    { name: "Website Development", link: "/websites" },
  ];

  useEffect(() => {
    switch (window.location.pathname) {
      case "/":
        if (value !== 0) {
          setValue(0);
        }
        break;
      case "/services":
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(0);
        }
        break;
      case "/customsoftware":
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(1);
        }
        break;
      case "/mobileapps":
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(1);
        }
        break;
      case "/websites":
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(2);
        }
        break;
      case "/revolution":
        if (value !== 2) {
          setValue(2);
        }
        break;
      case "/about":
        if (value !== 3) {
          setValue(3);
        }
        break;
      case "/contact":
        if (value !== 4) {
          setValue(4);
        }
        break;
      case "/estimate":
        if (value !== 5) {
          setValue(5);
        }
        break;
      default:
        break;
    }
  }, [value]);

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar>
          <ToolBar disableGutters>
            <Button
              component={Link}
              to="/"
              className={classes.logoContainer}
              onClick={() => setValue(0)}
              disableRipple
            >
              <img src={logo} alt="company logo" className={classes.logo} />
            </Button>
            <Tabs
              value={value}
              onChange={handleChange}
              className={classes.tabContainer}
              indicatorColor="primary"
            >
              <Tab
                className={classes.tab}
                component={Link}
                to="/"
                label="Home"
              />
              <Tab
                aria-owns={anchorEl ? "simple-menu" : undefined}
                aria-haspopup={anchorEl ? "true" : undefined}
                className={classes.tab}
                component={Link}
                onMouseOver={(event) => handleClick(event)}
                to="/services"
                label="Services"
              />
              <Tab
                className={classes.tab}
                component={Link}
                to="/revolution"
                label="The Revolution"
              />
              <Tab
                className={classes.tab}
                component={Link}
                to="/about"
                label="About Us"
              />
              <Tab
                className={classes.tab}
                component={Link}
                to="/contact"
                label="Contact Us"
              />
            </Tabs>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              Free Estimate
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              classes={{ paper: classes.menu }}
              MenuListProps={{ onMouseLeave: handleClose }}
              elevation={0}
            >
              {menuOptions.map((option, index) => (
                <MenuItem
                  key={option}
                  component={Link}
                  to={option.link}
                  classes={{ root: classes.menuItem }}
                  onClick={(event) => {
                    handleMenuItemClick(event, index);
                    setValue(1);
                    handleClose();
                  }}
                  selected={index === selectedIndex && value === 1}
                >
                  {option.name}
                </MenuItem>
              ))}
            </Menu>
          </ToolBar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin}></div>
    </React.Fragment>
  );
}
