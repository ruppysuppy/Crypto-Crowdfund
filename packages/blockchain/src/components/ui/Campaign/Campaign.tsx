import React from 'react';
import { Link } from 'react-router-dom';

import { ICampaign } from '../../../interfaces/campaign';
import { IRoutes } from '../../../interfaces/routes';
import { formatTimeShort } from '../../../utils/format';

import sharedClasses from '../../../common.module.css';
import classes from './campaign.module.css';

interface IProps {
  campaign: ICampaign;
  routes: IRoutes;
}

export default function Campaign({ campaign, routes }: IProps) {
  const time = new Date(campaign.isoTime);

  return (
    <div className={classes.root}>
      <a href={`${routes.CAMPAIGN}?id=${campaign.id}`} />
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
            <Link
              className={sharedClasses.link}
              to={`${routes.ACCOUNT}?uid=${campaign.uid}`}
            >
              {campaign.username}
            </Link>
          </div>
        )}
      </div>
      <span className={`${sharedClasses.p} ${classes.time}`}>
        Created: {formatTimeShort(time)}
      </span>
    </div>
  );
}
