import { Tables } from '(@/types/database.types)';

export type UsersType = Tables<'users'>;

export interface IsValidateShow {
  [key: string]: boolean;
}

export interface LoginData {
  userId: string;
  password: string;
}

export type IsEditingType = {
  isEditing: boolean;
};

export interface UpdateProfileType {
  userId: string;
  inputNickname: string;
  inputIntro: string;
  inputKakaoId: string;
  inputGender: string;
}
