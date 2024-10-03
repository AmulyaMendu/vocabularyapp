import React from "react"
const initialState = {
    words: [],
    progress: {},
}; export default function Reducer(state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case 'ADD_WORD':
            return { ...state, words: [...state.words, payload] };
        case 'REMOVE_WORD':
            return { ...state, words: state.words.filter(word => word !== payload) };
        default:
            return state;
    }
}