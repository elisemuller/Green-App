import React from 'react';
import SocialGrid from 'components/SocialGrid';
import HomePageLinks from 'components/HomePageLinks';
import { ChallengeListItem } from 'components/ChallengeListItem';
import { GlobalContext } from 'state/context';
import List from '@material-ui/core/List';
import getChallenges from 'utils/challenge';
const ChallengesPage = () => {
  console.log('here 1');
  const { state } = React.useContext(GlobalContext);
  const challenges = state?.challenges;
  console.log(state);
  return (
    <div>
      <List style={{ width: '100%' }}>
        {challenges?.map((item) => (
          <ChallengeListItem
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
            points={item.points}
          />
        ))}
      </List>
    </div>
  );
};

export default ChallengesPage;
