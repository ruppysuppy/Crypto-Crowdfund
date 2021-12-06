interface ICampaign {
  name: string;
  description: string;
  photoUrl: string;
  goal: number;
  currentAmount: number;
  isoTime: string;
}

export { ICampaign };
