import React from 'react';
import { useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export default function BackDialog({buttonClick}) {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const handleBackDialogue = () => {
    setOpen(true);
  };

  const handleConfirm = () => {
    history.goBack();
    setOpen(false);
  }

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleBackDialogue} >
          <ArrowBackIcon /><p>Back</p>
      </IconButton>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Abandon Changes?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Going back will abandon changes that you've made to this beer. Are you sure you want to go back?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancel} color="primary">
            Stay
          </Button>
          <Button onClick={handleConfirm} color="primary" variant='contained' autoFocus>
            Go Back
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
