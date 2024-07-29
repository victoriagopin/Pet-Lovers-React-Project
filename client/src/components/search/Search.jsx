import { useState } from 'react';
import styles from './Search.module.css';
import SearchList from './search-list/Search-list';

const baseUrl = 'http://localhost:3030/data/foods'

export default function Search() {
    const [values, setValues] = useState({
        weight: '',
        animal: 'dog',
        lifeStage: 'adult',
        breed: ''
    });
    
    const [animalFood, setAnimalFood] = useState(null);

    const changeValues = (e) => {
        setValues(oldValues => ({
            ...oldValues,
            [e.target.name] : e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(values.lifeStage == 'adult'){
        const params = new URLSearchParams({
            where: `animalType="${values.animal}"`
        })

        const req = await fetch(`${baseUrl}?${params.toString()}`);
    
        const res = await req.json();
        
        const food = res.find(petWeight => values.weight <= petWeight.weight);
        if(food.breeds.includes(values.breed)){
            setAnimalFood(food);
        }
    } else {
        const params = new URLSearchParams({
            where: `lifeStage="${values.lifeStage}"`
        })

        const req = await fetch(`${baseUrl}?${params.toString()}`);
    
        const res = await req.json();

        const food = res.find(petKind => values.animal == petKind.animalType);
        setAnimalFood(food);
    }
   
    }

    return (
        <section className={`about_section ${styles.layout} ${styles.catalog}`}>
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
                            <label className={styles['form-label']} htmlFor="breed">Breed</label>
                            <input type="text" id="breed" className={styles['form-control']} name='breed' value={values.breed} onChange={changeValues}/>
                        </div>

                        <div className={styles['form-outline']}>
                            <label className={styles['form-label']} htmlFor="age-unit">Pet</label>
                            <select id="animal" className={styles['form-control']} name='animal' value={values.animal} onChange={changeValues}>
                                <option value="dog">Dog</option>
                                <option value="cat">Cat</option>
                            </select>
                        </div>

                        <div className={styles['form-outline']}>
                            <label className={styles['form-label']} htmlFor="age-unit">Pet Life Stage</label>
                            <select id="life-stage" className={styles['form-control']} name='lifeStage' value={values.lifeStage} onChange={changeValues}>
                                <option value="baby">Baby (up to 12 months)</option>
                                <option value="adult">Adult</option>
                            </select>
                        </div>

                        <button type="submit" className={styles.btn} onClick={handleSubmit}>
                            <i className="fas fa-search"></i> Search
                        </button>
                    </div>
                </div>
            </div> 
            {animalFood 
                ?
                    <SearchList 
                    key={animalFood._id}
                    foods={animalFood.food}
                    />
                :   null
            }
        </section>
    );
}
