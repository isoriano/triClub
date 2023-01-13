import { File } from '@isg/files';

import { User } from './user.interface';

export interface UserHttpResponse {
  user: User;
  avatar?: File;
}
