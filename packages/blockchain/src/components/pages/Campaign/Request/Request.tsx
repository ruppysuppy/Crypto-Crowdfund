import React from 'react';

import Button from '../../../ui/Button/Button';
import ErrorBanner from '../../../ui/ErrorBanner/ErrorBanner';
import Spinner from '../../../ui/Spinner/Spinner';
import { IRequest } from '../../../../interfaces/campaign';

import classes from './request.module.css';
import rootClasses from '../campaign.module.css';
import { formatNumber } from '../../../../utils/format';

interface IProps {
  approvalError: string;
  approved: boolean;
  contributorsCount: number;
  index: number;
  isContributor: boolean;
  isLoading: boolean;
  isManager: boolean;
  request: IRequest;
  handleApprove: (index: number) => Promise<void>;
  handleFinalize: (index: number) => Promise<void>;
}

export default function Request({
  approvalError,
  approved,
  contributorsCount,
  index,
  isContributor,
  isLoading,
  isManager,
  request,
  handleApprove,
  handleFinalize,
}: IProps) {
  return (
    <>
      <div className={rootClasses.textInfo}>
        <span>Recipient</span>
        {request.recipient}
        <span>Purpose</span>
        {request.purpose}
        <span>Amount</span>
        {`${request.amount} Ether`}
        {request.votes !== undefined && !request.completed && (
          <>
            <span>Votes</span>
            {contributorsCount > 0 && (
              <>
                {request.votes} / {contributorsCount}
              </>
            )}
            {` (${formatNumber(
              Math.round((request.votes / (contributorsCount || 1)) * 100),
            )}%)`}
          </>
        )}
        <span>Status</span>
        {request.completed ? (
          <span className={classes.complete}>Completed</span>
        ) : (request.votes || 0 / contributorsCount) > 0.5 ? (
          <span className={classes.ready}>Ready</span>
        ) : (
          'Polling'
        )}
      </div>
      {approvalError && (
        <ErrorBanner style={{ marginBottom: 0 }}>{approvalError}</ErrorBanner>
      )}
      {isLoading ? (
        <div className={rootClasses.spinnerContainer}>
          <Spinner />
        </div>
      ) : (
        <>
          {!request.completed && isContributor && (
            <Button
              className={rootClasses.requestButton}
              disabled={approved}
              onClick={() => handleApprove(index)}
              fullWidth
            >
              {approved ? 'Approved' : 'Approve'}
            </Button>
          )}
          {!request.completed && isManager && (
            <Button
              className={rootClasses.requestButton}
              disabled={(request.votes || 0 / contributorsCount) <= 0.5}
              onClick={() => handleFinalize(index)}
              fullWidth
            >
              Finalize
            </Button>
          )}
        </>
      )}
    </>
  );
}
