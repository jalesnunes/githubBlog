import {
  ArrowSquareUpRight,
  Calendar,
  CaretLeft,
  ChatTeardrop,
} from "phosphor-react";

import githubLogo from "../../assets/githubLogo.svg";
import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";



interface GithubPost {
  title: string;
  body: string;
  created_at: string;
  comments: number;
  user: {
    login: string;
  };
  html_url: string;
}

export function Post() {
  const { number } = useParams();
  const [post, setPost] = useState<GithubPost | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/jalesnunes/githubBlog/issues/${number}`
        );
        setPost(response.data);
      } catch (error) {
        console.error("Erro ao carregar post:", error);
      }
    };

    fetchPost();
  }, [number]);

  if (!post) {
    return <p className="text-center mt-8 text-base text-baseText">Carregando...</p>;
  }

  return (
    <main className="w-[54rem] m-auto">
      <section className="bg-baseProfile -mt-16 px-10 py-8 flex flex-col gap-6 justify-between rounded-xl shadow-shadowProfile relative z-10">
        <header className="flex justify-between items-center">
          <NavLink to="/" className="flex gap-3 items-center">
            <CaretLeft size={16} color="#3294f8" />
            <span className="text-xs text-blue">BACK</span>
          </NavLink>

          <a
            href={post.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-3 items-center hover:border-b hover:border-b-blue"
          >
            <span className="text-xs text-blue">SEE ON GITHUB</span>
            <ArrowSquareUpRight size={16} color="#3294f8" />
          </a>
        </header>

        <div>
          <h1 className="text-2xl text-baseTitle font-bold">{post.title}</h1>
        </div>

        <footer className="flex gap-4">
          <div className="flex gap-2 items-center">
            <img src={githubLogo} alt="" />
            <span className="text-baseSpan hover:text-baseTitle">{post.user.login}</span>
          </div>

          <div className="flex gap-2 items-center">
            <Calendar size={16} color="#3a536b" weight="fill" />
            <span className="text-baseSpan hover:text-baseTitle">
              {new Date(post.created_at).toLocaleDateString()}
            </span>
          </div>

          <div className="flex gap-2 items-center">
            <ChatTeardrop size={16} color="#3a536b" weight="fill" />
            <span className="text-baseSpan hover:text-baseTitle">{post.comments} comments</span>
          </div>
        </footer>
      </section>

      <section className="p-8 flex flex-col gap-4">
        <div className="text-baseText whitespace-pre-wrap">{post.body}</div>
      </section>
    </main>
  );
}

