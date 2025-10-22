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
  id: number;
  number: number;
  title: string;
  body: string;
  created_at: string;
  comments: number;
  user: {
    login: string;
  };
  html_url: string;
}

interface GithubDataContextType {
  githubUserData: GitHubUser | null;
  githubUserPost: GithubUserPost[];
  searchPosts: (query: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const GithubDataContext = createContext({} as GithubDataContextType);

interface GithubDataProviderProps {
  children: ReactNode;
}

// Configurações do GitHub
const GITHUB_USERNAME = "jalesnunes";
const GITHUB_REPO = "githubBlog";
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN; // Opcional: adicione no .env

export function GithubDataProvider({ children }: GithubDataProviderProps) {
  const [githubUserData, setGithubUserData] = useState<GitHubUser | null>(null);
  const [githubUserPost, setGithubUserPost] = useState<GithubUserPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Configuração do axios com token (se disponível)
  const api = axios.create({
    baseURL: "https://api.github.com",
    headers: GITHUB_TOKEN
      ? { Authorization: `token ${GITHUB_TOKEN}` }
      : undefined,
  });

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.get(`/users/${GITHUB_USERNAME}`);
      setGithubUserData(response.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error: User not found", error);
      if (error.response?.status === 403) {
        setError("Rate limit excedido. Tente novamente mais tarde.");
      } else {
        setError("Erro ao carregar dados do usuário.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPostData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.get(
        `/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/issues`
      );
      setGithubUserPost(response.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error: Posts not found", error);
      if (error.response?.status === 403) {
        setError("Rate limit excedido. Tente novamente mais tarde.");
      } else {
        setError("Erro ao carregar posts.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const searchPosts = async (query: string) => {
    try {
      setIsLoading(true);
      setError(null);

      if (!query.trim()) {
        // Se não houver busca, carrega todas as issues
        await fetchPostData();
        return;
      }

      // Busca usando a Search API
      const response = await api.get(
        `/search/issues?q=${encodeURIComponent(
          query
        )}+repo:${GITHUB_USERNAME}/${GITHUB_REPO}`
      );

      setGithubUserPost(response.data.items);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error searching posts", error);
      if (error.response?.status === 403) {
        setError("Rate limit excedido. Tente novamente mais tarde.");
      } else {
        setError("Erro ao buscar posts.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchPostData();
  }, []);

  return (
    <GithubDataContext.Provider
      value={{ githubUserData, githubUserPost, searchPosts, isLoading, error }}
    >
      {children}
    </GithubDataContext.Provider>
  );
}
