// Configuration Auth.js qui n'a pas besoin de la base de données.
// Elle est séparée de auth.js pour que le proxy (issue 4) puisse la réutiliser
// sans importer Prisma ni bcrypt.

export const authConfig = {
  // Session JWT : stockée dans un cookie signé avec AUTH_SECRET,
  // ce qui garde l'utilisateur connecté après un rechargement.
  session: { strategy: 'jwt' },

  // Page vers laquelle Auth.js redirige un visiteur non connecté.
  pages: { signIn: '/connexion' },

  // Le fournisseur Credentials est ajouté dans auth.js.
  providers: [],

  callbacks: {
    // Au moment de la connexion, on copie l'id et le rôle dans le jeton.
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    // À chaque lecture de la session, on expose l'id et le rôle (PHARMACY ou ADMIN).
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
        session.user.role = token.role
      }
      return session
    },
  },
}