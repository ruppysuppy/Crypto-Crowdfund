interface ICampaign extends ICampaignServerData {
  id: string;
  username?: string;
  userPhotoUrl?: string;
}

interface ICampaignCompleteData extends ICampaign {
  manager: string;
  balance: string;
  minimumContribution: string;
  requestCount: number;
  contributorsCount: number;
  requests: IRequest[];
}

interface ICampaignServerData {
  name: string;
  description: string;
  photoUrl: string;
  goal: number;
  currentAmount: number;
  isoTime: string;
  uid: string;
}

interface IRequest {
  recipient: string;
  purpose: string;
  amount: number;
  votes?: number;
  completed?: boolean;
}

export { ICampaign, ICampaignCompleteData, ICampaignServerData, IRequest };
