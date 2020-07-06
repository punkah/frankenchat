import React, { useContext, useState } from 'react';
import ThemeContext from '../context/ThemeContext';
import {
  DEFAULT_CLOCK_DISPLAY,
  DEFAULT_SEND_MESSAGES_ON_CTRL_ENTER,
  get_DEFAULT_USERNAME,
  Setting,
} from '../types/constants';
import { ClockDisplay, SendMessageOnCtrlEnter, Theme } from '../types/enums';
import './settings.scss';

const Settings = () => {
  const { theme, setTheme, resetTheme } = useContext(ThemeContext);
  const [settings, setSettings] = useState({
    [Setting.Username]:
      localStorage.getItem(Setting.Username) || get_DEFAULT_USERNAME(),
    [Setting.ClockDisplay]:
      localStorage.getItem(Setting.ClockDisplay) || DEFAULT_CLOCK_DISPLAY,
    [Setting.SendMessageOnCtrlEnter]:
      localStorage.getItem(Setting.SendMessageOnCtrlEnter) ||
      DEFAULT_SEND_MESSAGES_ON_CTRL_ENTER,
  });

  const handleChange = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target;
    setSettings((settings) => ({
      ...settings,
      [name]: value,
    }));
    localStorage.setItem(name, value);
  };

  const handleThemeChange = (event: { target: { value: string } }) => {
    setTheme(event?.target.value);
  };

  const reset = () => {
    const newSettings = {
      [Setting.Username]: get_DEFAULT_USERNAME(),
      [Setting.ClockDisplay]: DEFAULT_CLOCK_DISPLAY,
      [Setting.SendMessageOnCtrlEnter]: DEFAULT_SEND_MESSAGES_ON_CTRL_ENTER,
    };
    setSettings(newSettings);
    Object.keys(newSettings).forEach((setting) => {
      localStorage.setItem(setting, newSettings[setting]);
    });
    resetTheme();
  };

  return (
    <>
      <div className="settings">
        <div>
          <label htmlFor={Setting.Username}>User name</label>
          <input
            type="text"
            id={Setting.Username}
            value={settings[Setting.Username]}
            name={Setting.Username}
            onChange={handleChange}
          />
        </div>
        <div>
          <div>Interface color</div>
          <div>
            <input
              id={Theme.Light}
              type="radio"
              name={Setting.Theme}
              value={Theme.Light}
              onChange={handleThemeChange}
              checked={theme == Theme.Light}
            />
            <label htmlFor={Theme.Light}>{'Light'}</label>
            <input
              id={Theme.Dark}
              type="radio"
              name={Setting.Theme}
              value={Theme.Dark}
              onChange={handleThemeChange}
              checked={theme == Theme.Dark}
            />
            <label htmlFor={Theme.Dark}>{'Dark'}</label>
          </div>
        </div>
        <div>
          <div>Clock display</div>
          <div>
            <input
              id={ClockDisplay.Twelve}
              type="radio"
              name={Setting.ClockDisplay}
              value={ClockDisplay.Twelve}
              onChange={handleChange}
              checked={settings[Setting.ClockDisplay] == ClockDisplay.Twelve}
            />
            <label htmlFor={ClockDisplay.Twelve}>{'12 hours'}</label>
            <input
              id={ClockDisplay.TwentyFour}
              type="radio"
              name={Setting.ClockDisplay}
              value={ClockDisplay.TwentyFour}
              onChange={handleChange}
              checked={
                settings[Setting.ClockDisplay] == ClockDisplay.TwentyFour
              }
            />
            <label htmlFor={ClockDisplay.TwentyFour}>{'24 hours'}</label>
          </div>
        </div>
        <div>
          <div>Send messages on CTRL+ENTER</div>
          <div>
            <input
              id={SendMessageOnCtrlEnter.On}
              type="radio"
              name={Setting.SendMessageOnCtrlEnter}
              value={SendMessageOnCtrlEnter.On}
              onChange={handleChange}
              checked={
                settings[Setting.SendMessageOnCtrlEnter] ==
                SendMessageOnCtrlEnter.On
              }
            />
            <label htmlFor={SendMessageOnCtrlEnter.On}>{'On'}</label>
            <input
              id={SendMessageOnCtrlEnter.Off}
              type="radio"
              name={Setting.SendMessageOnCtrlEnter}
              value={SendMessageOnCtrlEnter.Off}
              onChange={handleChange}
              checked={
                settings[Setting.SendMessageOnCtrlEnter] ==
                SendMessageOnCtrlEnter.Off
              }
            />

            <label htmlFor={SendMessageOnCtrlEnter.Off}>{'Off'}</label>
          </div>
        </div>
      </div>
      <div className={'reset'}>
        <button onClick={reset}>Reset to defaults</button>
      </div>
    </>
  );
};

export default Settings;
