interface IGroup {
  id?: number;
  name: string;
  description?: string;
  coverPhoto?: string;
  createdByEmail: string;
  members?: IGroupMember[];
  inviteID?: string;
  _count?:{
    members: number;
  }
}
export default IGroup;

export interface IGroupMember {
  id: string;
  name: string;
  leetcodeUsername: string;
  lastAccessed: Date;
  lastUpdated: Date;
  leetcodeStats: {
    ranking: number;
    contestRanking: number;
    contestRating: number;
    contestAttended: number;
    streak: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    avatar?: string;
  } | null;
  groups?: IGroup[]
}
