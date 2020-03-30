import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import './Profile.css';
export const ProfileContent = () => {
    return (
        <div className="profile__wrapper">
            <div className="profile__image">
                <Avatar src="/broken-image.jpg"/>
            </div>
            <div className="profile__info info">
                    <span className="info__link--item">Contacts</span>
                    <span className="info__link--item">Calls</span>
                    <span className="info__link--item">Settings</span>
            </div>
        </div>
    )
}