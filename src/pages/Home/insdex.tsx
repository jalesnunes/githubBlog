import { ArrowSquareUpRight, MagnifyingGlass } from "phosphor-react";

import githubLogo from "../../assets/githubLogo.svg";
import workplace from "../../assets/workplace.svg";
import userGroup from "../../assets/userGroup.svg";
import { PostSummary } from "./components/PostSummary/imdex";

export function Home() {
  return (
    <main className="w-[54rem] m-auto">
      <section className="bg-baseProfile -mt-16 px-10 py-8 flex flex-row gap-6 items-center justify-between rounded-xl shadow-shadowProfile relative z-10">
        <img src={userGroup} alt="" className="w-36 h-36" />
        <div className="flex flex-col gap-6">
          <header className=" flex items-center justify-between">
            <h1 className="text-2xl text-baseTitle font-bold">Jales Nunes</h1>
            <a href="" className="flex gap-2 hover:border-b  hover:border-b-blue">
              <span className="text-xs text-blue">GITHUB</span>
              <ArrowSquareUpRight size={16} color="#3294f8" />
            </a>
          </header>

          <main>
            <p className="text-baseText">
              Tristique volutpat pulvinar vel massa, pellentesque egestas. Eu
              viverra massa quam dignissim aenean malesuada suscipit. Nunc,
              volutpat pulvinar vel mass.
            </p>
          </main>

          <footer className="flex gap-4">
            <a href="" className="flex gap-2 items-center">
              <img src={githubLogo} alt="" />
              <span className="text-baseSubtitle hover:text-baseTitle">jalesnunes</span>
            </a>

            <a href="" className="flex gap-2 items-center">
              <img src={workplace} alt="" />
              <span className="text-baseSubtitle hover:text-baseTitle">Somewhere</span>
            </a>

            <a href="" className="flex gap-2 items-center">
              <img src={userGroup} alt="" />
              <span className="text-baseSubtitle hover:text-baseTitle">10 Followers</span>
            </a>
          </footer>
        </div>
      </section>

      <section className="mt-28 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg text-baseSubtitle font-bold">Publications</h2>
          <p className="text-sm text-baseSpan">6 publications</p>
        </div>
        <form className="flex gap-3 " action="">
          <input
            className="flex-1 rounded-md bg-baseInput border-baseBorder border p-4 placeholder-baseLabel"
            type="text"
            placeholder="Search publications"
          />
          <button className="flex items-center gap-3 p-4 rounded-md font-bold bg-baseProfile border-baseBorder border text-baseTitle transition-colors hover:bg-basePost " type="submit">
            <MagnifyingGlass size={20} />
            Search
          </button>
        </form>
      </section>

      <section className="mt-28 mb-56 grid grid-cols-2 gap-8">
        <PostSummary />
        <PostSummary />
        <PostSummary />
        <PostSummary />
      </section>
    </main>
  );
}
