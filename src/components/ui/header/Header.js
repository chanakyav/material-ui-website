import React, { useState, useEffect, useMemo, cloneElement } from "react";
import {
  MenuItem,
  IconButton,
  SwipeableDrawer,
  Tabs,
  Tab,
  Button,
  Menu,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useScrollTrigger,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import logo from "../../../assets/logo.svg";
import useStyles from "./stylesOptions";

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

export default function Header(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleMenuItemClick = (event, index) => {
    setAnchorEl(null);
    setOpenMenu(false);
    setSelectedIndex(index);
  };

  const menuOptions = useMemo(
    () => [
      { name: "Services", link: "/services", activeIndex: 1, selectedIndex: 0 },
      {
        name: "Custom Software Development",
        link: "/customsoftware",
        activeIndex: 1,
        selectedIndex: 1,
      },
      {
        name: "Mobile App Development",
        link: "/mobileapps",
        activeIndex: 1,
        selectedIndex: 2,
      },
      {
        name: "Website Development",
        link: "/websites",
        activeIndex: 1,
        selectedIndex: 3,
      },
    ],
    []
  );

  const routes = useMemo(
    () => [
      { name: "Home", link: "/", activeIndex: 0 },
      {
        name: "Sevices",
        link: "/services",
        activeIndex: 1,
        ariaOwns: anchorEl ? "simple-menu" : undefined,
        ariaPopUp: anchorEl ? "true" : undefined,
        mouseOver: (event) => handleClick(event),
      },
      { name: "The Revolution", link: "/revolution", activeIndex: 2 },
      { name: "About Us", link: "/aboutus", activeIndex: 3 },
      { name: "Contact Us", link: "/contactus", activeIndex: 4 },
    ],
    [anchorEl]
  );

  useEffect(() => {
    [...menuOptions, ...routes].forEach((route) => {
      switch (window.location.pathname) {
        case `${route.link}`:
          if (value !== route.activeIndex) {
            setValue(route.activeIndex);
            if (route.selectedIndex && route.selectedIndex !== selectedIndex) {
              setSelectedIndex(route.selectedIndex);
            }
          }
          break;
        default:
          break;
      }
    });
  }, [value, menuOptions, selectedIndex, routes]);

  const tabs = (
    <React.Fragment>
      <Tabs
        value={value}
        onChange={handleChange}
        className={classes.tabContainer}
        indicatorColor="primary"
      >
        {routes.map((route, index) => (
          <Tab
            key={`${route}${index}`}
            className={classes.tab}
            component={Link}
            to={route.link}
            label={route.name}
            aria-owns={route.ariaOwns}
            aria-haspopup={route.ariaPopUp}
            onMouseOver={route.mouseOver}
          />
        ))}
      </Tabs>
      <Button variant="contained" color="secondary" className={classes.button}>
        Free Estimate
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        classes={{ paper: classes.menu }}
        MenuListProps={{ onMouseLeave: handleClose }}
        elevation={0}
        style={{ zIndex: 1302 }}
        keepMounted
      >
        {menuOptions.map((option, index) => (
          <MenuItem
            key={`${option}${index}`}
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
    </React.Fragment>
  );

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.toolbarMargin} />
        <List disablePadding>
          {routes.map((route) => (
            <ListItem
              key={`${route}${route.activeIndex}`}
              divider
              button
              component={Link}
              to={route.link}
              selected={value === route.activeIndex}
              classes={{ selected: classes.drawerItemSelected }}
              onClick={() => {
                setOpenDrawer(false);
                setValue(route.activeIndex);
              }}
            >
              <ListItemText className={classes.drawerItem} disableTypography>
                {route.name}
              </ListItemText>
            </ListItem>
          ))}

          <ListItem
            divider
            button
            component={Link}
            to="/estimate"
            onClick={() => {
              setOpenDrawer(false);
              setValue(5);
            }}
            selected={value === 5}
            classes={{
              root: classes.drawerItemEstimate,
              selected: classes.drawerItemSelected,
            }}
          >
            <ListItemText disableTypography className={classes.drawerItem}>
              Free Estimate
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        className={classes.drawerIconContainer}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar className={classes.appbar}>
          <Toolbar disableGutters>
            <Button
              component={Link}
              to="/"
              className={classes.logoContainer}
              onClick={() => setValue(0)}
              disableRipple
            >
              <img src={logo} alt="company logo" className={classes.logo} />
            </Button>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin}></div>
    </React.Fragment>
  );
}
