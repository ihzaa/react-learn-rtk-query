import React from 'react';

import { useAddColorMutation, useGetColorsQuery } from '../services/colorAPI';

const ColorList = () => {
    // nama data yang ini datengnya by default dari RTK Query
    // RTK query mirip axios, dia akan bungkus result kita dalam object lagi
    // yang dia beri nama data
    const { data, error, isLoading } = useGetColorsQuery();

    // .data yang kedua datengnya dari API nya
    const loadData = isLoading ? <>Loading...</>
        : data.data.map(item =>
            <div style={{ backgroundColor: item.color }}>{item.name}</div>
        );

    return (
        <div>
            <h1>ColorList</h1>
            {loadData}
        </div>
    )
}

export default ColorList