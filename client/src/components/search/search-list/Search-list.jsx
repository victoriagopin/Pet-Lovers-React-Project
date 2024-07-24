import styles from './SearchList.module.css';

export default function SearchList({ foods }) { // Destructure foods from props
    const spacing = 2; 
    const foodsInfo = foods; // Assuming foods is already an array

    return (
        <div className={styles.container}>
            {foodsInfo.map(foodInfo => (
                <div key={foodInfo.foodName} className={`card ${styles.box}`} style={{marginRight: spacing + 'em'}}>
                    <img className={`card-img-top ${styles['img-box']}`} src={foodInfo.imageUrl} alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">{foodInfo.foodName}</h5>
                        <p className="card-text">{foodInfo.description}</p>
                        <a href="#" className="btn btn-primary">Price: {foodInfo.price}$</a>
                    </div>
                </div>
            ))}
        </div>
    );
}

