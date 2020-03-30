import { MessangerRedux } from './containers/MessangerContainer';
import { Profile } from 'pages/Profile';
import { NotFoundPage } from 'pages/NotFoundPage';

export const routes = [
    {
        path: '/',
        exact: true,
        component: MessangerRedux
    },
    {
        path: '/profile',
        exact: true,
        component: Profile
    },
    {
        path: '/settings',
        exact: true,
        component: MessangerRedux
    },
    {
        path: '/chats/:id([\\d]+)',
        exact: true,
        component: MessangerRedux
    },
    {
        path: '*',
        exact: false,
        component: NotFoundPage,
    }
]