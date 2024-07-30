import {useState} from 'react';

export function useForm(initialValues){
    const [values, setValues] = useState(initialValues);

    const changeHandler = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            [event.target.name]: event.target.value
        }))
    }

    return {
        values,
        changeHandler
    }
}