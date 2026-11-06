'use client'

import { useActionState } from 'react'
import { inscrire } from '@/actions/auth'

const CLASSE_CHAMP = 'mt-1 w-full rounded-md border border-gray-400 px-3 py-2'

function Champ({ id, label, type = 'text', autoComplete, valeur }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        required
        defaultValue={valeur ?? ''}
        className={CLASSE_CHAMP}
      />
    </div>
  )
}

export default function FormulaireInscription() {
  const [etat, action, enCours] = useActionState(inscrire, null)
  const valeurs = etat?.valeurs ?? {}

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

      <Champ
        id="nomPharmacie"
        label="Nom de la pharmacie"
        valeur={valeurs.nomPharmacie}
      />

      <div>
        <label htmlFor="ville" className="block text-sm font-medium">
          Ville
        </label>
        <select
          id="ville"
          name="ville"
          required
          defaultValue={valeurs.ville ?? ''}
          className={CLASSE_CHAMP}
        >
          <option value="" disabled>
            Choisir une ville
          </option>
          <option value="BRAZZAVILLE">Brazzaville</option>
          <option value="POINTE_NOIRE">Pointe-Noire</option>
        </select>
      </div>

      <Champ id="quartier" label="Quartier" valeur={valeurs.quartier} />
      <Champ
        id="adresse"
        label="Adresse"
        autoComplete="street-address"
        valeur={valeurs.adresse}
      />
      <Champ
        id="telephone"
        label="Téléphone"
        type="tel"
        autoComplete="tel"
        valeur={valeurs.telephone}
      />
      <Champ
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        valeur={valeurs.email}
      />
      <Champ
        id="motDePasse"
        label="Mot de passe (8 caractères minimum)"
        type="password"
        autoComplete="new-password"
      />
      <Champ
        id="confirmation"
        label="Confirmer le mot de passe"
        type="password"
        autoComplete="new-password"
      />

      <button
        type="submit"
        disabled={enCours}
        className="w-full rounded-md bg-green-700 px-4 py-2 font-medium text-white hover:bg-green-800 disabled:opacity-60"
      >
        {enCours ? 'Création du compte…' : 'Créer mon compte'}
      </button>
    </form>
  )
}