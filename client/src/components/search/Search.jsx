import styles from './Search.module.css';

export default function Search() {
    return (
        <section className={`about_section ${styles.layout}`}>
            <div className="container">
                <div className="detail-box">
                    <div className="heading_container">
                        <img src="images/heading-img.png" alt="Heading" />
                        <h2>Search the best food for your furry friend</h2>
                    </div>

                    <div className={styles['input-group']}>

                        <div className={styles['form-outline']}>
                            <label className={styles['form-label']} htmlFor="kg">Weight (kg)</label>
                            <input type="number" id="kg" className={styles['form-control']} />
                        </div>

                        <div className={styles['form-outline']}>
                            <label className={styles['form-label']} htmlFor="age">Age</label>
                            <input type="number" id="age" className={styles['form-control']} />
                        </div>

                        <div className={styles['form-outline']}>
                            <label className={styles['form-label']} htmlFor="age-unit">Select</label>
                            <select id="age-unit" className={styles['form-control']}>
                                <option value="years">Years</option>
                                <option value="months">Months</option>
                            </select>
                        </div>

                        <div className={styles['form-outline']}>
                            <label className={styles['form-label']} htmlFor="breed">Breed</label>
                            <input type="text" id="breed" className={styles['form-control']} />
                        </div>

                        <button type="button" className={styles.btn}>
                            <i className="fas fa-search"></i> Search
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
