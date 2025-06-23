import React, { useEffect, useState } from "react";

function Quiz() {
    const [perguntas, setPerguntas] = useState([]);
    const [respostas, setRespostas] = useState({});
    const [pontuacao, setPontuacao] = useState(0);
    const [mostrarResultado, setMostrarResultado] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3002/jogos/quiz")
            .then(res => res.json())
            .then(data => setPerguntas(data));
    }, []);

    const handleResposta = (indexPergunta, respostaSelecionada) => {
        setRespostas({ ...respostas, [indexPergunta]: respostaSelecionada });
    };

    const calcularPontuacao = () => {
        let pontos = 0;
        perguntas.forEach((pergunta, index) => {
            if (respostas[index] === pergunta.respostaCorreta) {
                pontos++;
            }
        });
        setPontuacao(pontos);
        setMostrarResultado(true);
    };

    return (
        <div>
            <h2>Quiz</h2>
            {perguntas.map((q, index) => (
                <div key={index}>
                    <p><strong>{q.pergunta}</strong></p>
                    {q.alternativas.map((alt, i) => (
                        <label key={i}>
                            <input
                                type="radio"
                                name={`pergunta-${index}`}
                                value={alt}
                                onChange={() => handleResposta(index, alt)}
                                disabled={mostrarResultado}
                            />
                            {alt}
                        </label>
                    ))}
                </div>
            ))}
            {!mostrarResultado && (
                <button onClick={calcularPontuacao}>Finalizar Quiz</button>
            )}
            {mostrarResultado && (
                <p>Você acertou {pontuacao} de {perguntas.length}!</p>
            )}
        </div>
    );
}

export default Quiz;
