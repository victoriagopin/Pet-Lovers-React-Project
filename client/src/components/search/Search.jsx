import { useState } from 'react';
import styles from './Search.module.css';

export default function Search() {
    const [values, setValues] = useState({
        weight: '',
        age: '',
        animal: 'dog',
        ageUnit: 'years',
        breed: ''
    })

    const changeValues = (e) => {
        setValues(oldValues => ({
            ...oldValues,
            [e.target.name] : e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(values);
    }

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
                            <input type="number" id="kg" className={styles['form-control']} name='weight' value={values.weight} onChange={changeValues}/>
                        </div>

                        <div className={styles['form-outline']}>
                            <label className={styles['form-label']} htmlFor="age">Age</label>
                            <input type="number" id="age" className={styles['form-control']} name='age' value={values.age} onChange={changeValues}/>
                        </div>

                        <div className={styles['form-outline']}>
                            <label className={styles['form-label']} htmlFor="age-unit">Animal</label>
                            <select id="animal" className={styles['form-control']} name='animal' value={values.animal} onChange={changeValues}>
                                <option value="years">Dog</option>
                                <option value="months">Cat</option>
                            </select>
                        </div>

                        <div className={styles['form-outline']}>
                            <label className={styles['form-label']} htmlFor="age-unit">Select</label>
                            <select id="age-unit" className={styles['form-control']} name='ageUnit' value={values.ageUnit} onChange={changeValues}>
                                <option value="years">Years</option>
                                <option value="months">Months</option>
                            </select>
                        </div>

                        <div className={styles['form-outline']}>
                            <label className={styles['form-label']} htmlFor="breed">Breed</label>
                            <input type="text" id="breed" className={styles['form-control']} name='breed' value={values.breed} onChange={changeValues}/>
                        </div>

                        <button type="submit" className={styles.btn} onClick={handleSubmit}>
                            <i className="fas fa-search"></i> Search
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
