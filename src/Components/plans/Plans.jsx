import React from 'react'
import { CardPlans } from './cardplans/CardPlans';
import { CardPlansPersonalized } from './cardplans/CardPlansPersonalized';

export const Plans = () => {
    return (
        <>
            <h1 style = {{marginTop: '70px'}}>Planes</h1>
            <CardPlansPersonalized />
            <CardPlans />
        </>
    )
}