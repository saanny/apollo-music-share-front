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
export default function AddSong() {
  const [dialog, setDialog] = React.useState(false);
  const classes = useStyles();
  function handleSetDialog() {
    setDialog(false);
  }
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
            src="https://i1.sndcdn.com/artworks-QYlSILlQ7NMryyX9-4zDkWg-t500x500.jpg"
            alt="song thumbnail"
            className={classes.thumbnail}
          />
          <TextField margin="dense" name="title" label="Title" fullWidth />
          <TextField margin="dense" name="artist" label="Artist" fullWidth />
          <TextField
            margin="dense"
            name="thumbnail"
            label="Thumbnail"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSetDialog} color="primary">
            Cancel
          </Button>
          <Button variant="outlined" color="secondary">
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
        onClick={() => setDialog(true)}
      >
        Add
      </Button>
    </div>
  );
}
