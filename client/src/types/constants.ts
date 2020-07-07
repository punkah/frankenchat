import socket from '../socket';
import { ClockDisplay, SendMessageOnCtrlEnter, Theme } from './enums';

const APP_PREFIX = 'frankenchat';
export const Setting = {
  Username: `${APP_PREFIX}.username`,
  Theme: `${APP_PREFIX}.theme`,
  ClockDisplay: `${APP_PREFIX}.clockdisplay`,
  SendMessageOnCtrlEnter: `${APP_PREFIX}.sendmessageonctrlenter`,
  Language: `${APP_PREFIX}.language`,
};

export const get_DEFAULT_USERNAME = () => socket?.id;
export const DEFAULT_THEME = window.matchMedia('(prefers-color-scheme: dark)')
  .matches
  ? Theme.Dark
  : Theme.Light;
export const DEFAULT_CLOCK_DISPLAY = ClockDisplay.Twelve;
export const DEFAULT_SEND_MESSAGES_ON_CTRL_ENTER = SendMessageOnCtrlEnter.Off;
