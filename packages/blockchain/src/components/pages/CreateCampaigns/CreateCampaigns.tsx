import React, { useState } from 'react';

import Button from '../../ui/Button/Button';
import ErrorBanner from '../../ui/ErrorBanner/ErrorBanner';
import Layout from '../../hoc/Layout';
import Input from '../../ui/Input/Input';
import Spinner from '../../ui/Spinner/Spinner';
import { IRoutes } from '../../../interfaces/routes';

import sharedClasses from '../../../common.module.css';

interface IProps {
  routes: IRoutes;
}

export default function CreateCampaigns({ routes }: IProps) {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    setNameError('');
    setError('');
    let isValid = true;
    if (name.length < 5) {
      setNameError('Campaign name must be at least 5 characters long');
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }
    setIsLoading(true);
    try {
      // blockchain
    } catch (error) {
      // @ts-ignore
      setError(error.message);
    }
    try {
      // firebase
    } catch (error) {
      // @ts-ignore
      setError(error.code);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  return (
    <Layout faqLink={routes.FAQ}>
      <h1 className={sharedClasses.h1}>Create Campaign</h1>

      <form onSubmit={handleSubmit}>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Campaign Name"
          error={!!nameError}
          helperText={nameError}
          autoFocus
          fullwidth
        />
        {error && <ErrorBanner>{error}</ErrorBanner>}
        {isLoading ? <Spinner /> : <Button type="submit">Sign Up</Button>}
      </form>
    </Layout>
  );
}
