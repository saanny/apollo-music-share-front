import {
  Button,
  InputAdornment,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  makeStyles,
} from "@material-ui/core";
import { Link, AddBoxOutlined } from "@material-ui/icons";
import React from "react";
import SoundCloudPlayer from "react-player/soundcloud";
import YoutubePlayer from "react-player/youtube";
import ReactPlayer from "react-player";
import { useCreateSongMutation, SongsDocument } from "../generated/graphql";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
  },
  urlInput: {
    margin: theme.spacing(2),
  },
  addSongButton: {
    margin: theme.spacing(1),
  },
  dialog: {
    textAlign: "center",
  },
  thumbnail: {
    width: "90%",
  },
}));

const DEFAULT_SONG = {
  duration: 0,
  title: "",
  artist: "",
  thumbnail: "",
};
export default function AddSong() {
  const [createSong, { error, loading }] = useCreateSongMutation({
    errorPolicy: "all",
  });

  const [dialog, setDialog] = React.useState(false);
  const [url, setUrl] = React.useState("");
  const [playable, setPlayable] = React.useState(false);
  const [song, setSong] = React.useState(DEFAULT_SONG);
  React.useEffect(() => {
    const isPlayable =
      SoundCloudPlayer.canPlay(url) || YoutubePlayer.canPlay(url);
    setPlayable(isPlayable);
  }, [url]);
  function handleChangeSong(event) {
    const { value, name } = event.target;
    setSong((prevSong) => ({
      ...prevSong,
      [name]: value,
    }));
  }
  const classes = useStyles();
  function handleSetDialog() {
    setDialog(false);
  }
  async function handleEditSong({ player }) {
    const nestedPlayer = player.player.player;

    let songData;
    if (nestedPlayer.getVideoData) {
      songData = getYoutubeInfo(nestedPlayer);
    } else if (nestedPlayer.getCurrentSound) {
      songData = await getSoundCloudInfo(nestedPlayer);
    }

    setSong({ ...songData, url });
  }
  async function handleAddSong() {
    const { url, thumbnail, duration, title, artist } = song;
    try {
      await createSong({
        variables: {
          url: url.length > 0 ? url : null,
          thumbnail: thumbnail.length > 0 ? thumbnail : null,
          duration: duration > 0 ? duration : null,
          title: title.length > 0 ? title : null,
          artist: artist.length > 0 ? artist : null,
        },
        update: (cache, { data }) => {
          const newSong = data?.createSong;
          const existingSongs = cache.readQuery({
            query: SongsDocument,
          });

          cache.writeQuery({
            query: SongsDocument,
            data: {
              songs: [...existingSongs?.songs, newSong],
            },
          });
        },
      });
      handleSetDialog();
      setSong(DEFAULT_SONG);
      setUrl("");
    } catch (error) {
      console.log(error);
    }
  }
  function getYoutubeInfo(player) {
    const duration = player.getDuration();
    const { title, video_id, author } = player.getVideoData();
    const thumbnail = `http://img.youtubecom/vi/${video_id}/0.jpg`;

    return {
      duration,
      title,
      artist: author,
      thumbnail,
    };
  }

  function getSoundCloudInfo(player) {
    return new Promise((resolve) => {
      player.getCurrentSound((songData) => {
        if (songData) {
          resolve({
            duration: Number(songData.duration / 1000),
            title: songData.title,
            artist: songData.user.username,
            thumbnail: songData.artwork_url.replace("-large", "-t500x500"),
          });
        }
      });
    });
  }

  const { thumbnail, title, artist } = song;

  return (
    <div className={classes.container}>
      <Dialog
        open={dialog}
        onClose={handleSetDialog}
        className={classes.dialog}
      >
        <DialogTitle>Edit Song</DialogTitle>
        <DialogContent>
          <img
            src={thumbnail}
            alt="song thumbnail"
            className={classes.thumbnail}
          />
          <TextField
            margin="dense"
            value={title}
            name="title"
            label="Title"
            fullWidth
            onChange={handleChangeSong}
          />
          <TextField
            margin="dense"
            value={artist}
            name="artist"
            label="Artist"
            fullWidth
            onChange={handleChangeSong}
          />
          <TextField
            margin="dense"
            name="thumbnail"
            label="Thumbnail"
            fullWidth
            value={thumbnail}
            onChange={handleChangeSong}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSetDialog} color="primary">
            Cancel
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleAddSong}>
            Add Song
          </Button>
        </DialogActions>
      </Dialog>
      <TextField
        className={classes.urlInput}
        placeholder="Add Youtube or SoundCloud Url"
        fullWidth
        margin="normal"
        type="url"
        value={url}
        onChange={(event) => setUrl(event.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Link />
            </InputAdornment>
          ),
        }}
      />
      <Button
        className={classes.addSongButton}
        variant="contained"
        color="secondary"
        endIcon={<AddBoxOutlined />}
        onClick={() => setDialog(!dialog)}
        disabled={!playable}
      >
        Add
      </Button>
      <ReactPlayer url={url} hidden onReady={handleEditSong} />
    </div>
  );
}
