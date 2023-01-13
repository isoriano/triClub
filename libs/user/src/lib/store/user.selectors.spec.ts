
import { User } from '../models';
import { userAdapter, UserPartialState, initialUserState } from './user.reducer';
import * as UserSelectors from './user.selectors';

describe('User Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getUserId = (it: User): string => it.uid;
  const createUserEntity = (uid: string, name = ''): User =>
    ({
      uid,
      name: name || `name-${uid}`,
      email: `email-${uid}`,
      dob: new Date()
    } as User);

  let state: UserPartialState;

  beforeEach(() => {
    const newLocal = createUserEntity('PRODUCT-AAA');
    state = {
      userStore: userAdapter.setOne(newLocal, {
        ...initialUserState,
        error: ERROR_MSG,
        loaded: true
      })
    };
  });

  describe('User Selectors', () => {

    it('selectEntity() should return the selected Entity', () => {
      const result = UserSelectors.selectUser(state) as User;
      const selId = getUserId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectUserLoaded() should return the current "loaded" status', () => {
      const result = UserSelectors.selectUserLoaded(state);

      expect(result).toBe(true);
    });

    it('selectUserError() should return the current "error" state', () => {
      const result = UserSelectors.selectUserError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
