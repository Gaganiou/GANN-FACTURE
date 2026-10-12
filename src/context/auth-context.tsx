"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { User, Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isDemo: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, metadata?: { name?: string; company?: string }) => Promise<{ error: any; data?: any }>;
  signOut: () => Promise<void>;
  continueAsDemo: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDemo, setIsDemo] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // 1. Check if user is in demo mode from localStorage
    const savedDemo = typeof window !== "undefined" ? localStorage.getItem("izifacture_demo_mode") : null;
    if (savedDemo === "true") {
      setIsDemo(true);
    }

    // 2. Fetch current session from Supabase Auth
    async function getInitialSession() {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (session) {
          setSession(session);
          setUser(session.user);
          setIsDemo(false);
          if (typeof window !== "undefined") localStorage.removeItem("izifacture_demo_mode");
        }
      } catch (err) {
        console.error("Erreur lors de la récupération de la session:", err);
      } finally {
        setIsLoading(false);
      }
    }

    getInitialSession();

    // 3. Listen to auth state changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session) {
          setIsDemo(false);
          if (typeof window !== "undefined") localStorage.removeItem("izifacture_demo_mode");
        }
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (!error && data.session) {
      setSession(data.session);
      setUser(data.user);
      setIsDemo(false);
      if (typeof window !== "undefined") localStorage.removeItem("izifacture_demo_mode");
    }
    setIsLoading(false);
    return { error };
  };

  const signUp = async (email: string, password: string, metadata?: { name?: string; company?: string }) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: metadata?.name || "",
          company: metadata?.company || "",
        },
      },
    });
    if (!error && data.session) {
      setSession(data.session);
      setUser(data.user);
      setIsDemo(false);
      if (typeof window !== "undefined") localStorage.removeItem("izifacture_demo_mode");
    }
    setIsLoading(false);
    return { error, data };
  };

  const signOut = async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setIsDemo(false);
    if (typeof window !== "undefined") localStorage.removeItem("izifacture_demo_mode");
    setIsLoading(false);
    router.push("/");
  };

  const continueAsDemo = () => {
    setIsDemo(true);
    if (typeof window !== "undefined") localStorage.setItem("izifacture_demo_mode", "true");
    router.push("/dashboard");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isDemo,
        signIn,
        signUp,
        signOut,
        continueAsDemo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
