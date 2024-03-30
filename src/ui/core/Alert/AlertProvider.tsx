import React, { createContext, PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AlertItem } from './AlertItem';
import { AlertItemType, AlertOptions } from './types';

const uid = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export type AlertContextType = (options: AlertOptions) => void;

export const AlertContext = createContext<AlertContextType | null>(null);

export const Provider = ({ children }: PropsWithChildren<any>) => {
  const [items, setItems] = useState<AlertItemType[]>([]);

  const fire = useCallback(
    ({
      tx,
      duration,
      level,
      options,
      onPress,
      noTimeoutBar = false,
      limit = null,
    }: AlertOptions) => {
      setItems(prev => {
        if (limit) {
          const count = prev.filter(i => i.level === level).length;
          if (count >= limit) return prev;
        }
        return [
          ...prev,
          {
            id: uid(),
            tx,
            duration,
            level,
            options,
            onPress,
            noTimeoutBar,
            limit,
          },
        ];
      });
    },
    [],
  );

  const contextValue = useMemo(() => {
    return fire;
  }, [fire]);

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
      <View pointerEvents="box-none" style={[styles.container]}>
        {items.map(item => (
          <AlertItem
            item={item}
            onRemoved={id => {
              setItems(prev => prev.filter(i => i.id !== id));
            }}
            key={item.id}
          />
        ))}
      </View>
    </AlertContext.Provider>
  );
};

export const AlertProvider = ({ children }: PropsWithChildren<any>) => {
  return <Provider>{children}</Provider>;
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    zIndex: 10,
    alignSelf: 'center',
    padding: 30,
  },
});
