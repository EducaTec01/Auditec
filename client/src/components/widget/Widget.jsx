import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PeopleIcon from '@mui/icons-material/People';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Widget = ({ type, descripcion, onClick }) => {
  let data;
  //temporary
  const amount = 100;

  switch (type) {    
    case "asignaciones":
      data = {
        title: "Asignaciones recientes",
        link: "Ver todo",
        icon: (
          <ChevronRightIcon
            className="icon"
            style={{
              backgroundColor: "rgba(0, 128, 0, 0.2)"
            }}
          />
        ),
      };
    break;
    case "graficas":
      data = {
        title: "Graficas",
        link: "Ver todo",
        icon: (
          <ChevronRightIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)"
          }}
          />
        ),
      };
    break;
    case "departamentos":
      data = {
        title: "Departamentos",
        link: "Ver todo",
        icon: (
          <ChevronRightIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)"
          }}
          />
        ),
      };
    break;
    case "auditorias":
      data = {
        title: "Auditorias",        
        ajustes : true,
        link: "Ver todo",
        iconConsultorio:(
          <AutoAwesomeMotionIcon
            className="icon"
          />
        ),
        icon: (
          <ChevronRightIcon
            className="icon"
          />
        ),
      };
    break;
    case "usuarios":
      data = {
        ajustes:true,
        title: "Usuarios",
        link: "Ver todo",
        iconConsultorio:(<PeopleIcon
          className="icon"
        />),
        icon: (
          <ChevronRightIcon
            className="icon"            
          />
        ),
      };
    break;
    case "ajustes":
      data = {
        title: "--",
        link: "Ver todo",
        icon: (
          <ChevronRightIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)"
          }}
          />
        ),
      };
    break;
    case "ajustestitulo":
      data = {
        title: "Ajustes",
        isTitle : true,
      };
    break;
    case "agenda":
      data = {
        title: "Agenda",
        link: "Ver todo",
        icon: (
          <ChevronRightIcon
            className="icon"
            style={{
              backgroundColor: "rgba(0, 128, 0, 0.2)"
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget" onClick={onClick}>
      <div className="left">               
        {data.ajustes && 
          <div className="icon">        
            {data.iconConsultorio}
          </div> 
        }
        <div className="lefts">        
          <span className="title">{data.title}</span>
          <span className="counter">            
            {!data.isTitle && descripcion}
          </span>
        </div>         
      </div>
      <div className="right">      
        {!data.isTitle && <span className="link">{data.link}</span> && 
          <div className="icon">        
            {data.icon}
          </div> 
        }                  
      </div>
    </div>
  );
};

export default Widget;
