import styles from './pharmacies.module.css'
import PharmacyCard from '@/components/pharmacyCard/PharmacyCard';

export default function PharmaciesPage() {
    const search = "paracéramol";
    const searchResult = `« ${search} »`;
    return (
        <>
            <header>
                <h1>Résultats pour {searchResult}</h1>
                <p>4 pharmacies trouvées</p>
                <div className="filter-section">
                    <div className='filter-item one'>
                        <label htmlFor="city">Ville</label>
                        <select name="" id="city">
                            <option value="bz">Brazzaville</option>
                            <option value="pn">Pointe Noire</option>
                        </select>
                    </div>
                    <div className='filter-item two'>
                        <label htmlFor="">Quartier</label>
                        <select name="" id="city">
                            <option value="all">Tous les quartiers</option>
                            <option value="talas">Talangaï</option>
                        </select>
                    </div>
                    <div className='filter-item three'>
                        <input type="checkbox" name="oncall" id="oncall" />
                        <label htmlFor="oncall">De garde uniquement</label>
                    </div>
                    <button type="button">Filtrer</button>
                </div>
            </header>
            <main>
                <PharmacyCard />
            </main>
        </>
    )
}