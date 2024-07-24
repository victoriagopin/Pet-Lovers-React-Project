import styles from './SearchList.module.css';

export default function SearchList({ foods }) { 
    const spacing = 2; 
    const foodsInfo = foods; 
    return (
        <div className={styles.container}>
            {foodsInfo.map(foodInfo => (
                <div key={foodInfo.foodName} className={`card ${styles.box}`} style={{marginRight: spacing + 'em'}}>
                    <img className={`card-img-top ${styles['img-box']}`} src={foodInfo.imageUrl} alt="Card image cap" />
                    <div className="card-body">
                        <h5 className={`card-title ${styles.heading}`}>{foodInfo.foodName}</h5>
                        <p className="card-text">{foodInfo.description}</p>
                    </div>
                    <a href="#" className={styles.btn}>Price: {foodInfo.price}$</a>
                </div>
            ))}
        </div>
    );
}

