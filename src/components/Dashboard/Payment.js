import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

const Payment = () => {
    const { orderId } = useParams();
    const url = `http://localhost:5000/tool/${orderId}`;

    const { data } = useQuery('tool', () => fetch(url).then(res => res.json()));

    return (
        <div>
            <h2>Order Id: {orderId}</h2>
        </div>
    );
};

export default Payment;