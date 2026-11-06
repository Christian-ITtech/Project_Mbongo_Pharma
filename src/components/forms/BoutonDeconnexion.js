import { deconnecter } from '@/actions/auth'

// À placer dans l'en-tête ou dans l'espace pharmacie / admin.
export default function BoutonDeconnexion() {
  return (
    <form action={deconnecter}>
      <button
        type="submit"
        className="rounded-md border border-gray-400 px-3 py-1 text-sm hover:bg-gray-100"
      >
        Se déconnecter
      </button>
    </form>
  )
}