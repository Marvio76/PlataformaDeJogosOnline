import React, { useEffect, useState } from "react";

function Associacao() {
    const [termos, setTermos] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3002/jogos/associacao")
            .then(res => res.json())
            .then(data => setTermos(data));
    }, []);

    return (
        <div>
            <h2>Jogo de Associação</h2>
            <ul>
                {termos.map((item, index) => (
                    <li key={index}>{item.termo} → {item.definicao}</li>
                ))}
            </ul>
        </div>
    );
}

export default Associacao;
