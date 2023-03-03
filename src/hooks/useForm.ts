import { useState, ChangeEvent } from 'react';

type TInputValues = {
    [id: string]: string;
}

export function useForm(inputValues: TInputValues) {
    const [values, setValues] = useState(inputValues);
  
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.target;
        
        setValues({
            ...values,
            [name]: value
        });
    };

    return {
        values,
        handleChange,
        setValues
    };
}