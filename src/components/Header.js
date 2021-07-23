import React from "react";
import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
import { HeadsetMicTwoTone } from "@material-ui/icons";
const useStyle = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(2),
  },
}));
export default function Header() {
  const classes = useStyle();
  return (
    <div>
      <AppBar color="primary" position="fixed">
        <Toolbar>
          <HeadsetMicTwoTone />
          <Typography className={classes.title} variant="h6" component="h1">
            Music Share
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
