import React from "react";
import {
  Typography,
  IconButton,
  makeStyles,
  Avatar,
  useMediaQuery,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 44,
    height: 44,
  },
  text: {
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  container: {
    display: "grid",
    gridAutoFlow: "column",
    gridTemplateColumns: "50px auto 50px",
    gridGap: 12,
    alignItems: "center",
    marginTop: 10,
  },
  songInfoContainer: {
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
}));
export default function QueuedSongList() {
  const greaterThanMedium = useMediaQuery((theme) =>
    theme.breakpoints.up("md")
  );
  const song = {
    title: "amir",
    artist: "moon",
    thumbnail:
      "https://i1.sndcdn.com/artworks-4Bn0Jw1SrZWPOoEQ-MMTsPQ-t500x500.jpg",
  };
  return greaterThanMedium ? (
    <div
      style={{
        margin: "10px 0",
      }}
    >
      <Typography color="textSecondary" variant="button">
        QUEUE (5)
      </Typography>
      {Array.from({ length: 5 }, () => song).map((song, i) => (
        <QueuedSong key={i} song={song} />
      ))}
    </div>
  ) : null;
}
function QueuedSong({ song }) {
  const classes = useStyles();
  const { thumbnail, title, artist } = song;
  return (
    <div className={classes.container}>
      <Avatar src={thumbnail} alt="song thumbnail" className={classes.avatar} />
      <div className={classes.songInfoContainer}>
        <Typography variant="subtitle2" className={classes.text}>
          {title}
        </Typography>
        <Typography variant="body2" className={classes.text}>
          {artist}
        </Typography>
      </div>
      <IconButton>
        <Delete color="error" />
      </IconButton>
    </div>
  );
}
