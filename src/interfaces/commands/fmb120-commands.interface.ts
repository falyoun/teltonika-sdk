import { Fmb120CommonCommandsInterface } from './fmb120-common-commands.interface';
import { Fmb120BluetoothCommandsInterface } from './fmb120-bluetooth-commands.interface';
import { Fmb120FeaturesCommandsInterface } from './fmb120-features-commands.interface';
import { Fmb120ObdCommandsInterface } from './fmb120-obd-commands.interface';
import { Fmb120CanAdapterInterface } from './fmb120-can-adapter.interface';


export interface Fmb120CommandsInterface {
  common: Fmb120CommonCommandsInterface;
  bluetooth: Fmb120BluetoothCommandsInterface;
  featuresCommands: Fmb120FeaturesCommandsInterface;
  obd: Fmb120ObdCommandsInterface;
  canAdapter: Fmb120CanAdapterInterface;
}