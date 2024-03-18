/* eslint-disable @typescript-eslint/no-var-requires */
import { useState, useEffect, createContext, useContext, useCallback } from 'react';

import { Session, User } from '@supabase/supabase-js';

import { supabase } from '@/api';
import { Loader } from '@/ui/core';
import { noop } from '../utils';

type AuthContextType = {
  user: User | null;
  signOut: (callback: VoidFunction) => void;
};

const initialValue: AuthContextType = {
  user: null,
  signOut: noop,
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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider value={{ user: session?.user ?? null, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
