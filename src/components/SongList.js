import React from "react";
import {
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { PlayArrow, Save, Pause } from "@material-ui/icons";
import {
  useSongsQuery,
  useAddQueueMutation,
  QueueDocument,
  useQueueQuery,
  useDeleteQueueSongMutation,
} from "../generated/graphql";
import { SongContext } from "../App";
const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(3),
  },
  songInfoContainer: {
    display: "flex",
    alignItems: "center",
  },
  songInfo: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  thumbnail: {
    objectFit: "cover",
    width: 140,
    height: 140,
  },
}));
export default function SongList() {
  const { data, loading, error } = useSongsQuery();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div>
      {data.songs.map((song, i) => (
        <Song key={i} song={song} />
      ))}
    </div>
  );
}
function Song({ i, song }) {
  const classes = useStyles();
  const { state, dispatch } = React.useContext(SongContext);
  const { data: queueData, loading, error } = useQueueQuery();
  const [deleteQueueSong] = useDeleteQueueSongMutation();
  const [addToQueue] = useAddQueueMutation();
  const { thumbnail, title, artist, id } = song;
  const [currentSongPlaying, setCorrentSongPlaying] = React.useState(false);
  React.useEffect(() => {
    const isSongPlaying = state.isPlaying && id == state.song.id;

    setCorrentSongPlaying(isSongPlaying);
  }, [id, state.song.id, state.isPlaying]);
  function handleTogglePlay() {
    dispatch({ type: "SET_SONG", payload: { song } });

    dispatch(state.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" });
  }
  function handleAddtoQueueSongs() {
    // const { queue } = queueData;
    // const isInQueue = queue.some((song) => song.title === title);
    // const getQueueData = queue.filter((song) => song.title === title);
    // console.log(getQueueData);
    // if (isInQueue) {
    // deleteQueueSong({
    //   variables: {
    //     id: getQueueData[0].id,
    //   },
    //   update: (cache, { data }) => {
    //     const existingQueueSongs = cache.readQuery({
    //       query: QueueDocument,
    //     });
    //     const newData = existingQueueSongs.queue.filter(
    //       (song) => song.id !== data?.deleteQueueSong?.id
    //     );
    //     cache.writeQuery({
    //       query: QueueDocument,
    //       data: {
    //         queue: newData,
    //       },
    //     });
    //   },
    // });
    // } else {
    // }
    addToQueue({
      variables: {
        title: song.title,
        thumbnail: song.thumbnail,
        artist: song.artist,
        url: song.url,
        duration: song.duration,
      },
      update: (cache, { data }) => {
        const newSong = data?.addQueue;
        const existingQueueSongs = cache.readQuery({
          query: QueueDocument,
        });
        cache.writeQuery({
          query: QueueDocument,
          data: {
            queue: [...existingQueueSongs?.queue, newSong],
          },
        });
      },
    });
  }
  return (
    <Card className={classes.container}>
      <div className={classes.songInfoContainer}>
        <CardMedia image={thumbnail} className={classes.thumbnail} />
        <div className={classes.songInfo}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body1" component="p" color="textSecondary">
              {artist}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton size="small" color="primary" onClick={handleTogglePlay}>
              {currentSongPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
            <IconButton
              size="small"
              color="secondary"
              onClick={handleAddtoQueueSongs}
            >
              <Save />
            </IconButton>
          </CardActions>
        </div>
      </div>
    </Card>
  );
}
