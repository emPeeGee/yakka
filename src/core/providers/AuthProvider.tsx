/* eslint-disable @typescript-eslint/no-var-requires */
import { useState, useEffect, createContext, useContext, useCallback } from 'react';

import { Session, User } from '@supabase/supabase-js';
import { SheetManager } from 'react-native-actions-sheet';

import { supabase } from '@/api';
import { noop } from '../utils';

type Tokens = {
  access_token: string;
  refresh_token: string;
};

type AuthContextType = {
  user: User | null;
  session: Session | null;
  signOut: (callback: VoidFunction) => void;
  loginWithToken: (credentials: Tokens) => Promise<void>;
  withAccessControl: (cb1: VoidFunction, cb2: VoidFunction) => () => Promise<void>;
};

const initialValue: AuthContextType = {
  user: null,
  session: null,
  signOut: noop,
  loginWithToken: () => Promise.resolve(),
  withAccessControl: () => () => Promise.resolve(),
};

const AuthContext = createContext<AuthContextType>(initialValue);

type AuthProviderProps = {
  loadingIndicator: React.ReactNode; // TO prevent cycle
  children?: React.ReactNode;
};

export const AuthProvider = ({
  children,
  loadingIndicator,
}: AuthProviderProps): React.ReactNode => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoading(true);
      setSession(session);
      setIsLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoading(true);
      setSession(session);
      setIsLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
      setIsLoading(false);
    };
  }, []);

  const signOut = useCallback(async (callback: VoidFunction) => {
    await supabase.auth.signOut();
    callback();
  }, []);

  const loginWithToken = useCallback(async ({ access_token, refresh_token }: Tokens) => {
    const signIn = async () => {
      await supabase.auth.setSession({
        access_token,
        refresh_token,
      });

      return await supabase.auth.refreshSession();
    };

    const {
      data: { session },
    } = await signIn();

    setSession(session);
  }, []);

  const withAccessControl = useCallback(
    (originalFunction: VoidFunction, onCreateProfile: VoidFunction) => {
      return async () => {
        if (session?.user) {
          originalFunction();
          return;
        }

        await SheetManager.show('unlock-full-access-sheet', {
          payload: {
            onCreateProfile,
          },
        });
      };
    },
    [session?.user],
  );

  if (isLoading) {
    return loadingIndicator;
  }

  return (
    <AuthContext.Provider
      value={{ session, user: session?.user ?? null, signOut, loginWithToken, withAccessControl }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
