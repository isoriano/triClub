import { File } from '@isg/files';

import { User } from './user.interface';

export class Profile {
  avatar: File;
  user: User;
  settings: unknown;
}
