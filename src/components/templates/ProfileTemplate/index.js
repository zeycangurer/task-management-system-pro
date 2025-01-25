import React from 'react'
import TitleAtom from '../../atoms/Title'
import ProfileFieldMolecule from '../../molecules/ProfileField'
import ProfileFormOrganism from '../../organisms/ProfileForm'

export default function ProfileTemplate({user}) {
    return (
        <div className='profile-page'>
            <TitleAtom level={1} className="title">Profil Bilgileri</TitleAtom>
            <div className="profile-info-field">
                <ProfileFieldMolecule user={user}/>
                <ProfileFormOrganism user={user}/>
            </div>
        </div>
    )
}
