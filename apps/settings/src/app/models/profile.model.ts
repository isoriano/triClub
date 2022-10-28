import { User } from '@tri-club/user';

import { File } from '@isg/files';


export class Profile {
  avatar: File;
  user: User;
  settings: unknown;
}
