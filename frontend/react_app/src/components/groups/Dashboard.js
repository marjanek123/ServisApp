import React, { Fragment } from "react";
import Header from "../layout/Header";
import { Box } from "@material-ui/core";
import About from "./About";

import {  makeStyles } from "@material-ui/core/styles";
const drawerWidth =240;

const useStyles = makeStyles((theme) => ({
  appBarShift: {
    marginTop: theme.spacing(5),
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }}))
  

function Dashboard()  {

  const classes= useStyles();
  
    
  

    return(

        <Fragment>
          <About />
        </Fragment>

      
    
    );
}

export default Dashboard;
