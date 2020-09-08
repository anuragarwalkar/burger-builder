import React from "react";
import classes from "./navigationItems.module.css";
import NavigationItem from "./navigationItem/navigationItem";

const NavigationItems = ({ isAuthenticated }: any) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">Burger Builder</NavigationItem>
      {isAuthenticated ? (
        <NavigationItem link="/my-orders">My Orders</NavigationItem>
      ) : null}
      {isAuthenticated ? (
        <NavigationItem link="/logout">Log Out</NavigationItem>
      ) : (
        <NavigationItem link="/auth">Auth</NavigationItem>
      )}
    </ul>
  );
};

export default NavigationItems;
