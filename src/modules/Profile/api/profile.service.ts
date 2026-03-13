import api from '@src/services/api';
import {URLs} from '@src/services/urls';
import type {IProfileData, ISwitchWorkspacePayload, IUpdateProfilePayload} from '../models/profile.types';

export async function fetchProfileApi(): Promise<IProfileData> {
  const response = await api.get(URLs.profile.me);
  return response.data.data;
}

export async function updateProfileApi(payload: IUpdateProfilePayload): Promise<IProfileData> {
  const response = await api.patch(URLs.profile.update, payload);
  return response.data.data.user;
}

export async function uploadAvatarApi(imageUri: string): Promise<IProfileData> {
  const formData = new FormData();
  formData.append('image', {
    uri: imageUri,
    type: 'image/jpeg',
    name: 'avatar.jpg',
  } as any);
  const response = await api.post(URLs.profile.avatar, formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
  return response.data.data.user;
}

export async function uploadCoverApi(imageUri: string): Promise<IProfileData> {
  const formData = new FormData();
  formData.append('image', {
    uri: imageUri,
    type: 'image/jpeg',
    name: 'cover.jpg',
  } as any);
  const response = await api.post(URLs.profile.cover, formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
  return response.data.data.user;
}

export async function switchWorkspaceApi(payload: ISwitchWorkspacePayload): Promise<string | null> {
  const response = await api.post(URLs.profile.switchWorkspace, payload);
  return response.data.data.activeWorkspace;
}
