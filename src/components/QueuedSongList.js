import React from "react";
import { gql, useQuery } from "@apollo/client";
import {
  Typography,
  IconButton,
  makeStyles,
  Avatar,
  useMediaQuery,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import {
  useQueueQuery,
  useDeleteQueueSongMutation,
  QueueDocument,
} from "../generated/graphql";
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
  const { data, loading, error } = useQueueQuery();
  return greaterThanMedium ? (
    <div
      style={{
        margin: "10px 0",
      }}
    >
      <Typography color="textSecondary" variant="button">
        QUEUE ({data?.queue.length})
      </Typography>
      {data?.queue?.map((song, i) => (
        <QueuedSong key={i} song={song} />
      ))}
    </div>
  ) : null;
}

function QueuedSong({ song }) {
  const classes = useStyles();
  const [deleteQueueSong] = useDeleteQueueSongMutation();
  const { thumbnail, title, artist, id } = song;
  function handleRemoveQueueSong() {
    deleteQueueSong({
      variables: {
        id,
      },
      update: (cache, { data }) => {
        const existingQueueSongs = cache.readQuery({
          query: QueueDocument,
        });
        console.log(existingQueueSongs, data);
        const newData = existingQueueSongs.queue.filter(
          (song) => song.id !== data?.deleteQueueSong?.id
        );
        cache.writeQuery({
          query: QueueDocument,
          data: {
            queue: newData,
          },
        });
      },
    });
  }
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
        <Delete color="error" onClick={handleRemoveQueueSong} />
      </IconButton>
    </div>
  );
}
