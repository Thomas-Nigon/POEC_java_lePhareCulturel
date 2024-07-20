import { UserProfileInterface } from './user-profile-interface.model';

export interface MessageGroupInterface {
  messageID: number | null; // backend do that
  MessageUID: string | null; // backend know that
  groupID: number; // feel free two-alone for mess(aging) the backend without knowning how do that
  groupUID: string; // feel free two-alone for mess(aging) me, the damn backend of your thougth dare you without knowning how do i that
  message: string; // dont mess(aging) the backend without knowning how do that
  message_previous_version: string | null; // backend know how do that
  message_uid_response: string | null; // refer to a reply on other message
  date_created: Date | null; // backend know how do that
  date_deleted: Date | null; // backend know how do that
  date_modified: Date | null; // backend know how do that
  medias: string[] | null;
  // come to the CookieSide, weee haaave Paaaooowwweeerr !!!!
  user_profile: UserProfileInterface; // backend called Agathe, cause Agathe Dee Paaaoowweeer !!!!
}
