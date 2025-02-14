import { EUserRoles } from '../enums/user-role.enum';

export interface IUser {
  email: string;
  password: string;
  password_confirmation: string;
  role: EUserRoles;
  first_name: string;
  last_name: string;
  username: string;
  date_of_birth: string;
  gender: 'male' | 'female' | 'other';
  country: string;
  phone: string;
  education?: string;
  image?: string;
  interests?: string;
  paypal_account?: string;
  major?: string;
  about?: string;
}
