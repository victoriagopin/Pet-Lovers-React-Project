import { useState } from 'react';
import styles from './Search.module.css';
import SearchList from './search-list/Search-list';
import { useForm } from '../../hooks/useForm';

const baseUrl = 'http://localhost:3030/data/foods'

const initialValues ={
        weight: '',
        animal: 'dog',
        lifeStage: 'adult',
        breed: ''
}

export default function Search() {
    const {values, changeHandler} = useForm(initialValues);
    const [animalFood, setAnimalFood] = useState(null);
    const [hasInvalidField, setHasInvalidField] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setHasInvalidField(false);

        if(!values.weight || !values.breed){
            setHasInvalidField(true);
            return;
        }

        try{
            if(values.lifeStage == 'adult'){
                const params = new URLSearchParams({
                    where: `animalType="${values.animal}"`
                })
                
                const req = await fetch(`${baseUrl}?${params.toString()}`);
                
                const res = await req.json();
    
                const adults = res.filter(pet => pet.lifeStage == values.lifeStage);
                const food = adults.find(petWeight => values.weight <= petWeight.weight);
              
                if(food.breeds.includes(values.breed)){
                    setAnimalFood(food);
                } else {
                    setHasInvalidField(true);
                    return;
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
        } catch(err){
             console.log(err.message);
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
                            <input type="number" id="kg" className={styles['form-control']} name='weight' value={values.weight} onChange={changeHandler}/>
                        </div>

                        <div className={styles['form-outline']}>
                            <label className={styles['form-label']} htmlFor="breed">Breed</label>
                            <input type="text" id="breed" className={styles['form-control']} name='breed' value={values.breed} onChange={changeHandler}/>
                        </div>

                        <div className={styles['form-outline']}>
                            <label className={styles['form-label']} htmlFor="age-unit">Pet</label>
                            <select id="animal" className={styles['form-control']} name='animal' value={values.animal} onChange={changeHandler}>
                                <option value="dog">Dog</option>
                                <option value="cat">Cat</option>
                            </select>
                        </div>

                        <div className={styles['form-outline']}>
                            <label className={styles['form-label']} htmlFor="age-unit">Pet Life Stage</label>
                            <select id="life-stage" className={styles['form-control']} name='lifeStage' value={values.lifeStage} onChange={changeHandler}>
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
            {hasInvalidField ? 
                    (<p className='error-search'>Please make sure there are no empty fileds and the data you have entered is correct!</p> )
                    : (animalFood ?
                        (<SearchList 
                        key={animalFood._id}
                        foods={animalFood.food}
                        />
                         ) :   null
            )}
           
        </section>
    );
}
