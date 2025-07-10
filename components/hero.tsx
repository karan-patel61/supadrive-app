'use client'
import NextLogo from "./next-logo";
import SupabaseLogo from "./supabase-logo";
import { motion } from "framer-motion";

export default function Header() {

  const sentence = "Welcom to Supadrive!"
  return (
    <div className="flex flex-col gap-8 items-center">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 2, ease: "easeInOut" }}
        style={{ 
          overflow: "hidden",
          whiteSpace: "nowrap"
        }}
      >
        {<p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
        Welcome to Supadrive.{" "}
        <br/>
        <span className="text-2xl">A basic file storage solution <br/>built using</span>
      </p>}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex gap-8 justify-center items-center">
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            rel="noreferrer"
          >
            <SupabaseLogo />
          </a>
          <span className="border-l rotate-45 h-6" />
          <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
            <NextLogo />
          </a>
        </div>
        <h1 className="sr-only">Supabase and Next.js Starter Template</h1>
      </motion.div>
      
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
