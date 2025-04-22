import axios from "axios";
import { ReactNode, createContext, useEffect, useState } from "react";

interface GitHubUser {
  name: string;
  login: string;
  avatar_url: string;
  company: string;
  followers: number;
  bio: string;
}

interface GithubUserPost {
  title: string;
  body: string;
  id: string;
}

interface GithubDataContextType {
  githubUserData: GitHubUser | null;
  githubUserPost: GithubUserPost[];
}

export const GithubDataContext = createContext({} as GithubDataContextType);

interface GithubDataProviderProps {
  children: ReactNode;
}
export function GithubDataProvider({ children }: GithubDataProviderProps) {
  const [githubUserData, setGithubUserData] = useState<GitHubUser | null>(null);
  const [githubUserPost, setGithubUserPost] = useState<GithubUserPost[]>([]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/jalesnunes`
      );
      setGithubUserData(response.data);
    } catch (error) {
      console.error("Error: User not found", error);
    }
  };

  const fetchPostData = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/jalesnunes/githubBlog/issues`
      );
      setGithubUserPost(response.data);
    } catch (error) {
      console.error("Error: Posts not found", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchPostData();
  }, []);

  return (
    <GithubDataContext.Provider value={{ githubUserData, githubUserPost }}>
      {children}
    </GithubDataContext.Provider>
  );
}
