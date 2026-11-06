import 'dotenv/config'
import {
  PrismaClient,
  Role,
  StatutPharmacie,
  StatutStock,
  Ville,
} from '../generated/prisma/client'
import type { Medicament, Pharmacie } from '../generated/prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import * as bcrypt from 'bcryptjs'

const connectionString = process.env.DATABASE_URL_UNPOOLED
if (!connectionString) {
  throw new Error('DATABASE_URL_UNPOOLED est manquante dans le fichier .env')
}

const adapter = new PrismaNeon({ connectionString })
const prisma = new PrismaClient({ adapter })

// Comptes de démonstration (données fictives, à indiquer dans le README)
const MOT_DE_PASSE_ADMIN = 'Admin1234!'
const MOT_DE_PASSE_PHARMACIE = 'Pharma1234!'

// Nom en minuscules et sans accents, pour la recherche
function normaliser(texte: string): string {
  return texte
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

const MEDICAMENTS: string[] = [
  'Paracétamol',
  'Amoxicilline',
  'Ibuprofène',
  'Artéméther / Luméfantrine',
  'Métronidazole',
  'Oméprazole',
  'Ciprofloxacine',
  'Sels de réhydratation orale',
  'Vitamine C',
  'Cétirizine',
  'Salbutamol',
  'Diclofénac',
  'Amlodipine',
  'Metformine',
]

type PharmacieSeed = {
  slug: string
  nom: string
  adresse: string
  quartier: string
  ville: Ville
  telephone: string
  whatsapp: string
  horaires: string
  statut: StatutPharmacie
  email: string
}

// Numéros fictifs. Les 2 premiers comptes servent à la démo :
// - pharmacie.test@mbongopharma.cg : pharmacie approuvée (compte de test du README)
// - attente@mbongopharma.cg : pharmacie en attente (validation par l'admin)
const PHARMACIES: PharmacieSeed[] = [
  {
    slug: 'pharmacie-espoir',
    nom: 'Pharmacie Espoir',
    adresse: '12 avenue de la Paix',
    quartier: 'Poto-Poto',
    ville: Ville.BRAZZAVILLE,
    telephone: '+242060000001',
    whatsapp: '+242060000001',
    horaires: 'Lun-Sam 8h-20h',
    statut: StatutPharmacie.APPROUVEE,
    email: 'pharmacie.test@mbongopharma.cg',
  },
  {
    slug: 'pharmacie-du-plateau',
    nom: 'Pharmacie du Plateau',
    adresse: '5 rue des Palmiers',
    quartier: 'Plateau',
    ville: Ville.BRAZZAVILLE,
    telephone: '+242060000002',
    whatsapp: '+242060000002',
    horaires: 'Lun-Dim 7h30-21h',
    statut: StatutPharmacie.APPROUVEE,
    email: 'plateau@demo.mbongopharma.cg',
  },
  {
    slug: 'pharmacie-bacongo',
    nom: 'Pharmacie de Bacongo',
    adresse: '48 avenue Marien Ngouabi',
    quartier: 'Bacongo',
    ville: Ville.BRAZZAVILLE,
    telephone: '+242060000003',
    whatsapp: '+242060000003',
    horaires: 'Lun-Sam 8h-19h',
    statut: StatutPharmacie.APPROUVEE,
    email: 'bacongo@demo.mbongopharma.cg',
  },
  {
    slug: 'pharmacie-nouvelle-ouenze',
    nom: 'Pharmacie Nouvelle Ouenzé',
    adresse: '23 rue Mère Teresa',
    quartier: 'Ouenzé',
    ville: Ville.BRAZZAVILLE,
    telephone: '+242060000004',
    whatsapp: '+242060000004',
    horaires: 'Lun-Sam 8h-20h',
    statut: StatutPharmacie.EN_ATTENTE,
    email: 'attente@mbongopharma.cg',
  },
  {
    slug: 'pharmacie-talangai',
    nom: 'Pharmacie Talangaï Centre',
    adresse: '9 avenue de l’Indépendance',
    quartier: 'Talangaï',
    ville: Ville.BRAZZAVILLE,
    telephone: '+242060000005',
    whatsapp: '+242060000005',
    horaires: 'Lun-Dim 8h-22h',
    statut: StatutPharmacie.APPROUVEE,
    email: 'talangai@demo.mbongopharma.cg',
  },
  {
    slug: 'pharmacie-centre-ville-pn',
    nom: 'Pharmacie du Centre-Ville',
    adresse: '31 avenue du Général de Gaulle',
    quartier: 'Centre-ville',
    ville: Ville.POINTE_NOIRE,
    telephone: '+242060000006',
    whatsapp: '+242060000006',
    horaires: 'Lun-Sam 8h-20h',
    statut: StatutPharmacie.APPROUVEE,
    email: 'centreville@demo.mbongopharma.cg',
  },
  {
    slug: 'pharmacie-loandjili',
    nom: 'Pharmacie de Loandjili',
    adresse: '7 rue du Marché',
    quartier: 'Loandjili',
    ville: Ville.POINTE_NOIRE,
    telephone: '+242060000007',
    whatsapp: '+242060000007',
    horaires: 'Lun-Dim 7h-21h',
    statut: StatutPharmacie.APPROUVEE,
    email: 'loandjili@demo.mbongopharma.cg',
  },
  {
    slug: 'pharmacie-tie-tie',
    nom: 'Pharmacie Tié-Tié',
    adresse: '15 avenue Charles de Gaulle',
    quartier: 'Tié-Tié',
    ville: Ville.POINTE_NOIRE,
    telephone: '+242060000008',
    whatsapp: '+242060000008',
    horaires: 'Lun-Sam 8h-19h30',
    statut: StatutPharmacie.APPROUVEE,
    email: 'tietie@demo.mbongopharma.cg',
  },
  {
    slug: 'pharmacie-mvou-mvou',
    nom: 'Pharmacie Mvou-Mvou',
    adresse: '2 rue des Flamboyants',
    quartier: 'Mvou-Mvou',
    ville: Ville.POINTE_NOIRE,
    telephone: '+242060000009',
    whatsapp: '+242060000009',
    horaires: 'Lun-Sam 8h-18h',
    statut: StatutPharmacie.REFUSEE,
    email: 'mvoumvou@demo.mbongopharma.cg',
  },
]

async function main() {
  console.log('Début du remplissage de la base (seed)...')

  // 1. Nettoyage, dans l'ordre inverse des dépendances (le seed peut être relancé)
  await prisma.stockItem.deleteMany()
  await prisma.periodeGarde.deleteMany()
  await prisma.pharmacie.deleteMany()
  await prisma.medicament.deleteMany()
  await prisma.utilisateur.deleteMany()

  // 2. Administrateur
  const hashAdmin = await bcrypt.hash(MOT_DE_PASSE_ADMIN, 10)
  const hashPharmacie = await bcrypt.hash(MOT_DE_PASSE_PHARMACIE, 10)

  await prisma.utilisateur.create({
    data: {
      nom: 'Administrateur Mbongo',
      email: 'admin@mbongopharma.cg',
      motDePasse: hashAdmin,
      role: Role.ADMIN,
    },
  })

  // 3. Pharmacies, chacune avec son compte PHARMACY
  const pharmacies: Pharmacie[] = []
  for (const { email, ...donnees } of PHARMACIES) {
    const pharmacie = await prisma.pharmacie.create({
      data: {
        ...donnees,
        utilisateur: {
          create: {
            nom: donnees.nom,
            email,
            motDePasse: hashPharmacie,
            role: Role.PHARMACY,
          },
        },
      },
    })
    pharmacies.push(pharmacie)
  }
  console.log(`${pharmacies.length} pharmacies créées`)

  // 4. Médicaments (sans description : l'application ne donne aucun conseil médical)
  const medicaments: Medicament[] = []
  for (const nom of MEDICAMENTS) {
    const medicament = await prisma.medicament.create({
      data: { nom, nomRecherche: normaliser(nom) },
    })
    medicaments.push(medicament)
  }
  console.log(`${medicaments.length} médicaments créés`)

  // 5. Stocks variés (Disponible, Stock faible, Rupture, ou absent)
  const lignesStock: {
    pharmacieId: string
    medicamentId: string
    statut: StatutStock
  }[] = []
  pharmacies.forEach((pharmacie, p) => {
    medicaments.forEach((medicament, m) => {
      const v = (p * 7 + m * 3 + 1) % 5
      if (v === 0) return // ce médicament n'est pas référencé dans cette pharmacie
      const statut =
        v === 4
          ? StatutStock.RUPTURE
          : v === 3
            ? StatutStock.STOCK_FAIBLE
            : StatutStock.DISPONIBLE
      lignesStock.push({
        pharmacieId: pharmacie.id,
        medicamentId: medicament.id,
        statut,
      })
    })
  })
  await prisma.stockItem.createMany({ data: lignesStock })
  console.log(`${lignesStock.length} lignes de stock créées`)

  // 6. Gardes calculées à partir de la date du jour, en UTC.
  // Chaque période dure 24 h, de 08h00 à 08h00 à Brazzaville (07h00 UTC).
  // Une pharmacie est de garde par ville et par jour, d'hier à dans 7 jours,
  // donc la page de garde n'est jamais vide.
  const maintenant = new Date()
  const debutBase = Date.UTC(
    maintenant.getUTCFullYear(),
    maintenant.getUTCMonth(),
    maintenant.getUTCDate(),
    7,
    0,
    0,
  )
  const JOUR = 24 * 60 * 60 * 1000
  const gardes: { pharmacieId: string; dateDebut: Date; dateFin: Date }[] = []

  for (const ville of [Ville.BRAZZAVILLE, Ville.POINTE_NOIRE]) {
    const candidates = pharmacies.filter(
      (ph) => ph.ville === ville && ph.statut === StatutPharmacie.APPROUVEE,
    )
    for (let decalage = -1; decalage <= 7; decalage++) {
      const pharmacie = candidates[(decalage + 1) % candidates.length]
      const debut = debutBase + decalage * JOUR
      gardes.push({
        pharmacieId: pharmacie.id,
        dateDebut: new Date(debut),
        dateFin: new Date(debut + JOUR),
      })
    }
  }
  await prisma.periodeGarde.createMany({ data: gardes })
  console.log(`${gardes.length} périodes de garde créées`)

  console.log('Seed terminé avec succès !')
  console.log('Compte admin : admin@mbongopharma.cg / ' + MOT_DE_PASSE_ADMIN)
  console.log(
    'Compte pharmacie de test : pharmacie.test@mbongopharma.cg / ' +
      MOT_DE_PASSE_PHARMACIE,
  )
}

main()
  .catch((e) => {
    console.error('Erreur lors du seed :', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
