
import React, { createContext, ReactNode, useState } from 'react';

interface User {
    id: number;
    name: string;
  }

interface UserContextType {
  // Define the properties of UserContextType here
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: {children: ReactNode}) => {
    // Define the state and functions here
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    
    return (
        <UserContext.Provider value={{ selectedUser, setSelectedUser }}>
        {children}
        </UserContext.Provider>
    );
    };

export const useUser = () => {
    const context = React.useContext(UserContext);
    if (!context) {
      throw new Error('useUser must be used within a UserProvider');
    }
    return context;
  }