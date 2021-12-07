import React from 'react';
import { useHistory } from 'react-router';

import { ICampaign } from '../../../interfaces/campaign';
import { IRoutes } from '../../../interfaces/routes';
import { formatTime } from '../../../utils/time';

import sharedClasses from '../../../common.module.css';
import classes from './campaign.module.css';

interface IProps {
  campaign: ICampaign;
  routes: IRoutes;
}

export default function Campaign({ campaign, routes }: IProps) {
  const history = useHistory();
  const time = new Date(campaign.isoTime);
  const navigateToCampaign = () => {
    const route = `${routes.CAMPAIGN}?id=${campaign.id}`;
    history.push(route);
  };

  return (
    <div className={classes.root} onClick={navigateToCampaign}>
      {campaign.photoUrl && (
        <div
          className={classes.imageHolder}
          style={{
            backgroundImage: `url(${campaign.photoUrl})`,
          }}
        />
      )}
      <div className={classes.infoHolder}>
        <h3 className={sharedClasses.h3}>{campaign.name}</h3>
        {campaign.username && (
          <div className={sharedClasses.p}>
            <span>By: </span>
            <a
              className={sharedClasses.link}
              href={`${routes.ACCOUNT}?uid=${campaign.uid}`}
              onClick={(e) => e.stopPropagation()}
            >
              {campaign.username}
            </a>
          </div>
        )}
      </div>
      <span className={`${sharedClasses.p} ${classes.time}`}>
        Created: {formatTime(time)}
      </span>
    </div>
  );
}
