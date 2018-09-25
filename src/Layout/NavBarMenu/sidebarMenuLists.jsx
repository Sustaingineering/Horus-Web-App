import React from 'react';
import {
  ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core/';
// Routing
import { Link } from 'react-router-dom';
// Material Ui components
// import Tooltip from '@material-ui/core/Tooltip';
// Icons
import Dashboard from '@material-ui/icons/Dashboard';
import Contacts from '@material-ui/icons/Contacts';
import Folder from '@material-ui/icons/Folder';
import DoneAll from '@material-ui/icons/DoneAll';
import Timeline from '@material-ui/icons/Timeline';
import Work from '@material-ui/icons/Work';
import InsertInvitation from '@material-ui/icons/InsertInvitation';
import Subject from '@material-ui/icons/Subject';
import Settings from '@material-ui/icons/SettingsRounded';

const style = {
  textDecoration: 'none',
};

export const grlListItems = (
  <div>
    <Link style={style} to='/dashboard'>
      {/* <Tooltip title="Dashboard" placement="bottom-end"> */}
        <ListItem button>
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      {/* </Tooltip> */}
    </Link>
    {/* <Link style={style} to='/calendar'>
      <ListItem button>
        <ListItemIcon>
          <Event />
        </ListItemIcon>
        <ListItemText primary="Calendario" />
      </ListItem>
    </Link> */}
    <Link style={style} to='/contacts'>
      {/* <Tooltip title="Contactos" placement="bottom-end"> */}
        <ListItem button>
          <ListItemIcon>
            <Contacts />
          </ListItemIcon>
          <ListItemText primary="Contactos" />
        </ListItem>
      {/* </Tooltip> */}
    </Link>
    <Link style={style} to='/files'>
      {/* <Tooltip title="Archivos" placement="bottom-end"> */}
        <ListItem button>
          <ListItemIcon>
            <Folder />
          </ListItemIcon>
          <ListItemText primary="Archivos" />
        </ListItem>
      {/* </Tooltip> */}
    </Link>
  </div>
);

export const userListItems = (
  <div>
    <Link style={style} to='/tasks'>
      {/* <Tooltip title="Tareas" placement="bottom-end"> */}
        <ListItem button>
          <ListItemIcon>
            <DoneAll />
          </ListItemIcon>
          <ListItemText primary="Tareas" />
        </ListItem>
      {/* </Tooltip> */}
    </Link>
    <Link style={style} to='/projects'>
      {/* <Tooltip title="Proyectos" placement="bottom-end"> */}
        <ListItem button>
          <ListItemIcon>
            <Work />
          </ListItemIcon>
          <ListItemText primary="Proyectos" />
        </ListItem>
      {/* </Tooltip> */}
    </Link>
    <Link style={style} to='/meetings'>
      {/* <Tooltip title="Juntas" placement="bottom-end"> */}
        <ListItem button>
          <ListItemIcon>
            <InsertInvitation />
          </ListItemIcon>
          <ListItemText primary="Juntas" />
        </ListItem>
      {/* </Tooltip> */}
    </Link>
  </div>
);

export const adminListItems = (
  <div>
    <Link style={style} to='/objectives'>
      {/* <Tooltip title="Objetivos" placement="bottom-end"> */}
        <ListItem button>
          <ListItemIcon>
            <Subject />
          </ListItemIcon>
          <ListItemText primary="Objetivos" />
        </ListItem>
      {/* </Tooltip> */}
    </Link>
    <Link style={style} to='/strategies'>
      {/* <Tooltip title="Estrategias" placement="bottom-end"> */}
        <ListItem button>
          <ListItemIcon>
            <Timeline />
          </ListItemIcon>
          <ListItemText primary="Estrategias" />
        </ListItem>
      {/* </Tooltip> */}
    </Link>
  </div>
);

export const settingsListItems = (
  <div>
    <Link style={style} to='/config'>
      {/* <Tooltip title="Config" placement="bottom-end"> */}
        <ListItem button>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Configuración" />
        </ListItem>
      {/* </Tooltip> */}
    </Link>
  </div>
);