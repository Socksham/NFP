import { useEffect, useState, useReducer, useRef } from 'react'
import Gun from 'gun'
import ChatMessage from '../components/ChatMessage'

// initialize gun locally
const gun = Gun()

// create the initial state to hold the messages
const initialState = {
    messages: []
}

// Create a reducer that will update the messages array
function reducer(state, message) {
    return {
        messages: [message, ...state.messages]
    }
}

export default function Chat() {
    // the form state manages the form input for creating a new message
    const [formState, setForm] = useState({
        name: '', message: ''
    })

    const address = useRef("")

    // initialize the reducer & state for holding the messages array
    const [state, dispatch] = useReducer(reducer, initialState)

    // when the app loads, fetch the current messages and load them into the state
    // this also subscribes to new data as it changes and updates the local state
    //TODO: UPDATE CHECKER TO ADDRESS OF USER
    useEffect(() => {
        if (window.ethereum) {
            if (window.ethereum.selectedAddress) {
                address.current = window.ethereum.selectedAddress
                const messages = gun.get('messages')
                var arr = []
                messages.map().on(m => {
                    if (!arr.includes(m.createdAt)) {
                        console.log(window.ethereum.selectedAddress)
                        dispatch({
                            address: window.ethereum.selectedAddress,
                            message: m.message,
                            createdAt: m.createdAt
                        })
                        arr.push(m.createdAt)
                    }

                })
            }
        } else {
            alert("Install Metamask!")
        }

    }, [])

    // set a new message in gun, update the local state to reset the form field
    function saveMessage() {
        const messages = gun.get('messages')
        var message = messages.put({
            address: address.current,
            message: formState.message,
            createdAt: Date.now()
        });
        messages.set(message)
        setForm({
            name: '', message: ''
        })
    }

    // update the form state as the user types
    function onChange(e) {
        setForm({ ...formState, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <input
                onChange={onChange}
                placeholder="Message"
                name="message"
                value={formState.message}
            />
            <button onClick={saveMessage}>Send Message</button>
            {
                state.messages.map(message => (
                    <ChatMessage message={message} />
                ))
            }
        </div>
    );
}