import { User } from '../user/user';
import { Session } from './session';

export interface UserSession {
    admin: User;
    session: Session;
}
