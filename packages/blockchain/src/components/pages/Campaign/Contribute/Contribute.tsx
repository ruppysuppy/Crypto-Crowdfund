import React from 'react';

import Button from '../../../ui/Button/Button';
import ErrorBanner from '../../../ui/ErrorBanner/ErrorBanner';
import Input from '../../../ui/Input/Input';
import Spinner from '../../../ui/Spinner/Spinner';

import classes from './contribute.module.css';
import rootClasses from '../campaign.module.css';
import sharedClasses from '../../../../common.module.css';

interface IProps {
  contribution: string;
  contributionError: string;
  error: string;
  isLoading: boolean;
  minimumContribution: string;
  handleContribute: () => Promise<void>;
  setContribution: (contribution: string) => void;
}

export default function Contribute({
  contribution,
  contributionError,
  error,
  isLoading,
  minimumContribution,
  handleContribute,
  setContribution,
}: IProps) {
  return (
    <>
      <h2 className={sharedClasses.h2}>Contribute</h2>
      <div className={classes.contributeGrid}>
        <div>
          <Input
            type="number"
            placeholder="Contribution Amount"
            step={minimumContribution}
            value={contribution}
            onChange={(e) => setContribution(e.target.value)}
            error={!!contributionError}
            helperText={contributionError}
            fullwidth
          />
        </div>
        <span>ETHER</span>
      </div>
      {error && (
        <ErrorBanner
          style={{
            marginTop: '0',
          }}
        >
          {error}
        </ErrorBanner>
      )}
      {isLoading ? (
        <div
          className={rootClasses.spinnerContainer}
          style={{
            marginTop: '0',
          }}
        >
          <Spinner />
        </div>
      ) : (
        <Button onClick={handleContribute} fullWidth>
          Contribute
        </Button>
      )}
      <p className={sharedClasses.p}>
        <strong className={classes.primaryText}>NOTE: </strong>
        If you have already contributed to this campaign, please log in using
        the correct MetaMask account
      </p>
    </>
  );
}
