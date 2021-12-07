interface ICampaign extends ICampaignServerData {
  id: string;
  username?: string;
  userPhotoUrl?: string;
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

export { ICampaign, ICampaignServerData };
