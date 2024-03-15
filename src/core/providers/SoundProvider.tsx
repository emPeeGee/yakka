/* eslint-disable @typescript-eslint/no-var-requires */
import { useState, useEffect, createContext, useContext, useCallback } from 'react';

import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';

import { rootLog } from '../logger';
import { getItem, setItem } from '../storage';
import { noop } from '../utils';

const IS_SOUND_ENABLED_KEY = 'IS_SOUND_ENABLED';

type SoundType = 'correct' | 'incorrect' | 'lessonSuccess' | 'lessonFail';

type SoundCallbackType = (b: boolean) => void | undefined;

// NOTE: Mapped type
type SoundContextType = {
  setIsSoundEnabled: (enabled: boolean, callback: SoundCallbackType) => void;
  isSoundEnabled: boolean;
  playSound: (type: SoundType) => void;
};

const initialValue: SoundContextType = {
  isSoundEnabled: true,
  setIsSoundEnabled: noop,
  playSound: noop,
};

const SoundContext = createContext<SoundContextType>(initialValue);

type SoundProviderProps = {
  children?: React.ReactNode;
};

export const SoundProvider = ({ children }: SoundProviderProps): React.ReactNode => {
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(initialValue.isSoundEnabled);
  const [sounds, setSounds] = useState<Sound[]>([]);

  useEffect(() => {
    Promise.all([
      Audio.Sound.createAsync(require('../../assets/sounds/error.wav')),
      Audio.Sound.createAsync(require('../../assets/sounds/success.wav')),
      Audio.Sound.createAsync(require('../../assets/sounds/win.wav')),
      Audio.Sound.createAsync(require('../../assets/sounds/gameover.wav')),
    ]).then(values => {
      setSounds(values.map(s => s.sound));
      rootLog.info('Sounds are loaded');
    });

    return sounds
      ? () => {
          rootLog.info('Unloading sounds');
          sounds.forEach(s => s.unloadAsync());
        }
      : undefined;
  }, []);

  // IDEA: make it promise for optimization ?
  const setSoundEnabled = useCallback((enabled: boolean, callback: SoundCallbackType) => {
    setIsSoundEnabled(() => {
      // setIsSoundEnabled(enabled);
      callback(enabled);
      setItem(IS_SOUND_ENABLED_KEY, enabled);

      return enabled;
    });
  }, []);

  const play = useCallback(
    async (type: SoundType) => {
      try {
        switch (type) {
          case 'incorrect':
            await sounds[0].setPositionAsync(0);
            await sounds[0].playAsync();
            break;
          case 'correct':
            await sounds[1].setPositionAsync(0);
            await sounds[1].playAsync();
            break;
          case 'lessonSuccess':
            await sounds[2].setPositionAsync(0);
            await sounds[2].playAsync();
            break;
          case 'lessonFail':
            await sounds[3].setPositionAsync(0);
            await sounds[3].playAsync();
            break;
        }
      } catch (e) {
        // TODO: treat
        console.log(e);
      }
    },
    [sounds],
  );

  rootLog.info('is sound', isSoundEnabled);

  const playSound = useCallback(
    (type: SoundType) => {
      return isSoundEnabled ? play(type) : noop();
    },
    [play, isSoundEnabled],
  );

  useEffect(() => {
    (async () => {
      getItem<boolean>(IS_SOUND_ENABLED_KEY).then(async item => {
        setIsSoundEnabled(item === null ? true : item);
      });
    })();
  }, []);

  rootLog.info(`isSoundAvailable = ${isSoundEnabled}`);

  return (
    <SoundContext.Provider
      value={{
        isSoundEnabled,
        setIsSoundEnabled: setSoundEnabled,
        playSound,
      }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
