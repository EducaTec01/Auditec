import Navbar2 from "../../components/navbar-2/Navbar-2"
import Sidebar from "../../components/sidebar/Sidebar"
import PrintButton from '../../components/PrintButton/PrintButton';
import "./historialesJefa2.scss"
import {Radar} from 'react-chartjs-2'
import { ResponsiveContainer } from "recharts";
import {
    AreaChart,
    Area,
    XAxis,
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

const data2 = [
    { name: "January", Total: 1200 },
    { name: "February", Total: 2100 },
    { name: "March", Total: 800 },
    { name: "April", Total: 1600 },
    { name: "May", Total: 900 },
    { name: "June", Total: 1700 },
  ];

const options = {
  scale: {
    ticks: { beginAtZero: true, max: 100 },
  },
};


const HistorialesJefa2 = ({ aspect, title }) => {
    
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
              <p>Historial</p>
              <PrintButton />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                <ResponsiveContainer width="50%" aspect={2}>
                  <AreaChart
                    width={730}
                    height={250}
                    data={data2}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#150AE8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#5767F4" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="gray" />
                    <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="Total"
                      stroke="#415EF1"
                      fillOpacity={1}
                      fill="url(#total)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
                <ResponsiveContainer width="50%" aspect={2}>
                  <AreaChart
                    width={730}
                    height={250}
                    data={data2}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#150AE8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#5767F4" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="gray" />
                    <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="Total"
                      stroke="#415EF1"
                      fillOpacity={1}
                      fill="url(#total)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
                <ResponsiveContainer width="50%" aspect={2}>
                  <AreaChart
                    width={730}
                    height={250}
                    data={data2}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#150AE8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#5767F4" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="gray" />
                    <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="Total"
                      stroke="#415EF1"
                      fillOpacity={1}
                      fill="url(#total)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
                <ResponsiveContainer width="50%" aspect={2}>
                  <AreaChart
                    width={730}
                    height={250}
                    data={data2}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#150AE8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#5767F4" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="gray" />
                    <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="Total"
                      stroke="#415EF1"
                      fillOpacity={1}
                      fill="url(#total)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="chart">
      <div className="title">{title}</div>
    </div>
    </body>
  );
};

export default HistorialesJefa2;