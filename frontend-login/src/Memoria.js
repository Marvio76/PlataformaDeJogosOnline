import React, { useEffect, useState } from "react";

function Memoria() {
    const [pares, setPares] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3002/jogos/memoria")
            .then(res => res.json())
            .then(data => setPares(data));
    }, []);

    return (
        <div>
            <h2>Jogo da Memória</h2>
            <ul>
                {pares.map((p, index) => (
                    <li key={index}>{p.termo} ↔ {p.definicao}</li>
                ))}
            </ul>
        </div>
    );
}

export default Memoria;
