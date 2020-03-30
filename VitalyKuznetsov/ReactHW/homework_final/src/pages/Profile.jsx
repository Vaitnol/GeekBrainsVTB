import React from 'react';
import MenuAppBar from '../components/Header/Header';
import { ProfileContent } from '../components/Profile/Profile';

import './page-styles/Profile.css';

export function Profile() {
    return (
        <div className='profile'>
            <MenuAppBar />
            <ProfileContent />
        </div>
    )
}