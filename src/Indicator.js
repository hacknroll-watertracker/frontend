import React from 'react';
import LiquidChart from 'react-liquidchart';

import './Indicator.css'

const stops = [
  ];

export default function Indicator(props) {
    return (
        <div
            style={{
            // width: '100%',
            height: '400px',
            }}
        >
            <LiquidChart
                responsive
                legend="Hydration tracker"
                value={props.amount / props.totalAmount * 100}
                showDecimal
                amplitude={4}
                frequency={2}
                animationTime={2000}
                animationWavesTime={2250}
                // postfix={<> &#8467;</>}
                postfix="%"
                legendFontSize={0.1}
                gradient={{
                    type: 1,
                    x1: 0,
                    x2: 0,
                    y1: 100,
                    y2: 0,
                    stops,
                }}
            />
        </div>
    )
}