import React from 'react'
import { useSearch } from "../context/search";
import '../App.css';



const DetailsPage = () => {
    const [values, setValues] = useSearch();

    return (
        <div>
            <h1>Search Resuts</h1>
            <h1>
                {values?.results.length < 1
                    ? "No Products Found"
                    : `Found ${values?.results.length}`}
            </h1>
            {values?.results.map((item, index) => (
                <div className='details' style={{ backgroundColor: "whitesmoke" }}>
                    <h5>HTTPS: </h5>
                    <h4>Data {item.matchString}-{item.label}</h4>
                    {/* <p>{item.label}</p> */}
                    <p>Build beautiful Design,usuable products faster.material design is a adaptable system.
                        backed by open source code-that helps the team build high quality digital experiences {item.matchType}</p>
                </div>

            ))}

        </div>
    )
}

export default DetailsPage