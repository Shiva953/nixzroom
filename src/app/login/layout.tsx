import { Roboto_Mono } from "next/font/google";

const roboto = Roboto_Mono({weight : "500", subsets: ["latin"]});

export default function LoginLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section className={roboto.className}>
        {/* Include shared UI here e.g. a header or sidebar */}
   
        {children}
      </section>
    )
  }
  