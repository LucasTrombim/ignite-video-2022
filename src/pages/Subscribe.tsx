import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { useCreateSubscriberMutation } from "../graphql/generated";

export function Subscribe() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  const [createSubscriber, { loading }] = useCreateSubscriberMutation();
  const navigate = useNavigate();
  
  async function handleSubscribe(e: FormEvent) {
    e.preventDefault();
    await createSubscriber({
      variables: {
        name, email
      }
    })
    navigate("/event");
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-no-repeat bg-cover bg-blur">
      <div className="max-w-[1100px] flex items-center justify-between mt-20 mx-auto w-full">
        <div className="max-w-[640px]">
          <Logo />
          <h1 className="mt-8 text-[2.5rem] leading-tight ">Construa uma <strong className="text-blue-500">aplicação completa</strong>, do zero, com <strong className="text-blue-500">React</strong></h1>
          <p className="mt-4 leading-relaxed text-gray-200">Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado.</p>
        </div>
        <div className="p-8 bg-gray-700 border border-gray-500 rounded">
          <strong className="block mb-6 text-2xl">Inscreva-se gratuitamente</strong>
          <form className="flex flex-col w-full gap-2" onSubmit={handleSubscribe}>
            <input 
              type="text"
              placeholder="Seu nome completo"
              onChange={(event) => setName(event.target.value)}
              value={name}
              className="px-5 bg-gray-900 h-14"/>
            <input 
              type="email"
              placeholder="Digite seu e-mail"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
              className="px-5 bg-gray-900 h-14"/>
              <button disabled={loading} type="submit" className="py-4 mt-4 text-sm font-bold uppercase transition bg-green-500 rounded disabled:opacity-50 hover:bg-green-700">
                Garantir minha vaga
              </button>
          </form>
        </div>
      </div>
      <img src="/src/assets/code-bg.png" alt="" className="mt-10" />
    </div>
  )
}