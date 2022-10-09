import React from 'react';

const Color = ({ item }) => {
    return (
        <div
            key={item.id}
            style={{ backgroundColor: item.color }}
            className='color-item'>
            <h3>{item.name}</h3>
            <p>{item.year}</p>
            <p>{item.pantone_value}</p>
        </div>
    )
}

export default Color