'use client'
import { Button } from "../../components/ui/button"
import Link from "next/link"
import {Roboto_Mono} from "next/font/google";
import { LampContainer } from "../../components/ui/lamp";

const roboto = Roboto_Mono({weight : "300", subsets: ["latin"]});

export default function LoginHomePage(){
    return(
        // <WavyBackground className="max-w-4xl mx-auto pb-40">
          <LampContainer>
      <h1 className="mt-8 bg-gradient-to-br from-slate-100 to-slate-300 py-4 bg-clip-text text-center text-4xl font-extrabold tracking-tight text-transparent md:text-7xl">
        Nizzroom
      </h1>
      <div className={`${roboto.className}`}>
      <p className="text-sm md:text-lg lg:text-xl xl:text-2xl mt-2 md:mt-4 lg:mt-6 tracking-tighter opacity-70 text-white font-normal inter-var text-center">
        The chat room where your conversations are as cool as you are.
        </p>
      </div>
      <div className="flex items-center justify-center m-4">
      {/* <Button className="rounded-[32px] m-8 h-[3.75rem] w-[7.5rem] text-white items-center justify-center"><Link href={`/api/auth/signin`}>Log In</Link></Button> */}
      <button className="bg-slate-800 w-[7rem] h-[3.75rem] no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
        <span className="absolute w-[7rem] h-[3.75rem] inset-0 overflow-hidden rounded-full">
          <span className="absolute w-[7rem] h-[3.75rem] inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
        </span>
        <div className="relative w-[7rem] h-[3.75rem] flex space-x-2 items-center justify-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
          <span className="items-center justify-center"><Link href={`/api/auth/signin`}>{`Login`}</Link></span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M10.75 8.75L14.25 12L10.75 15.25"
            ></path>
          </svg>
        </div>
        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
      </button>
      </div>
      </LampContainer>
    )
}