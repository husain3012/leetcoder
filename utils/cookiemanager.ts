import axios from "axios";
import { IGroupMember } from '../@types/group';

export const saveRecentGroups = () => {};

export const loadRecentGroups = () => {};

export const saveUserToLocal = (leetcodeUsername: string) => {
  localStorage.setItem("user", leetcodeUsername);
};

export const getUsernameFromLocal = () => {
  return typeof(window)!=="undefined" ? localStorage.getItem("user") :"";
};

export const loadUserFromLocal = async (): Promise<IGroupMember | null> => {
  const leetcodeUsername = localStorage.getItem("user");
  if (!leetcodeUsername || leetcodeUsername=="") return null;
  return (
    await axios.get(`/api/groups/user?leetcodeUsername=${leetcodeUsername}`)
  ).data;
};

export const removeUserFromLocal = () => {
  localStorage.removeItem("user");
};
