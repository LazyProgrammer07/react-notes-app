import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import {config} from '../Constants'

function NotePage({ match, history }) {
    let noteId = match.params.id;

    let [note, setNote] = useState(null)

    useEffect(() => {

        getNote()
    }, [noteId])
    
    let getNote = async() => {
        if(noteId === 'new') return
        let response = await fetch(config.url.API_URL + `/notes/${noteId}`, {'method': 'GET'})
        let data = await response.json()
        setNote(data)
    }

    let createNote = async() => {
        await fetch(config.url.API_URL + `/notes`, {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({...note, 'updated': new Date()})
        })
    }

    let updateNote = async() => {
        await fetch(config.url.API_URL + `/notes/${noteId}`, {
            method:'PATCH',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({...note, 'updated': new Date()})
        })
    }

    let deleteNote = async() => {
        await fetch(config.url.API_URL + `/notes/${noteId}`, {
            method:'DELETE'
        })
        history.push('/')
    }

    let handleSubmit = () => {
        if(noteId !== 'new' && !note.body) {
            deleteNote()
        } else if (noteId !== 'new') {
            updateNote()
        } else if (noteId === 'new' && note !== null) {
            createNote()
        }

        history.push('/')
    }

    return(
        <div className="note">
            <div className="note-header">
                <h3><Link to="/">
                        <ArrowLeft onClick={handleSubmit}/>
                    </Link>
                </h3>  
                {noteId !== 'new' ? (
                    <button onClick={deleteNote}>Delete</button>
                ) : (
                    <button onClick={handleSubmit}>Done</button>
                )}  
                
            </div>
            <textarea onChange={(e) => {setNote({...note, 'body':e.target.value})}} value={note?.body}></textarea>
        </div>
    )
}

export default NotePage;