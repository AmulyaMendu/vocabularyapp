import React, { useState } from 'react';
import axios from "axios";
import "./App.css";
import { FaSearch } from "react-icons/fa";
import { FcSpeaker } from "react-icons/fc";

const Dictionary = () => {
    const [data, setData] = useState("");
    const [searchWord, setSearchWord] = useState("");
    const [error, setError] = useState('');

    const getMeaning = async () => {
        if (!searchWord) {
            setError('Please enter a word to search.');
            return;
        }

        // try {
        //     // const response = await axios.get(`http://localhost:5000/api/search?q=${searchWord}`);
        //     // if (response.data.results.length > 0) {
        //     //     setData(response.data.results);
        //     //     console.log(response.data.results);
        //     //     // console.log(response.data.results[0].label);

        //     //     setError('');
        //     // } else {
        //     //     setData(null);
        //     //     setError('No results found.');
        //     // }

        //     const response = await axios.get(`http://localhost:5000/api/words/${searchWord}`);
        //     console.log(response.data);

        //     // if (response.data.results.length > 0) {
        //     //     setData(response.data.results);
        //     //     console.log(response.data.results);
        //     //     // console.log(response.data.results[0].label);

        //     //     setError('');
        //     // } else {
        //     //     setData(null);
        //     //     setError('No results found.');
        //     // }
        // } catch (error) {
        //     console.error(error);
        //     setError('Error fetching data. Please try again.');
        //     setData(null);
        // }

        try {
            const response = await axios.get(`http://localhost:5000/api/words/${searchWord}`);
            console.log(response.data.entries);
            if (response.data.entries.length > 0) {
                setData(response.data.entries);
                setError('');
            } else {
                setData(null);
                setError('No results found.');
            }

        } catch (error) {
            console.error("error");
        }
    };

    return (
        <div className="searchBox">
            <input
                type="text"
                placeholder="Search..."
                value={searchWord}
                onChange={(e) => {
                    setSearchWord(e.target.value);
                }}
            />
            <button onClick={getMeaning}>
                <FaSearch size="20px" />
            </button>
            {data.length > 0 && (
                <div className="showResults">
                    {data.map((item, index) => (
                        <div key={index} style={{ backgroundColor: "pink" }}>
                            <h4>{item.matchString}</h4>
                            <p>{item.label}</p>
                            <p>{item.matchType}</p>

                        </div>

                    ))}
                </div>
            )}


        </div>
    );
};



export default Dictionary;
