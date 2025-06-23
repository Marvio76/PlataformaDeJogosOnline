import React, { useState } from "react";
import LoginCadastro from "./LoginCadastro";
import Jogos from "./Jogos";

function App() {
  const [logado, setLogado] = useState(false);

  return (
    <div>
      {logado ? <Jogos /> : <LoginCadastro onLoginSuccess={() => setLogado(true)} />}
    </div>
  );
}

export default App;
