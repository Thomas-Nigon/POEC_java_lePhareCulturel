class EventParameters {
  constructor(
    public stringValue: string,
    public integerValue: number | null
  ) {}

  public getIntegerValue(): number {
    if (this.integerValue !== null) {
      return this.integerValue;
    }
    throw new Error('Integer value is null');
  }

  public getStringValue(): string {
    return this.stringValue;
  }
}

// TypeScript Class Equivalent for Java Enum
export class EventParametersConstants {
  public static readonly DEFAULT_PAGE_SIZE = new EventParameters('20', 20);
  public static readonly DEFAULT_PAGE_OFFSET = new EventParameters('0', 0);
  public static readonly FILTER_TAGS_NAME = new EventParameters('tags', null);
  public static readonly FILTER_NAME = new EventParameters('filters', null);
  public static readonly PAGE_SIZE = new EventParameters('pageSize', null);
  public static readonly PAGE_NUMBER = new EventParameters('pageNumber', null);
  public static readonly CATEGORY = new EventParameters('category', null);
  public static readonly CATEGORY_ID = new EventParameters('categoryId', null);
  public static readonly CATEGORY_NAME = new EventParameters('categoryName', null);
  public static readonly EVENT_ID = new EventParameters('eventId', null);
  public static readonly EVENT_NAME = new EventParameters('eventName', null);
  public static readonly EVENT_TYPE = new EventParameters('eventType', null);
  public static readonly EVENT_DATE = new EventParameters('eventDate', null);
  public static readonly EVENT_LOCATION = new EventParameters('eventLocation', null);
  public static readonly EVENT_DATE_TIME_BEGIN = new EventParameters('eventDateTimeBegin', null);
  public static readonly EVENT_DATE_TIME_END = new EventParameters('eventDateTimeEnd', null);

  public static values(): EventParameters[] {
    return [
      EventParametersConstants.DEFAULT_PAGE_SIZE,
      EventParametersConstants.DEFAULT_PAGE_OFFSET,
      EventParametersConstants.FILTER_TAGS_NAME,
      EventParametersConstants.FILTER_NAME,
      EventParametersConstants.PAGE_SIZE,
      EventParametersConstants.PAGE_NUMBER,
      EventParametersConstants.CATEGORY,
      EventParametersConstants.CATEGORY_ID,
      EventParametersConstants.CATEGORY_NAME,
      EventParametersConstants.EVENT_ID,
      EventParametersConstants.EVENT_NAME,
      EventParametersConstants.EVENT_TYPE,
      EventParametersConstants.EVENT_DATE,
      EventParametersConstants.EVENT_LOCATION,
      EventParametersConstants.EVENT_DATE_TIME_BEGIN,
      EventParametersConstants.EVENT_DATE_TIME_END,
    ];
  }

  public static isValidConstant(potentialConstant: string): boolean {
    return this.values().findIndex(eventParam => eventParam.stringValue === potentialConstant) !== -1;
  }

  private constructor() {}
}
