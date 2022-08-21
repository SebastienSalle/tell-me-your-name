import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import capitalize from '../helpers/capitalizingWord';

ChartJS.register(ArcElement, Tooltip, Legend);


export default function PieChart(param) {
    
    const portion = Number(param.portion * 100)
    const rest = Number(100 - portion)

    let otherGender = 'female'
    if(param.gender === 'female'){
        otherGender = 'male'
    };

    const data = {
      labels: [capitalize(param.gender), capitalize(otherGender)],
      datasets: [
        {
          label: 'Gender proportion',
          data: [portion, rest],
          backgroundColor: [
            'rgba(240, 147, 43, 1)',
            'rgba(186, 220, 88, 1)',
          ],
          borderColor: [
              'rgba(190, 46, 221, 1)',
              'rgba(106, 176, 76, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
    
  return <Pie data={data} />;
}
