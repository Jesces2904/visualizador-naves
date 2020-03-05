import React, { useState, useEffect } from "react";
import "./App.css";

const urlApi = "https://swapi.co/api/";

const Options = () => {
    const [startshipsData, setStartshipsData] = useState([]);
    const dataReturn = [];
    fetch(urlApi + "starships")
        .then(response => {
            return response.json();
        })
        .then(starships => {
            setStartshipsData([...starships.results]);
        });
    dataReturn.push(
        <option key="" value="">
            Seleccione una opcion
        </option>
    );
    startshipsData.map((item, index) => {
        dataReturn.push(
            <option key={index} value={item.url}>
                {item.name}
            </option>
        );
    });
    return dataReturn;
};

const Select = props => {
    return (
        <div>
            <select
                className="select"
                onChange={e => {
                    if (e.target.value !== "") {
                        fetch(e.target.value)
                            .then(response => {
                                return response.json();
                            })
                            .then(dataStarships => {
                                props.setData(dataStarships);
                            });
                    } else {
                        props.setData([]);
                    }
                }}
            >
                <Options></Options>
            </select>
        </div>
    );
};

const ElementData = props => {
    const data = props.data;
    return (
        <div className="dataContent">
            <h1>{data.name}</h1>
            <p>{data.model}</p>
            <hr></hr>
            <h2>Fabricante</h2>
            <p>{data.manufacturer}</p>
            <h2>Largo</h2>
            <p>{data.length} fts.</p>
            <h2>Valor</h2>
            <p>{data.cost_in_credits} creditos.</p>
            <h2>Cantidad Pasajeros</h2>
            <p>{data.passengers}</p>
        </div>
    );
};

const ElementPassengers = () => {
    return (
        <div className="dataContent">
            <h2>Pasajeros</h2>
            <p>Chewbacca</p>
            <p>Han Solo</p>
            <p>Lando Calrissian</p>
            <p>Nien Nunb</p>
        </div>
    );
};

function App() {
    const [showData, setShowData] = useState([]);

    const setDataStartship = data => {
        setShowData(data);
    };

    return (
        <div className="content">
            <Select setData={setDataStartship}></Select>
            {showData.length > 0 ? (
                <div>
                    <ElementData data={showData}></ElementData> <ElementPassengers></ElementPassengers>
                </div>
            ) : null}
        </div>
    );
}

export default App;
