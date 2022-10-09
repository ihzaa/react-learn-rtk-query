import React from 'react';

import Color from '../components/Color';
import { useGetColorsQuery } from '../services/colorApi';

const ColorList = () => {
    // nama data yang ini datengnya by default dari RTK Query
    // RTK query mirip axios, dia akan bungkus result kita dalam object lagi
    // yang dia beri nama data
    // kembalian dari hook use...Query adalah {data, error, isLoading, isError, isSuccess}
    const { data, error, isLoading } = useGetColorsQuery();

    // .data yang kedua datengnya daru API nya
    const loadData = isLoading ? <>Loading...</>
        : data.data.map(item => <Color key={item.id} item={item} />);

    return (
        <div className='color-list'>
            {
                error ? (
                    <>Oh no, there was an error</>
                ) : loadData
            }
        </div >
    );
}

export default ColorList