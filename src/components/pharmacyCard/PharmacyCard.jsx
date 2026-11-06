import styles from './pharmacyCard.module.css'

export default function PharmacyCard({ pharmacy }) {

    return (
        <div className='card'>
            <div className='card-infos'>
                <div className='card-section-one'>
                    <h2>Pharmacie du Marché</h2>
                    <span className='primary-badge'>De garde ce soir</span>
                </div>
                <p>Poto-Poto, Brazzaville – 8h à 20h</p>
            </div>
            <div className='card-price'>
                <span className='secondary-badge'>Disponible</span>
                <p>850 FCFA</p>
                <span>Mis à jour il y a 2 h</span>
            </div>
            <div className='btn-group'>
                <button>Appeler</button>
                <button>WhatsApp</button>
                <button>Itinérance</button>
            </div>
        </div>
    );
}