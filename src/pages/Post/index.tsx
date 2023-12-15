import {
  ArrowSquareUpRight,
  Calendar,
  CaretLeft,
  ChatTeardrop,
} from "phosphor-react";

import githubLogo from "../../assets/githubLogo.svg";
import { NavLink } from "react-router-dom";

export function Post() {
  return (
    <main className="w-[54rem] m-auto">
      <section className="bg-baseProfile -mt-16 px-10 py-8 flex flex-col gap-6 justify-between rounded-xl shadow-shadowProfile relative z-10">
        <header className="flex justify-between items-center">
          <NavLink to="/" className="flex gap-3 items-center">
            <CaretLeft size={16} color="#3294f8" />
            <span className="text-xs text-blue">BACK</span>
          </NavLink>

          <a
            href=""
            className="flex gap-3 items-center hover:border-b  hover:border-b-blue"
          >
            <span className="text-xs text-blue">SEE ON GITHUB</span>
            <ArrowSquareUpRight size={16} color="#3294f8" />
          </a>
        </header>

        <div>
          <h1 className="text-2xl text-baseTitle font-bold">
            JavaScript data types and data structures
          </h1>
        </div>

        <footer className="flex gap-4">
          <a href="" className="flex gap-2 items-center">
            <img src={githubLogo} alt="" />
            <span className="text-baseSpan hover:text-baseTitle">
              jalesnunes
            </span>
          </a>

          <a href="" className="flex gap-2 items-center">
            <Calendar size={16} color="#3a536b" weight="fill" />
            <span className="text-baseSpan hover:text-baseTitle">
              1 day ago
            </span>
          </a>

          <a href="" className="flex gap-2 items-center">
            <ChatTeardrop size={16} color="#3a536b" weight="fill" />
            <span className="text-baseSpan hover:text-baseTitle">
              5 comments
            </span>
          </a>
        </footer>
      </section>

      <section className="p-8 flex flex-col gap-4">
        <p className="to-baseText">
          Programming languages all have built-in data structures, but these
          often differ from one language to another. This article attempts to
          list the built-in data structures available in JavaScript and what
          properties they have. These can be used to build other data
          structures. Wherever possible, comparisons with other languages are
          drawn.
        </p>

        <h3>Dynamic typing</h3>

        <p className="to-baseText">
          JavaScript is a loosely typed and dynamic language. Variables in
          JavaScript are not directly associated with any particular value type,
          and any variable can be assigned (and re-assigned) values of all
          types:
        </p>
      </section>
    </main>
  );
}
