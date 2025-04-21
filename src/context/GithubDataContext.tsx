import { ReactNode, createContext } from "react";

interface GithubDataContextType {
    fetchPostData: () => Promise<void>
    fetchUserData: () => Promise<void>
}

export const GithubDataContext = createContext({} as GithubDataContextType)

interface GithubDataProviderProps {
    children: ReactNode
}
export function GithubDataProvider ({children}: GithubDataProviderProps) {

    return(
        <GithubDataContext.Provider
        value={{})
        >
            {children}
        </GithubDataContext.Provider>
    )
}