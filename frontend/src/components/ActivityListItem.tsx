import React, { useState } from 'react';
import { SliderEffort } from './SliderEffort';
import IActivity from 'interfaces/IActivity';
import { Button } from '@material-ui/core';
import getPerformsActivities, {
  performsActivity,
} from 'utils/performsActivities';
import { GlobalContext } from 'state/context';
import { performsActivities } from 'state/performsActivities/performsActivitiesActions';
import StCard from 'styledComponents/StCard';
import { CardContent, CardActions, Typography } from '@material-ui/core';
import { updateUser } from 'utils/auth';
import { getUser } from 'utils/user';
import { user } from 'state/user/userActions';
import Alert from '@material-ui/lab/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBiking,
  faCarrot,
  faTrashAlt,
  faTshirt,
  faCar,
  faTree,
  faDrumstickBite,
  faBus,
} from '@fortawesome/free-solid-svg-icons';
export const ActivityListItem = (props: IActivity) => {
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const { state, dispatch } = React.useContext(GlobalContext);
  const [effort, setEffort] = useState<number>(50);
  const currentUser = state.user!;

  const handleAddActivity = async (_: React.MouseEvent) => {
    setError('');
    try {
      const data = await performsActivity(
        currentUser.id,
        props.id,
        props.date.getTime(),
        effort
      );
      if (data) {
        const myPerformsActivities = await getPerformsActivities();
        dispatch(performsActivities(myPerformsActivities));
        setSuccess(true);
      }
    } catch (err) {
      if (err instanceof Error) {
        // handle errors thrown from frontend
        setError(err.message);
      } else {
        // handle errors thrown from backend,
        setError(err);
      }
      console.log(error);
    }
    try {
      const data = await updateUser(
        currentUser.id,
        currentUser.email,
        currentUser.total_points + props.points,
        currentUser.weekly_points + props.points
      );

      if (data) {
        const myUser = await getUser();
        dispatch(user(myUser));
      }
    } catch (err) {
      if (err instanceof Error) {
        // handle errors thrown from frontend
        setError(err.message);
        console.log(error);
      } else {
        // handle errors thrown from backend
        setError(err);
        console.log(error);
      }
    }
  };

  return (
    <StCard>
      <CardContent>
        <Typography variant="h6" align="center">
          {props.index === 0 && <FontAwesomeIcon icon={faBiking} />}
          {props.index === 1 && <FontAwesomeIcon icon={faCarrot} />}
          {props.index === 2 && <FontAwesomeIcon icon={faTrashAlt} />}
          {props.index === 3 && <FontAwesomeIcon icon={faTshirt} />}
          {props.index === 4 && <FontAwesomeIcon icon={faCar} />}
          {props.index === 5 && <FontAwesomeIcon icon={faTree} />}
          {props.index === 6 && <FontAwesomeIcon icon={faDrumstickBite} />}
          {props.index === 7 && <FontAwesomeIcon icon={faBus} />}
        </Typography>
        <Typography variant="h6" align="center">
          {props.name}
        </Typography>
      </CardContent>
      <CardActions style={{ alignItems: 'center', justifyContent: 'center' }}>
        <SliderEffort
          index={props.index}
          effort={effort}
          onChangeEffort={(newEffort: any) => {
            setEffort(newEffort);
          }}
        />
      </CardActions>
      <CardActions style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Button
          variant="contained"
          onClick={handleAddActivity}
          color={'primary'}
        >
          {' '}
          Submit{' '}
        </Button>
      </CardActions>
      {success && (
        <Alert
          severity="success"
          onClose={() => {
            setSuccess(false);
          }}
        >
          {' '}
          Your activity was saved{' '}
        </Alert>
      )}
      {error && <Alert severity="error"> Something went wrong </Alert>}
    </StCard>
  );
};
