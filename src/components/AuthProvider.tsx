"use client"
import { ObjectId } from 'bson'; // Import ObjectId from bson package
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

export type UserInfo = {
    id: ObjectId;
    name: string;
    email: string;
    password: string;
};



export type AuthInfoProp = {
    user: UserInfo | null; // Change user initial state to null
    setUser: React.Dispatch<React.SetStateAction<UserInfo | null>>; // Update setUser type
    error: string;
    loading: boolean;
    logout(): Promise<void>;
    logMessage: string;
};

const AuthContext = createContext<AuthInfoProp | null>(null);

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserInfo | null>(null); // Initialize user state as null
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [logMessage, setLogmessage] = useState('');


    console.log("authprovider",{user,error,loading,logMessage})

    const router = useRouter()

    const fetchUser = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/user');
            if (!response.ok) {
                const error = await response.json();
                setError(error.message);
                setLoading(false);
                router.replace('/login')
                return;
            }

            const data = await response.json();
            console.log('user data from cookie-->', data?.data);
            setUser(data?.data);
            setLoading(false);
        } catch (err: any) {
            console.log(err.message);
            setLoading(false);
        }
    };

    const privatePath = ["/","/about"];
    const pathName = usePathname()

    useEffect(() => {
        if(privatePath.includes(pathName)){
            fetchUser()
        } else {
            setUser(null)
        }
    }, [pathName]);

    if (!loading) {
        console.log("authprovider----->",user);
    }

    async function logout() {
        try {
            const response = await fetch('/api/logout');
            if (!response.ok) {
                const errorData = await response.json();
                setLogmessage(errorData?.message);
                return;
            }
            const logoutData = await response.json();
            setUser(null)
            setLogmessage(logoutData?.message);
            router.replace("/login")
           
        } catch (err: any) {
            console.log('client error caught', err.message);
        }
    }

    const authInfo = {
        user,
        setUser,
        error,
        loading,
        logMessage,
        logout,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
