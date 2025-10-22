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
import DOMPurify from "dompurify";

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

// Função simples para converter Markdown básico em HTML
function markdownToHtml(markdown: string): string {
  let html = markdown;

  // Headers
  html = html.replace(
    /^### (.*$)/gim,
    '<h3 class="text-xl font-bold text-baseTitle mt-6 mb-4">$1</h3>'
  );
  html = html.replace(
    /^## (.*$)/gim,
    '<h2 class="text-2xl font-bold text-baseTitle mt-8 mb-4">$1</h2>'
  );
  html = html.replace(
    /^# (.*$)/gim,
    '<h1 class="text-3xl font-bold text-baseTitle mt-8 mb-4">$1</h1>'
  );

  // Bold
  html = html.replace(
    /\*\*(.*?)\*\*/gim,
    '<strong class="font-bold text-baseTitle">$1</strong>'
  );
  html = html.replace(
    /__(.*?)__/gim,
    '<strong class="font-bold text-baseTitle">$1</strong>'
  );

  // Italic
  html = html.replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>');
  html = html.replace(/_(.*?)_/gim, '<em class="italic">$1</em>');

  // Links
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/gim,
    '<a href="$2" class="text-blue hover:underline" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // Code blocks
  html = html.replace(
    /```([a-z]*)\n([\s\S]*?)```/gim,
    '<pre class="bg-baseInput p-4 rounded-lg my-4 overflow-x-auto"><code class="text-sm">$2</code></pre>'
  );

  // Inline code
  html = html.replace(
    /`([^`]+)`/gim,
    '<code class="bg-baseInput px-2 py-1 rounded text-sm">$1</code>'
  );

  // Lists
  html = html.replace(/^\* (.*$)/gim, '<li class="ml-6 list-disc">$1</li>');
  html = html.replace(/^- (.*$)/gim, '<li class="ml-6 list-disc">$1</li>');
  html = html.replace(
    /^\d+\. (.*$)/gim,
    '<li class="ml-6 list-decimal">$1</li>'
  );

  // Wrap lists
  html = html.replace(/(<li.*<\/li>)/s, '<ul class="my-4">$1</ul>');

  // Blockquotes
  html = html.replace(
    /^> (.*$)/gim,
    '<blockquote class="border-l-4 border-blue pl-4 my-4 italic text-baseSpan">$1</blockquote>'
  );

  // Line breaks
  html = html.replace(/\n\n/gim, "<br/><br/>");

  return html;
}

export function Post() {
  const { number } = useParams();
  const { githubUserPost, isLoading, error } = useContext(GithubDataContext);

  const post = githubUserPost.find((post) => post.number === Number(number));

  if (error) {
    return (
      <main className="w-full max-w-[54rem] px-4 m-auto">
        <div className="text-center mt-8 text-red-500">
          <p>{error}</p>
          <NavLink
            to="/"
            className="mt-4 px-4 py-2 bg-blue rounded inline-block"
          >
            Voltar para Home
          </NavLink>
        </div>
      </main>
    );
  }

  if (isLoading || !post) {
    return (
      <main className="w-full max-w-[54rem] px-4 m-auto">
        <p className="text-center mt-8 text-base text-baseText">
          {isLoading ? "Loading post..." : "Post not found"}
        </p>
        <div className="text-center mt-4">
          <NavLink
            to="/"
            className="px-4 py-2 bg-blue rounded inline-block text-white"
          >
            Back to Home
          </NavLink>
        </div>
      </main>
    );
  }

  // Sanitiza e converte o markdown
  const htmlContent = DOMPurify.sanitize(markdownToHtml(post.body));

  return (
    <main className="w-full max-w-[54rem] px-4 m-auto">
      <section className="bg-baseProfile -mt-16 px-6 sm:px-10 py-8 flex flex-col gap-6 justify-between rounded-xl shadow-shadowProfile relative z-10">
        <header className="flex w-full justify-between items-center">
          <NavLink
            to="/"
            className="flex gap-3 items-center hover:border-b hover:border-b-blue transition-all group"
            aria-label="Back to home"
          >
            <CaretLeft
              size={16}
              color="#3294f8"
              weight="bold"
              className="group-hover:translate-x-[-4px] transition-transform"
            />
            <span className="text-xs text-blue font-bold">BACK</span>
          </NavLink>

          <a
            href={post.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-3 items-center hover:border-b hover:border-b-blue transition-all"
            aria-label="View on GitHub"
          >
            <span className="text-xs text-blue font-bold">SEE ON GITHUB</span>
            <ArrowSquareUpRight size={16} color="#3294f8" weight="bold" />
          </a>
        </header>

        <div className="w-full text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl text-baseTitle font-bold">
            {post.title}
          </h1>
        </div>

        <footer className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 text-sm">
          <div className="flex gap-2 items-center">
            <img src={githubLogo} alt="GitHub icon" />
            <span className="text-baseSpan hover:text-baseTitle transition-colors">
              {post.user.login}
            </span>
          </div>

          <div className="flex gap-2 items-center">
            <Calendar size={18} color="#3a536b" weight="fill" />
            <span className="text-baseSpan hover:text-baseTitle transition-colors">
              {getRelativeTime(post.created_at)}
            </span>
          </div>

          <div className="flex gap-2 items-center">
            <ChatTeardrop size={18} color="#3a536b" weight="fill" />
            <span className="text-baseSpan hover:text-baseTitle transition-colors">
              {post.comments} comment{post.comments !== 1 ? "s" : ""}
            </span>
          </div>
        </footer>
      </section>

      <article className="p-4 sm:p-8 flex flex-col gap-4">
        <div
          className="text-baseText leading-relaxed markdown-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </article>
    </main>
  );
}
