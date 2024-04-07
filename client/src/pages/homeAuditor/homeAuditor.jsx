import Navbar from "../../components/navbar/Navbar";
import "./homeAuditor.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import SidebarAuditor from "../../components/sidebarAuditor/SidebarAuditor";

const homeAuditor = () => {
  return (
    <div className="home">
      <SidebarAuditor />
      <div className="homeContainer">
        <Navbar />
        <div className="container">
          <div className="widgets">
            <Widget className="widget" type="user" />
            <Widget className="widget" type="order" />
            <Widget className="widget" type="earning" />
            <Widget className="widget" type="balance" />
          </div>
          <div className="charts">
            <Featured />
            <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
          </div>
          <div className="listContainer">
            <div className="listTitle">Latest Transactions</div>
            <Table />
          </div>
        </div>
      </div>
    </div>
  );
};

export default homeAuditor;
