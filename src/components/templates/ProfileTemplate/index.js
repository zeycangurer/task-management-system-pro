import React from 'react'
import TitleAtom from '../../atoms/Title'
import ProfileFieldMolecule from '../../molecules/ProfileField'
import ProfileFormOrganism from '../../organisms/ProfileForm'
import { useTranslation } from 'react-i18next';

export default function ProfileTemplate({user}) {
    const { t } = useTranslation(); 

    return (
        <div className='profile-page'>
            <TitleAtom level={1} className="title">{t('Profile Information')}</TitleAtom>
            <div className="profile-info-field">
                <ProfileFieldMolecule user={user}/>
                <ProfileFormOrganism user={user}/>
            </div>
        </div>
    )
}
