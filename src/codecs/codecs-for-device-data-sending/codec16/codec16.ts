import { Codec } from '../../codec';


export class Codec16 extends Codec {

  constructor(public reader, public number_of_records: number) {
    super(reader, number_of_records);
  }

  process() {
    super.process();
  }
}