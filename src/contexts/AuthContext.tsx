
"use client";

import type { ReactNode, Dispatch, SetStateAction } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import type { User as FirebaseUser } from 'firebase/auth';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  updateProfile
} from 'firebase/auth';
import type { UserProfile } from '@/lib/types';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  currentUser: UserProfile | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signup: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  setCurrentUser: Dispatch<SetStateAction<UserProfile | null>>; // To allow profile page to update context
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getInitials = (name: string) => {
  const names = name.split(' ');
  if (names.length > 1) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      if (user) {
        // Construct UserProfile from FirebaseUser
        // In a real app, you'd fetch this from Firestore
        const userProfile: UserProfile = {
          id: user.uid,
          name: user.displayName || user.email?.split('@')[0] || 'User',
          email: user.email || '',
          avatarUrl: user.photoURL || `https://placehold.co/100x100.png?text=${getInitials(user.displayName || user.email?.split('@')[0] || 'U')}`,
          bio: '', // Default empty bio
          interests: [], // Default empty
          skills: [], // Default empty
          courses: [], // Default empty
          groupMemberships: [], // Default empty
        };
        // TODO: Fetch full profile from Firestore here if it exists, otherwise use the constructed one.
        // For now, we'll just use the constructed one. If a user signs up, signup flow creates a more complete one.
        setCurrentUser(userProfile);

      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
    // onAuthStateChanged will handle setting currentUser and redirecting
  };

  const signup = async (name: string, email: string, pass: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    const fbUser = userCredential.user;
    if (fbUser) {
      await updateProfile(fbUser, { displayName: name, photoURL: `https://placehold.co/100x100.png?text=${getInitials(name)}` });
      // Create a new UserProfile for the context
      const newUserProfile: UserProfile = {
        id: fbUser.uid,
        name: name,
        email: fbUser.email!,
        avatarUrl: fbUser.photoURL || `https://placehold.co/100x100.png?text=${getInitials(name)}`,
        bio: 'Welcome to Nexus! Update your bio in your profile.',
        interests: ['Getting Started'],
        skills: ['Exploring'],
        courses: ['Nexus Orientation 101'],
        groupMemberships: [],
      };
      setCurrentUser(newUserProfile);
      setFirebaseUser(fbUser); // ensure firebaseUser state is also updated immediately
      // TODO: Save newUserProfile to Firestore collection `users` with document ID `fbUser.uid`
    }
  };

  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
    setFirebaseUser(null);
    router.push('/login');
  };

  const value = {
    currentUser,
    firebaseUser,
    loading,
    login,
    signup,
    logout,
    setCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
