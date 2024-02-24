import Navbar2 from "../../components/navbar-2/Navbar-2"
import Sidebar from "../../components/sidebar/Sidebar";
import PrintButton from '../../components/PrintButton';
import "./historialesJefa2.scss"
import arrow from "./arrow.png"
import {
    AreaChart,
    Area,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";

  const data = [
    { name: "January", Total: 1200 },
    { name: "February", Total: 2100 },
    { name: "March", Total: 800 },
    { name: "April", Total: 1600 },
    { name: "May", Total: 900 },
    { name: "June", Total: 1700 },
  ];

const HistorialesJefa2 = ({ aspect, title }) => {
    return (
        <div className="historiales-jefa">
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
          <div className="chart">
                <div className="title">{title}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                        <div>
                            <ResponsiveContainer width="50%" aspect={2}>
                              <AreaChart
                                width={730}
                                height={250}
                                data={data}
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
            </div>
        </div>
      </div>
    );
  };
  
  export default HistorialesJefa2;