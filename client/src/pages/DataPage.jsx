import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DataPage() {
    const navigate = useNavigate();
    const [listData, setListData] = useState([]);
    const [filters, setFilters] = useState({
        text: '',
        yearMin: '',
        yearMax: ''
    });




    const questions = () => {


        
        navigate('/questions')


    }


    useEffect(() => {
        const getAllData = async () => {
            const allData = await axios.get("http://localhost:5000/api/complaints");
            setListData(allData.data.Array);
        }
        getAllData();
    }, [])




    const filteredData = listData.filter(item => {
        const matchesText = (item.city?.toLowerCase() || "").includes(filters.text.toLowerCase()) ||
            (item.country_txt?.toLowerCase() || "").includes(filters.text.toLowerCase());

        const year = parseInt(item.iyear);
        const matchesMin = !filters.yearMin || year >= parseInt(filters.yearMin);
        const matchesMax = !filters.yearMax || year <= parseInt(filters.yearMax);

        return matchesText && matchesMax && matchesMin
    })


    return (
        <div>
            <div>
                <h1>Terror Data System</h1>
            </div>
            <hr />
            <div className="filters-container">
                Search: <input
                    type="text"
                    placeholder="Search City/Country..."
                    onChange={e => setFilters({ ...filters, text: e.target.value })}
                />
                Year from: <input
                    type="number"
                    placeholder="Year >"
                    onChange={e => setFilters({ ...filters, yearMin: e.target.value })}
                />
                Year until<input
                    type="number"
                    placeholder="Year <"
                    onChange={e => setFilters({ ...filters, yearMax: e.target.value })}
                />

                <button>Filter</button>
            </div>

            <table className="complaints-table">
                <thead>
                    <tr>
                        <th>Event  ID</th>
                        <th>Year</th>
                        <th>Country</th>
                        <th>City</th>
                        <th>Attack Type</th>
                        <th>Motive</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 ? (
                        filteredData.map((i) => (

                            <tr key={i.eventid}>
                                <td>{i.eventid}</td>
                                <td>{i.iyear}</td>
                                <td>{i.country_txt}</td>
                                <td>{i.city}</td>
                                <td>{i.attacktype1_txt}</td>
                                <td>{i.motive}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td>
                                loding..
                            </td>
                        </tr>
                    )}

                </tbody>
            </table>
            <button onClick={questions}>Go to the questions page</button>

        </div>
    );
}

export default DataPage;
