export class Codec {
  avlObj: any = {};

  static get TRIP_EVENT_ID() {
    return 250;
  }

  static get TRIP_EVENT_START() {
    return 1;
  }


  static get TRIP_EVENT_END() {
    return 0;
  }

  constructor(
    protected reader: any,
    protected number_of_records: number
  ) {
    this.reader = reader;
    this.number_of_records = number_of_records;
  }

  public process() {
    (this as any).parseHeader();
  }

  public get avl() {
    return this.avlObj;
  }
}