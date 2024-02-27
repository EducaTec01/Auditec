import React from "react";
import Navbar2 from "../../components/navbar-2/Navbar-2"
import Sidebar from "../../components/sidebar/Sidebar";
import "./reportes.scss";
//import {Radar} from 'react-chartjs-2'
import { ResponsiveContainer } from "recharts";
import {
    Legend,
    Bar,
    BarChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
  } from "recharts";

const data= [
    {name:"Maria", age: 10, weight: 60},
    {name:"Juan", age: 16, weight: 80},
    {name:"Sergio", age: 36, weight: 90},
    {name:"Felipe", age: 57, weight: 75},
    {name:"Adrian", age: 27, weight: 69},
    {name:"Oscar", age: 68, weight: 81},
    {name:"Alan", age: 28, weight: 76},
]

const data1 = {
  labels: ['Diseño', 'Desarrollo', 'Usabilidad', 'Contenido', 'SEO', 'Marketing'],
  datasets: [
    {
      label: 'Habilidades',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      pointBackgroundColor: 'rgba(255, 99, 132, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
      data: [85, 70, 90, 80, 75, 85], // Aquí colocas los valores de tus habilidades
    },
  ],
};

const options = {
  scale: {
    ticks: { beginAtZero: true, max: 100 },
  },
};


const Reportes = () => {
    
  return (
    <body>
        <header>
                <nav>
                    <Navbar2 />
                </nav>
        </header>
        <div className="container">
          <Sidebar />
          <div className="content-container">
            <div className="titulo">
              <p>Reportes</p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
             {[...Array(4)].map((_, index) => (
               <div key={index} style={{ flex: '1 1 50%', padding: '10px' }}>
                 <ResponsiveContainer width="100%" aspect={2}>
                   <BarChart
                     data={data}
                     margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                   >
                     <CartesianGrid strokeDasharray="4 1 2" />
                     <XAxis dataKey="name" />
                     <YAxis />
                     <Tooltip />
                     <Legend />
                     <Bar dataKey="weight" fill="#6b48ff" />
                     <Bar dataKey="age" fill="#1ee3cf" />
                   </BarChart>
                 </ResponsiveContainer>
               </div>
             ))}
            </div>
          </div>
        </div>
        {/* <div>
          <h2>Gráfico de Araña</h2>
          <Radar data={data1} options={options} />
        </div> */}
    </body>
  );
};

export default Reportes;
