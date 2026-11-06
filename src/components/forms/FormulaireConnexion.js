'use client'

import { useActionState } from 'react'
import { connecter } from '@/actions/auth'

export default function FormulaireConnexion() {
  const [etat, action, enCours] = useActionState(connecter, null)

  return (
    <form action={action} className="space-y-4">
      {etat?.erreur && (
        <p
          role="alert"
          className="rounded-md bg-red-50 p-3 text-sm text-red-800"
        >
          {etat.erreur}
        </p>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={etat?.valeurs?.email ?? ''}
          className="mt-1 w-full rounded-md border border-gray-400 px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="motDePasse" className="block text-sm font-medium">
          Mot de passe
        </label>
        <input
          id="motDePasse"
          name="motDePasse"
          type="password"
          autoComplete="current-password"
          required
          className="mt-1 w-full rounded-md border border-gray-400 px-3 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={enCours}
        className="w-full rounded-md bg-green-700 px-4 py-2 font-medium text-white hover:bg-green-800 disabled:opacity-60"
      >
        {enCours ? 'Connexion…' : 'Se connecter'}
      </button>
    </form>
  )
}