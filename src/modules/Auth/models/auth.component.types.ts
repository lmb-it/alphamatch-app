/**
 * Auth component types — extracted from WelcomeScreen
 */
import type {IIconProps} from '@lmb-it/kitsconcerto';

export type IntentChoice = 'findWork' | 'postJob' | 'both' | null;

export interface IntentOption {
  key: IntentChoice;
  icon: IIconProps['name'];
  labelKey: string;
  descKey: string;
}
