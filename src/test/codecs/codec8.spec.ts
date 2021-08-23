import { FmbParser } from '../../fmb-parser';
import { AvlRecord, AvlPacket } from '../../models';


const testFmbParser = () => {
  /**
   * Preamble – the packet starts with four zero bytes.
   Data Field Length – size is calculated starting from Codec ID to Number of Data 2.
   Codec ID – in Codec8 it is always 0x08.
   Number of Data 1 – a number which defines how many records are in the packet.
   AVL Data – actual data in the packet (more information below).
   Number of Data 2 – a number which defines how many records are in the packet. This number must be the same as “Number of Data 1”.
   CRC-16 – calculated from Codec ID to the Second Number of Data. CRC (Cyclic Redundancy Check) is an error-detecting code using for detect accidental changes to RAW data. For calculation we are using CRC-16/IBM.
   */
  const Preamble = '00000000' // 4 bytes of zeros
  const Data_Field_Length = '0000009C' // 4 bytes
  const Codec_ID = '08' // 1 byte
  const Number_Of_Data_1 = '01'; // 1 byte


  /**
   * Note: for FMB630, FMB640 and FM63XY, minimum AVL record size is 45 bytes (all IO elements disabled). Maximum AVL record size is 255 bytes. Maximum AVL packet size is 512 bytes.
   * For other devices, the minimum AVL record size is 45 bytes (all IO elements disabled). Maximum AVL packet size is 1280 bytes.
   */
  const getAvlTestData = () => {

    /**
     * Timestamp – a difference, in milliseconds, between the current time and midnight, January, 1970 UTC (UNIX time).
     Priority – field which define AVL data priority (more information below).
     GPS Element – location information of the AVL data (more information below).
     IO Element – additional configurable information from device (more information below).
     *
     * */
    const Timestamp = '00000176BB09C2CD'; // 8 bytes
    const Priority = '00'; // 1 byte

    const getGpsElementTestData = () => {

      /**
       * Longitude – east – west position.
       Latitude – north – south position.
       Altitude – meters above sea level.
       Angle – degrees from north pole.
       Satellites – number of satellites in use.
       Speed – speed calculated from satellites.
       Note: Speed will be 0x0000 if GPS data is invalid.
       */

        // Longitude and latitude are integer values built from degrees, minutes, seconds and milliseconds by formula:
        // ( d + (m / 60) + (s / 3600) + (ms / 3600000 ) * p
        // Where:
        // d – Degrees; m – Minutes; s – Seconds; ms – Milliseconds; p – Precision (10000000)
        // If longitude is in west or latitude in south, multiply result by –1.
        //
        // Note:
        // To determine if the coordinate is negative, convert it to binary format and check the very first bit. If it is 0, coordinate is positive, if it is 1, coordinate is negative.
        // Example:
        // Received value: 20 9C CA 80 converted to BIN: 00100000 10011100 11001010 10000000 first bit is 0, which means coordinate is positive converted to DEC: 547146368. For more information see two‘s complement arithmetic.
      const Longitude = '05DBE638'; // 4 bytes
      const Latitude = '1B231893'; // 4 bytes
      const Altitude = '006A'; // 2 bytes
      const Angle = '010B'; // 2 bytes
      const Satellites = '13'; // 1 byte
      const Speed = '0000'; // 2 bytes
      return Longitude + Latitude + Altitude + Angle + Satellites + Speed;
    }


    const GPS_Element = getGpsElementTestData(); // 15 bytes

    const getIoElementsTestData = () => {

      /**
       * 	Event IO ID – if data is acquired on event – this field defines which IO property has changed and generated an event. For example, when if Ignition state changed and it generate event, Event IO ID will be 0xEF (AVL ID: 239). If it’s not eventual record – the value is 0.
       N – a total number of properties coming with record (N = N1 + N2 + N4 + N8).
       N1 – number of properties, which length is 1 byte.
       N2 – number of properties, which length is 2 bytes.
       N4 – number of properties, which length is 4 bytes.
       N8 – number of properties, which length is 8 bytes.
       N’th IO ID - AVL ID.
       N’th IO Value - AVL ID value.
       */
      const Event_IO_ID = '00'; // 1 byte
      const N_Of_Total_IO = '25'; // 1 byte
      const N1_Of_One_Byte_IO = '10'; // 1 byte
      const First_IO_ID = '01'; // 1 byte
      const First_IO_Value = '00'; // 1 byte
      const N = Event_IO_ID + N_Of_Total_IO + N1_Of_One_Byte_IO + First_IO_ID + First_IO_Value;
      // ----------------------------------
      // N1

      const N1Th_IO_ID = '02'; // 1 byte
      const N1Th_IO_Value = '00'; // 1 byte
      const N2_Of_Two_Bytes = '03'; // 1 byte
      const N1_First_IO_ID = '01'; // 1 byte
      const N1_First_IO_Value = '0400'; // 2 byte

      const N1 = N1Th_IO_ID + N1Th_IO_Value + N2_Of_Two_Bytes + N1_First_IO_ID + N1_First_IO_Value;


      // ----------------------------------
      // N2
      const N2Th_IO_ID = 'B3'; // 1 byte
      const N2Th_IO_Value = '00B4'; // 2 byte
      const N4_Of_Four_Bytes = '00'; // 1 byte
      const N2_First_IO_ID = '32'; // 1 byte
      const N2_First_IO_Value = '00330016'; // 4 byte

      const N2 = N2Th_IO_ID + N2Th_IO_Value + N4_Of_Four_Bytes + N2_First_IO_ID + N2_First_IO_Value;

      // ----------------------------------
      // N4

      const N4Th_IO_ID = '04'; // 1 byte
      const N4Th_IO_Value = '4703F000'; // 4 byte
      const N8_Of_Eight_Bytes = '15'; // 1 byte
      const N4_First_IO_ID = '04'; // 1 byte
      const N4_First_IO_Value = 'B201C800EF009001'; // 8 byte

      const N4 = N4Th_IO_ID + N4Th_IO_Value + N8_Of_Eight_Bytes + N4_First_IO_ID + N4_First_IO_Value;

      // ----------------------------------
      // N8
      const N8_IO_ID = '0F'; // 1 byte
      const N8_IO_Value = '0900270A000A0B00'; // 8 byte

      const N8 = N8_IO_ID + N8_IO_Value;
      return N + N1 + N2 + N4 + N8;
    }
    const IoElements = getIoElementsTestData() + '17F5000A432683440000B50008B6000642620918000046009DCE274DECFC53EDFF9BEEFF1202F1000056C2CD000096F104DA0000D546CACF39A3DB3839343435303233DC3132313930303533DD3437330000000000'; // x bytes
    return Timestamp + Priority + GPS_Element + IoElements;
  }
  const Avl_Data = getAvlTestData(); // 45 - 256 bytes at most



  const Number_Of_Data_2 = '01'; // 1 byte
  const CRC_16 = '000013D1'; // Last 4 bytes
  let packet = Preamble + Data_Field_Length + Codec_ID + Number_Of_Data_1 + Avl_Data + Number_Of_Data_2 + CRC_16;

  const buff = Buffer.from(packet, 'hex');
  const fmbParser = new FmbParser(buff);
  const avl: AvlPacket = fmbParser.avl;
  return new AvlPacket(
    avl.records,
    avl.zero,
    avl.data_length,
    avl.codec_id,
    avl.number_of_data,
    avl.number_of_data2,
    avl.CRC
  );
}

describe("Codec 8 parsing packets", () => {

  it('should parse avl packet correctly', () => {
      const avlPacket: AvlPacket = testFmbParser();

    // console.log(avlPacket);
    for (let i = 0; i < avlPacket.records.length; i++) {
      const avlRecord: AvlRecord = avlPacket.records[i];
      console.log(avlRecord)
      const avlInstance = new AvlRecord(
        avlRecord.priority,
        avlRecord.timestamp,
        avlRecord.gps,
        avlRecord.event_id,
        avlRecord.properties_count,
        avlRecord.ioElements
      )
      // avlInstance.print();
    }


    expect(avlPacket).toBeDefined();

  });
})