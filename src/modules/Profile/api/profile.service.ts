import api from '@src/services/api';
import {URLs} from '@src/services/urls';
import type {IProfileData, ISwitchWorkspacePayload} from '../models/profile.types';

export async function fetchProfileApi(): Promise<IProfileData> {
  const response = await api.get(URLs.profile.me);
  return response.data.data;
}

export async function switchWorkspaceApi(payload: ISwitchWorkspacePayload): Promise<string | null> {
  const response = await api.post(URLs.profile.switchWorkspace, payload);
  return response.data.data.activeWorkspace;
}
