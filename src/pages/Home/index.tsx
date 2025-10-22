import { ArrowSquareUpRight, MagnifyingGlass } from "phosphor-react";
import githubLogo from "../../assets/githubLogo.svg";
import workplace from "../../assets/workplace.svg";
import userGroup from "../../assets/userGroup.svg";

import { useContext, useState, useCallback, FormEvent } from "react";
import { GithubDataContext } from "../../context/GithubDataContext";
import { Link } from "react-router-dom";

// Função para calcular tempo relativo
function getRelativeTime(dateString: string): string {
  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}

// Hook para debounce
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useDebounce<T extends (...args: any[]) => unknown>(
  callback: T,
  delay: number
) {
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      const id = window.setTimeout(() => {
        // cast to any to avoid contravariance issues when caller provides specific parameter types
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        void (callback as (...args: any[]) => unknown)(...args);
      }, delay);
      setTimeoutId(id);
    },
    [callback, delay, timeoutId]
  );
}

export function Home() {
  const { githubUserData, githubUserPost, searchPosts, isLoading, error } =
    useContext(GithubDataContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const postsPerPage = 4;

  // Debounce da busca (500ms)
  const debouncedSearch = useDebounce((query: string) => {
    searchPosts(query);
    setCurrentPage(1); // Reseta para primeira página
  }, 500);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    debouncedSearch(value);
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    searchPosts(searchQuery);
    setCurrentPage(1);
  };

  if (error) {
    return (
      <main className="w-[54rem] m-auto max-sm:w-fit">
        <div className="text-center mt-8 text-red-500">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue rounded"
          >
            Tentar novamente
          </button>
        </div>
      </main>
    );
  }

  if (!githubUserData) {
    return (
      <main className="w-[54rem] m-auto max-sm:w-fit">
        <p className="text-center mt-8">Loading user data...</p>
      </main>
    );
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = githubUserPost.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <main className="w-[54rem] m-auto max-sm:w-fit">
      <section className="bg-baseProfile -mt-16 px-10 py-8 flex flex-row gap-6 items-center justify-between rounded-xl shadow-shadowProfile relative z-10 max-sm:mx-6">
        <img
          src={githubUserData.avatar_url}
          alt={`${githubUserData.name}'s avatar`}
          className="w-36 h-36 max-sm:w-16 max-sm:h-16 rounded-lg"
        />
        <div className="flex flex-col gap-6">
          <header className="flex items-center justify-between">
            <h1 className="text-2xl text-baseTitle font-bold max-sm:text-2xl">
              {githubUserData.name}
            </h1>
            <a
              href={`https://github.com/${githubUserData.login}`}
              className="flex gap-2 hover:border-b hover:border-b-blue transition-all"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver perfil no GitHub"
            >
              <span className="text-xs text-blue font-bold">GITHUB</span>
              <ArrowSquareUpRight size={16} color="#3294f8" weight="bold" />
            </a>
          </header>

          <div>
            <p className="text-baseText max-sm:text-sm">{githubUserData.bio}</p>
          </div>

          <footer className="flex gap-4 flex-wrap">
            <div className="flex gap-2 items-center max-sm:text-xs">
              <img src={githubLogo} alt="GitHub icon" />
              <span className="text-baseSubtitle hover:text-baseTitle transition-colors">
                {githubUserData.login}
              </span>
            </div>

            {githubUserData.company && (
              <div className="flex gap-2 items-center max-sm:text-xs">
                <img src={workplace} alt="Company icon" />
                <span className="text-baseSubtitle hover:text-baseTitle transition-colors">
                  {githubUserData.company}
                </span>
              </div>
            )}

            <div className="flex gap-2 items-center max-sm:text-xs">
              <img src={userGroup} alt="Followers icon" />
              <span className="text-baseSubtitle hover:text-baseTitle transition-colors">
                {githubUserData.followers} Followers
              </span>
            </div>
          </footer>
        </div>
      </section>

      <section className="mt-28 flex flex-col gap-3 max-sm:mt-28 max-sm:max-w-full max-sm:m-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg text-baseSubtitle font-bold">Publications</h2>
          <p className="text-sm text-baseSpan">
            {githubUserPost.length} publication
            {githubUserPost.length !== 1 ? "s" : ""}
          </p>
        </div>
        <form className="flex gap-3" onSubmit={handleSearchSubmit}>
          <input
            className="flex-1 rounded-md bg-baseInput border-baseBorder border p-4 placeholder-baseLabel text-baseText"
            type="text"
            placeholder="Search publications"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            aria-label="Search publications"
          />
          <button
            className="flex items-center gap-3 p-4 rounded-md font-bold bg-baseProfile border-baseBorder border text-baseTitle transition-colors hover:bg-basePost disabled:opacity-50"
            type="submit"
            disabled={isLoading}
            aria-label="Search button"
          >
            <MagnifyingGlass size={20} />
            {isLoading ? "Searching..." : "Search"}
          </button>
        </form>
      </section>

      <section className="mt-12 mb-10 grid grid-cols-2 gap-8 max-sm:grid-cols-1">
        {isLoading ? (
          <div className="col-span-2 text-center py-8">
            <p className="text-baseText">Loading posts...</p>
          </div>
        ) : currentPosts.length === 0 ? (
          <div className="col-span-2 text-center py-8">
            <h3 className="text-xl text-baseTitle mb-2">No posts found</h3>
            <p className="text-baseText">
              {searchQuery
                ? "Try searching with different keywords"
                : "There are no posts registered yet"}
            </p>
          </div>
        ) : (
          currentPosts.map((post) => (
            <Link
              to={`/post/${post.number}`}
              key={post.id}
              className="w-full h-64 bg-basePost p-8 overflow-hidden rounded-xl hover:outline hover:cursor-pointer hover:outline-baseBorder transition-all max-sm:w-fit max-sm:m-5"
              aria-label={`Read post: ${post.title}`}
            >
              <header className="flex items-start gap-3 justify-between">
                <h3 className="text-xl text-baseTitle font-bold line-clamp-2">
                  {post.title}
                </h3>
                <span className="text-sm text-baseSpan whitespace-nowrap">
                  {getRelativeTime(post.created_at)}
                </span>
              </header>

              <p className="text-baseText mt-5 line-clamp-4">{post.body}</p>
            </Link>
          ))
        )}
      </section>

      {/* Paginação */}
      {githubUserPost.length > postsPerPage && (
        <div className="mb-28 flex justify-center gap-4 items-center">
          <button
            className="px-4 py-2 rounded bg-blue text-white font-bold disabled:opacity-50 hover:bg-opacity-80 transition-all"
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1 || isLoading}
            aria-label="Previous page"
          >
            Previous
          </button>
          <span className="text-lg text-baseText">
            Page {currentPage} of{" "}
            {Math.ceil(githubUserPost.length / postsPerPage)}
          </span>
          <button
            className="px-4 py-2 rounded bg-blue text-white font-bold disabled:opacity-50 hover:bg-opacity-80 transition-all"
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={indexOfLastPost >= githubUserPost.length || isLoading}
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}
