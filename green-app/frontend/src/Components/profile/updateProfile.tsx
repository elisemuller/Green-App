import React from 'react'
import ImageAvatars from '../../styles/StAvatar'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import StPaper from '../../styles/StPaper';
import StHeader from '../../styles/StHeader';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  })
);


function UpdateProfile() {
    const classes = useStyles();

    return (
        <StPaper>
            <StHeader>
                <ImageAvatars/>
                <div>
                    <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="changeFirstName" label={'first name'} variant="outlined" />
                    <TextField id="changeLastName" label={'last name'} variant="outlined" />
                    </form>
                </div>
            </StHeader>
            <div style = {{display:'flex', flexDirection: 'row'}}>
              <Button variant="contained" color='primary' onClick={(e) => {
                  e.preventDefault();
                  console.log('click');
                  }} >
                  Lagre
              </Button>

              <Button variant="contained" onClick={(e) => {
                  e.preventDefault();
                  console.log('click');
                  }} >
                  Endre passord
              </Button>

              <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={(e) => {
                  e.preventDefault();
                  console.log('click');
                  }} >
                  Slett bruker
              </Button>
            </div>


        </StPaper>
    )
}

export default UpdateProfile
