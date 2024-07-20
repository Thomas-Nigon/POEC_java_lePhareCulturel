import { environment } from '../environments/environment';

export class RouteDefinition {
  public static Auth = class {
    public static readonly AUTH_TAG = '/auth';
    public static readonly UID_TAG = '/uid/{authuid}';
    public static readonly AUTH_URL = `${environment.apiUrl}${RouteDefinition.Auth.AUTH_TAG}`;
    public static readonly LOGIN_URL = `${RouteDefinition.Auth.AUTH_URL}/sign-in`;
    public static readonly REGISTER_URL = `${RouteDefinition.Auth.AUTH_URL}/sign-up`;
    public static readonly LOGOUT_URL = `${RouteDefinition.Auth.AUTH_URL}/logout`;
    public static readonly EMAIL_CONFIRMATION_URL = `${RouteDefinition.Auth.AUTH_URL}/confirm`;
  };

  public static Users = class {
    public static readonly USERS_TAG = '/users';
    public static readonly ID_TAG = '{userid}';
    public static readonly UID_TAG = '/uid/{groupuid}';
    public static readonly USERS_URL = `${environment.apiUrl}${RouteDefinition.Users.USERS_TAG}`;
    public static readonly PROFILE_URL = `${RouteDefinition.Users.USERS_URL}/profile`;
    public static readonly AVATAR_URL = `${RouteDefinition.Users.USERS_URL}/avatar`;
    public static readonly CHANGE_PASSWORD_URL = `${RouteDefinition.Users.USERS_URL}/new-password`;
    public static readonly RESET_PASSWORD_URL = `${RouteDefinition.Users.USERS_URL}/reset-password`;
    public static readonly TAGS_URL = `${RouteDefinition.Users.USERS_URL}/tags`;
    public static readonly AVATAR_LIST: string = `${RouteDefinition.Users.AVATAR_URL}/list`;
  };

  public static Groups = class {
    public static readonly GROUPS_TAG = '/groups';
    public static readonly ID_TAG = '{groupid}';
    public static readonly UID_TAG = '/uid/{groupuid}';
    public static readonly GROUPS_URL = `${environment.apiUrl}${RouteDefinition.Groups.GROUPS_TAG}`;
    public static readonly GROUPS_WITH_ID_URL = `${RouteDefinition.Groups.GROUPS_URL}/${RouteDefinition.Groups.ID_TAG}`;
    public static readonly TAGS_URL = `${RouteDefinition.Groups.GROUPS_URL}/tags`;
  };

  public static Events = class {
    public static readonly EVENTS_TAG = '/events';
    public static readonly ID_TAG = '{eventsid}';
    public static readonly UID_TAG = '/uid/{eventseuid}';
    public static readonly EVENTS_URL = `${environment.apiUrl}${RouteDefinition.Events.EVENTS_TAG}`;
    public static readonly EVENTS_BY_UID_TAG = `/events/${RouteDefinition.Events.UID_TAG}`;
    public static readonly EVENTS_WITH_ID_URL = `${RouteDefinition.Events.EVENTS_URL}/${RouteDefinition.Events.ID_TAG}`;
    public static readonly EVENTS_WITH_ID_GROUP_WITH_ID_URL = `${RouteDefinition.Events.EVENTS_URL}/${RouteDefinition.Events.ID_TAG}/${RouteDefinition.Groups.GROUPS_TAG}/${RouteDefinition.Groups.ID_TAG}`;
    public static readonly EVENTS_WITH_ID_GROUP_LIST_URL = `${RouteDefinition.Events.EVENTS_URL}/${RouteDefinition.Events.ID_TAG}/${RouteDefinition.Groups.GROUPS_TAG}`;
    public static readonly TAGS_URL = `${RouteDefinition.Events.EVENTS_URL}/tags/{filters}`;
    public static readonly TAGS_FILTER_URL = `${RouteDefinition.Events.EVENTS_URL}/filters/{tags}`;
    public static readonly FILTER_URL = `${RouteDefinition.Events.EVENTS_URL}/filters`;

    public static GROUP_MESSAGES = class {
      public static readonly MESSAGES_TAG = '/messages';
      public static readonly ID_TAG = '{messageid}';
      public static readonly UID_TAG = 'uid/{messageuid}';
      public static readonly MESSAGE_WITH_UID_TAG = `${RouteDefinition.Events.GROUP_MESSAGES.MESSAGES_TAG}/${RouteDefinition.Events.GROUP_MESSAGES.UID_TAG}`;
      public static readonly GROUP_WITH_UID_MESSAGES_LIST_URL = `${RouteDefinition.Events.EVENTS_WITH_ID_GROUP_WITH_ID_URL}${RouteDefinition.Events.GROUP_MESSAGES.MESSAGES_TAG}`;
      public static readonly GROUP_WITH_UID_USERS_LIST_URL = `${RouteDefinition.Events.EVENTS_WITH_ID_GROUP_WITH_ID_URL}${RouteDefinition.Users.USERS_TAG}`;
    };
  };

  public static Category = class {
    public static readonly CATEGORY_TAG = '/category';
    public static readonly ID_TAG = '{categoryid}';
    public static readonly UID_TAG = 'uid/{categoryuid}';
    public static readonly CATEGORY_URL = `${environment.apiUrl}${RouteDefinition.Category.CATEGORY_TAG}`;
    public static readonly CATEGORY_BY_UID = `${RouteDefinition.Category.CATEGORY_URL}/${RouteDefinition.Category.UID_TAG}`;
  };
}
