import NextAuth, { NextAuthOptions,Profile,User,Account,Session, SessionStrategy } from "next-auth"
import { JWT } from "next-auth/jwt"
import { AdapterUser } from "next-auth/adapters"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    })
  ],
  callbacks: {
    async signIn({user, account, profile} : {user: AdapterUser|User ,account:Account|null, profile?:Profile|undefined}){
      return true;
    },
    jwt: async({user, token, account, profile}: {user: AdapterUser|User, token: JWT, account: Account|null, profile?: Profile|undefined}) => {
      return token;
    },
    session: async({ session, token }: { session: Session; token: JWT }) => {
        if(session.user){
          session.user.id = token.sub as string;
        }
      return session;
    },
  },
  session: {
    strategy: 'jwt' as SessionStrategy
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };