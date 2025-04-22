import { ArrowSquareUpRight, MagnifyingGlass } from "phosphor-react";
import githubLogo from "../../assets/githubLogo.svg";
import workplace from "../../assets/workplace.svg";
import userGroup from "../../assets/userGroup.svg";

import { useContext, useState } from "react";
import { GithubDataContext } from "../../context/GithubDataContext";

export function Home() {
  const { githubUserData, githubUserPost } = useContext(GithubDataContext);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  if (!githubUserData) {
    return <p>Loading...</p>;
  }

  if (!githubUserPost) {
    return <p>Loading...</p>;
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = githubUserPost.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <main className="w-[54rem] m-auto max-sm:w-fit">
      <section className="bg-baseProfile -mt-16 px-10 py-8 flex flex-row gap-6 items-center justify-between rounded-xl shadow-shadowProfile relative z-10 max-sm:mx-6">
        <img
          src={githubUserData.avatar_url}
          alt=""
          className="w-36 h-36 max-sm:w-16 max-sm:h-16"
        />
        <div className="flex flex-col gap-6">
          <header className=" flex items-center justify-between">
            <h1 className="text-2xl text-baseTitle font-bold max-sm:text-2xl">
              {githubUserData.name}
            </h1>
            <a
              href="https://github.com/jalesnunes"
              className="flex gap-2 hover:border-b  hover:border-b-blue"
              target="_blank"
            >
              <span className="text-xs text-blue">GITHUB</span>
              <ArrowSquareUpRight size={16} color="#3294f8" />
            </a>
          </header>

          <div>
            <p className="text-baseText max-sm:text-sm">{githubUserData.bio}</p>
          </div>

          <footer className="flex gap-4">
            <a href="" className="flex gap-2 items-center max-sm:text-xs">
              <img src={githubLogo} alt="" />
              <span className="text-baseSubtitle hover:text-baseTitle">
                {githubUserData.login}
              </span>
            </a>

            <a href="" className="flex gap-2 items-center max-sm:text-xs">
              <img src={workplace} alt="" />
              <span className="text-baseSubtitle hover:text-baseTitle">
                {githubUserData.company}
              </span>
            </a>

            <a href="" className="flex gap-2 items-center max-sm:text-xs">
              <img src={userGroup} alt="" />
              <span className="text-baseSubtitle hover:text-baseTitle">
                {githubUserData.followers} Followers
              </span>
            </a>
          </footer>
        </div>
      </section>

      <section className="mt-28 flex flex-col gap-3 max-sm:mt-28 max-sm:max-w-full max-sm:m-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg text-baseSubtitle font-bold">Publications</h2>
          <p className="text-sm text-baseSpan">
            {githubUserPost.length} publications
          </p>
        </div>
        <form className="flex gap-3" action="">
          <input
            className="flex-1 rounded-md bg-baseInput border-baseBorder border p-4 placeholder-baseLabel"
            type="text"
            placeholder="Search publications"
          />
          <button
            className="flex items-center gap-3 p-4 rounded-md font-bold bg-baseProfile border-baseBorder border text-baseTitle transition-colors hover:bg-basePost"
            type="submit"
          >
            <MagnifyingGlass size={20} />
            Search
          </button>
        </form>
      </section>

      <section className="mt-28 mb-10 grid grid-cols-2 gap-8 max-sm:grid-cols-1 ">
        {currentPosts.length === 0 ? (
          <h1>There are no posts registered.</h1>
        ) : (
          currentPosts.map((post) => (
            <div
              key={post.id}
              className="w-[26rem] h-64 bg-basePost p-8 overflow-hidden rounded-xl hover:outline hover:cursor-pointer hover:outline-baseBorder max-sm:w-fit max-sm:m-5"
            >
              <header className="flex items-start gap-3 justify-between">
                <h1 className="text-xl text-baseTitle font-bold">
                  {post.title}
                </h1>
                <span className="text-sm text-baseSpan whitespace-nowrap">
                  1 day ago
                </span>
              </header>

              <p className="text-baseText mt-8 line-clamp-3">{post.body}</p>
            </div>
          ))
        )}
      </section>

      {/* Botões de paginação */}
      <div className="mb-28 flex justify-center gap-4">
        <button
          className="px-4 py-2 rounded bg-blue-500 text-white disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="text-lg">{currentPage}</span>
        <button
          className="px-4 py-2 rounded bg-blue-500 text-white disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={indexOfLastPost >= githubUserPost.length}
        >
          Next
        </button>
      </div>
    </main>
  );
}
