import React, { useContext } from 'react';
import SettingsContext from '../context/SettingsContext';
import ThemeContext from '../context/ThemeContext';
import { Setting } from '../types/constants';
import { ClockDisplay, SendMessageOnCtrlEnter, Theme } from '../types/enums';
import './settings.scss';

const Settings = () => {
  const { theme, setTheme, resetTheme } = useContext(ThemeContext);
  const { getSetting, setSetting, resetSettings } = useContext(SettingsContext);

  const handleThemeChange = (event: { target: { value: string } }) => {
    setTheme(event?.target.value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSetting(name, value);
  };

  const reset = () => {
    resetSettings();
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
            value={getSetting(Setting.Username)}
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
              checked={getSetting(Setting.ClockDisplay) == ClockDisplay.Twelve}
            />
            <label htmlFor={ClockDisplay.Twelve}>{'12 hours'}</label>
            <input
              id={ClockDisplay.TwentyFour}
              type="radio"
              name={Setting.ClockDisplay}
              value={ClockDisplay.TwentyFour}
              onChange={handleChange}
              checked={
                getSetting(Setting.ClockDisplay) == ClockDisplay.TwentyFour
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
                getSetting(Setting.SendMessageOnCtrlEnter) ==
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
                getSetting(Setting.SendMessageOnCtrlEnter) ==
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
