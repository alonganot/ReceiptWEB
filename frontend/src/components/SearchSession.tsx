import { TextField } from '@mui/material'
import '../styles/Navbar.css'
import { Subtitle } from '../styles/SharedStyles'
import { ChangeEvent, useEffect, useState } from 'react'
import { api } from '../../data/api'
import { Session } from '../types/Sesssion'
import SessionList from './SessionList'

function SearchSession({ header, route }: { header: string, route: string }) {
  const [searchedValue, setSearchedTitle] = useState<string>('')
  const [foundSessions, setFoundSessions] = useState<Session[]>([])
 
  const changeSearchedValue = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchedTitle(event.target.value as string);
  };

  useEffect(() => {
    const updateResults = async (value: string) => {
        const res = await api().sessions().getByValue(route, value)
        setFoundSessions(res)
        console.log(foundSessions);
        
    }

    if (searchedValue.length > 0) {
        updateResults(searchedValue).catch(console.error);
    }
  }, [searchedValue])

    return (
        <>
            <Subtitle dir="rtl" variant='h5'>{header}</Subtitle>
            <TextField style={{direction: "rtl", fontSize: '50px'}} onChange={changeSearchedValue} variant="standard" />
            {foundSessions.length > 0 && <SessionList sessions={foundSessions} />}
        </>
    )
}

export default SearchSession
