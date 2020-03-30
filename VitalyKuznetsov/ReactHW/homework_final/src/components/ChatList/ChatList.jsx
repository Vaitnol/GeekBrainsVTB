import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ForumIcon from '@material-ui/icons/Forum';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import './ChatList.css';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function SimpleList(props) {
    const {link, id, name, onDeleted, read} = props;
    console.log(id)
    const classes = useStyles();


    return (
        <div>
            <ListItem>
                <ListItemIcon>
                    <ForumIcon color="primary" /> 
                </ListItemIcon>
                <div className='button-delete'>
                    <DeleteIcon onClick={() => onDeleted(id)}/>    
                </div>
                <Link to={link}>
                <ListItemText primary={name} secondary={read && 'У вас новое сообщение'}/>
                </Link>
            </ListItem>
        </div>
    );
}