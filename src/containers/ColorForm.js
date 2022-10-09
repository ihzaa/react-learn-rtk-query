import React, { useState } from 'react';

import { useAddColorMutation } from '../services/colorApi';

const ColorForm = () => {
    // hook dari mutation akan mengembalikan 2 hal
    // yang pertama adalah fungsi untuk mentrigger mutasi tersebut
    // yang kedua adalah responnya
    // respon tersebut berisi {data, error, isLoading, isError, isSuccess}
    const [addColor, { isLoading, data }] = useAddColorMutation();

    const defaultNewColor = { name: '', year: '', color: '', pantone: '' };

    const [newColor, setNewColor] = useState(defaultNewColor);

    const handleChange = ({ target }) => {
        const { name, value } = target;

        setNewColor({
            ...newColor,
            [name]: value,
        });
    };

    const handleClick = async () => {
        addColor(newColor);
        setNewColor(defaultNewColor);
    }

    return (
        <div style={{ margin: '30px' }}>
            <input
                onChange={handleChange}
                value={newColor.name}
                name='name'
                placeholder='name' />
            <input
                onChange={handleChange}
                value={newColor.year}
                name='year'
                placeholder='year' />
            <input
                onChange={handleChange}
                value={newColor.color}
                name='color'
                placeholder='hex color' />
            <input
                onChange={handleChange}
                value={newColor.pantone}
                name='pantone'
                placeholder='pantone' />
            <button onClick={handleClick}>Create color</button>
            {/* hasil dari post bisa kita akses langsung di sini */}
            <p>Post result : </p>
            {isLoading ? <div>Loading...</div> : <div>{JSON.stringify(data)}</div>}
        </div>
    )
}

export default ColorForm