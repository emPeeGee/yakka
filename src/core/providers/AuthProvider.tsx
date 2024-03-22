/* eslint-disable @typescript-eslint/no-var-requires */
import { useState, useEffect, createContext, useContext, useCallback } from 'react';

import { Session, User } from '@supabase/supabase-js';

import { supabase } from '@/api';
import { Loader } from '@/ui/core';
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
};

const initialValue: AuthContextType = {
  user: null,
  session: null,
  signOut: noop,
  loginWithToken: () => Promise.resolve(),
};

const AuthContext = createContext<AuthContextType>(initialValue);

type AuthProviderProps = {
  children?: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps): React.ReactNode => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider value={{ session, user: session?.user ?? null, signOut, loginWithToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
