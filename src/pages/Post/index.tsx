import {
  ArrowSquareUpRight,
  Calendar,
  CaretLeft,
  ChatTeardrop,
} from "phosphor-react";
import githubLogo from "../../assets/githubLogo.svg";
import { NavLink, useParams } from "react-router-dom";
import { useContext } from "react";
import { GithubDataContext } from "../../context/GithubDataContext";

export function Post() {
  const { number } = useParams();
  const { githubUserPost } = useContext(GithubDataContext); // Usando o contexto

  // Encontre o post correto baseado no número do parâmetro de URL
  const post = githubUserPost.find((post) => post.number === Number(number));

  if (!post) {
    return (
      <p className="text-center mt-8 text-base text-baseText">Carregando...</p>
    );
  }

  return (
    <main className="w-full max-w-[54rem] px-4 m-auto">
      <section className="bg-baseProfile -mt-16 px-6 sm:px-10 py-8 flex flex-col gap-6 justify-between rounded-xl shadow-shadowProfile relative z-10">
        <header className="flex w-full justify-between items-center">
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

        <div className="w-full text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl text-baseTitle font-bold">
            {post.title}
          </h1>
        </div>

        <footer className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-center sm:text-left">
          <div className="flex gap-2 items-center">
            <img src={githubLogo} alt="" />
            <span className="text-baseSpan hover:text-baseTitle">
              {post.user.login}
            </span>
          </div>

          <div className="flex gap-2 items-center">
            <Calendar size={16} color="#3a536b" weight="fill" />
            <span className="text-baseSpan hover:text-baseTitle">
              {new Date(post.created_at).toLocaleDateString()}
            </span>
          </div>

          <div className="flex gap-2 items-center">
            <ChatTeardrop size={16} color="#3a536b" weight="fill" />
            <span className="text-baseSpan hover:text-baseTitle">
              {post.comments} comments
            </span>
          </div>
        </footer>
      </section>

      <section className="p-4 sm:p-8 flex flex-col gap-4">
        <div className="text-baseText whitespace-pre-wrap">{post.body}</div>
      </section>
    </main>
  );
}
