import { EStateMutability, EType } from '../enums/contract';

interface ICampaignFactory {
  abi: {
    inputs: {
      name: string;
      type: EType;
      internalType: EType;
    }[];
    name: string;
    outputs: {
      name: string;
      type: EType;
      internalType: EType;
    }[];
    stateMutability: EStateMutability;
    type: EType;
  }[];
  bytecode: string;
}

interface IAddress {
  CampaignFactory: string;
}

export { ICampaignFactory, IAddress };
