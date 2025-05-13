import { useState, useEffect, useRef } from "react";
import '../components/ListeTabela.css';

const Listas = () => {
    let [lista, setLista] = useState([]);
    const [pegar, setPegar] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3000/lista")
            .then((resposta) => resposta.json())
            .then((json) => setLista(json));
    }, []);

    console.log(lista);
    console.log(lista.id);

    const apagou = (e) => {
        e.preventDefault();

        if(pegar[1] === true){
            fetch(`http://localhost:3000/lista/${pegar[0]}`, {
                method: "DELETE"
            })
                .then(response => response.json())
                .then(data => console.log("Item removido!", data))
                .catch(error => console.error("Erro ao apagar", error));
        }

        console.log(lista);
        location.reload(true);

    }
     console.log(pegar);

     const pegarRef = useRef();

     if(pegar[1] === true){
        pegarRef.current.setAttribute("disabled", "");
     }

  return (
    <div>
        <table className="Tabela">
            <tbody className="corpo">
                <tr>
                    <th>DATA</th>
                    <th>HORA</th>
                    <th>NOME</th>
                    <th>FERRAMENTAS</th>
                    <th>RETIRADO</th>
                    <th>DEVOVIDA</th>
                </tr>
                {lista.map((lists) => (
                    <tr key={lists.id}>
                        <td>{lists.data}</td>
                        <td>{lists.time}</td>
                        <td>{lists.nome}</td>
                        <td>{lists.valorSelecionado}</td>
                        <td>{lists.Retirada}</td>
                        <td>{lists.Devovida}</td>
                        <td className="BTN"><input className="checker" type="checkbox" ref={pegarRef} value={pegar} onClick={() => setPegar([lists.id, true])}/><button onClick={apagou}>APAGAR</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default Listas;