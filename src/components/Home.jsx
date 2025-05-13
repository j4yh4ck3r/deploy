import { useState, useEffect, useRef } from 'react';

const urlList = "http://localhost:3000/lista";

const Home = () => {
    const [lista, setLista] = useState([]);
    const [nome, setNome] = useState([]);
    const [data, setData] = useState([]);
    const [time, setTime] = useState([]);
    const [valorSelecionado, setValorSelecionado] = useState("");
    const [Devovida, setDevovida] = useState(false);
    const [Retirada, setRetirada] = useState(false);
    const RetiradoTrue = useRef();
    const DevovidaTrue = useRef();

    useEffect(() => {

        async function getListas() {
            
            const res = await fetch(urlList);
            const dadosList = await res.json();
            
            setLista(dadosList);
        }
        getListas();
    }, []);


    const listado = async (e) => {
        e.preventDefault();

        console.log(Retirada);

        const Listas = {
            data,
            time,
            nome,
            valorSelecionado,
            Retirada,
            Devovida
        }

        if(Listas.Retirada[0] === true) {
            const res = await fetch(urlList, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(Listas),
            });

            const SalvandoListas = await res.json();

            setLista((prevDados) => [...prevDados, SalvandoListas]);

            location.reload(true);

        }else {
            console.log("não enviou");
        }

        if(Listas.Devovida[0] === true) {
            const res = await fetch(urlList, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(Listas),
            });

            const SalvandoListas = await res.json();

            setLista((prevDados) => [...prevDados, SalvandoListas]);

            location.reload(true);

        }else {
            console.log("não enviou");
        }
    }

    if(Retirada[0] === true){
        RetiradoTrue.current.setAttribute("disabled", "");
        DevovidaTrue.current.setAttribute("disabled", "");

    }

    if(Devovida[0] === true){
        DevovidaTrue.current.setAttribute("disabled", "");
        RetiradoTrue.current.setAttribute("disabled", "");
    }

    console.log(lista);

  return (
    <div>
        <form onSubmit={listado}>
            <input type="date" value={data} onChange={(e) => setData(e.target.value)} />
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)}/>
            <input type="text" value={nome} name='nome' placeholder='nome' onChange={(e) => setNome(e.target.value.toUpperCase())}/>
            <select onChange={(e) => setValorSelecionado(e.target.value)}>
                <option value="selecionar">selecionar</option>
                <option value="MARTELO" >MARTELO</option>
                <option value="SERROTE" >SERROTE</option>
                <option value="ALICATE" >ALICATE</option>
                <option value="FURADEIRA" >FURADEIRA</option>
                <option value="CHAVE DE FENDA" >CHAVE DE FENDA</option>
                <option value="CHAVE DE PHILIPS" >CHAVE DE PHILIPS</option>
            </select>
            <div className='caixaPai'>
                <div className='caixadeverificacao'>
                    <p>Retirada</p>
                    <input className='chekbox' type="checkbox" ref={RetiradoTrue} value={Retirada} onClick={() => setRetirada([true, "RETIRO"])} />
                </div>
                <div className='caixadeverificacao'>
                    <p>Devovida</p>
                    <input className='chekbox' type="checkbox" ref={DevovidaTrue} value={Devovida} onClick={() => setDevovida([true, "RETORNOL"])}/>
                </div>
            </div>
            <input className='btn' type="submit" value="envio" />
        </form>
    </div>
  )
}

export default Home;