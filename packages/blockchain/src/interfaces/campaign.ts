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

export { ICampaign, ICampaignCompleteData, ICampaignServerData };
