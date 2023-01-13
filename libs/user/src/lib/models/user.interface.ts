import { File } from '@isg/files';

export interface User {
  uid: string;
  name: string;
  email: string;
  dob: Date;
  avatarId?: string;
  avatar?: File;
}
