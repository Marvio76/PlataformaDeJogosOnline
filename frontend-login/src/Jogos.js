import React, { useState } from "react";
import Quiz from "./Quiz";
import Memoria from "./Memoria";
import Associacao from "./Associacao";

function Jogos() {
    const [jogoSelecionado, setJogoSelecionado] = useState(null);

    const renderJogo = () => {
        if (jogoSelecionado === "quiz") return <Quiz />;
        if (jogoSelecionado === "memoria") return <Memoria />;
        if (jogoSelecionado === "associacao") return <Associacao />;
        return null;
    };

    return (
        <div>
            <h1>Escolha um Jogo</h1>
            <button onClick={() => setJogoSelecionado("quiz")}>Quiz</button>
            <button onClick={() => setJogoSelecionado("memoria")}>Memória</button>
            <button onClick={() => setJogoSelecionado("associacao")}>Associação</button>
            {renderJogo()}
        </div>
    );
}

export default Jogos;
