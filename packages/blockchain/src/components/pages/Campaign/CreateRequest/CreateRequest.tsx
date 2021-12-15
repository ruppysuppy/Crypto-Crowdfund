import React, { useState } from 'react';
import { arrayUnion, doc, getFirestore, updateDoc } from 'firebase/firestore';

import Button from '../../../ui/Button/Button';
import ErrorBanner from '../../../ui/ErrorBanner/ErrorBanner';
import Input from '../../../ui/Input/Input';
import Spinner from '../../../ui/Spinner/Spinner';
import { IRequest } from '../../../../interfaces/campaign';
import { getCampaign } from '../../../../utils/campaign';
import { getFirebaseApp } from '../../../../utils/firebase';
import web3 from '../../../../utils/web3';

import classes from './createRequest.module.css';

interface IProps {
  id: string;
  balance: number;
  addRequest: (request: IRequest) => void;
}

export default function CreateRequest({ balance, id, addRequest }: IProps) {
  const [recipient, setRecipient] = useState('');
  const [recipientError, setRecipientError] = useState('');
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');
  const [purpose, setPurpose] = useState('');
  const [purposeError, setPurposeError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validate = () => {
    setAmountError('');
    setRecipientError('');
    setPurposeError('');
    let isValid = true;
    if (!amount || isNaN(+amount)) {
      setAmountError('Enter a valid amount');
      isValid = false;
    } else if (+amount > balance) {
      setAmountError('Insufficient funds');
      isValid = false;
    }
    if (!recipient) {
      setRecipientError('Enter a valid recipient');
      isValid = false;
    }
    if (!purpose) {
      setPurposeError('Enter a purpose');
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }
    const firebaseApp = getFirebaseApp()!;
    const firestore = getFirestore(firebaseApp);
    setError('');
    setIsLoading(true);
    try {
      const [account] = await web3.eth.getAccounts();
      if (!account) {
        throw new Error('Please login to MetaMask');
      }
      const campaign = getCampaign(id);
      await campaign.methods
        .createRequest(web3.utils.toWei(amount, 'ether'), recipient)
        .send({ from: account });
    } catch (error) {
      // @ts-ignore
      setError(error.message);
      setIsLoading(false);
      return;
    }
    try {
      const requestRef = doc(firestore, 'requests', id);
      await updateDoc(requestRef, {
        requests: arrayUnion({
          amount,
          recipient,
          purpose,
        }),
      });
    } catch (error) {
      // @ts-ignore
      setError(error.code);
      setIsLoading(false);
      return;
    }
    setIsEditing(false);
    setIsLoading(false);
    setAmount('');
    setRecipient('');
    setPurpose('');
    addRequest({
      amount: +amount,
      recipient,
      purpose,
      votes: 0,
      completed: false,
    });
  };

  return (
    <>
      {isEditing ? (
        <form
          onSubmit={handleSubmit}
          style={{
            marginTop: '1rem',
          }}
        >
          <Input
            placeholder="Recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            error={!!recipientError}
            helperText={recipientError}
            fullwidth
          />
          <Input
            placeholder="Purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            error={!!purposeError}
            helperText={purposeError}
            style={{
              margin: 0,
            }}
            fullwidth
          />
          <div className={classes.contributeGrid}>
            <div>
              <Input
                type="number"
                placeholder="Amount"
                step={0.01}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                error={!!amountError}
                helperText={amountError}
                fullwidth
              />
            </div>
            <span>ETHER</span>
          </div>
          {error && <ErrorBanner style={{ marginTop: 0 }}>{error}</ErrorBanner>}
          {isLoading ? (
            <Spinner />
          ) : (
            <div className={classes.createRequestButtonHolder}>
              <Button type="submit">Create</Button>
              <Button onClick={() => setIsEditing(false)}>Cancel</Button>
            </div>
          )}
        </form>
      ) : (
        <Button
          onClick={() => setIsEditing(true)}
          style={{
            marginTop: '1rem',
          }}
          fullWidth
        >
          Create Request
        </Button>
      )}
    </>
  );
}
