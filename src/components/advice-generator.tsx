import { FormEvent, useState } from "react";

const AdviceGenerator = () => {
  const [advice, setAdvice] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      let data = await fetch("https://api.adviceslip.com/advice");
      let json = await data.json();

      setAdvice(json.slip.advice);
    } catch (e) {
      setError(
        "Couldn't fetch an unsolicited advice. Live your life on your terms!"
      );
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          className="border-slate-700 px-3 py-2 rounded-md border text-xl text-stone-700 hover:bg-sky-50 hover:outline-2 hover:outline hover:outline-slate-400 transition ease-in-out delay-75"
        >
          Get Advice
        </button>
      </form>
      {advice !== "" && <p className="italic text-2xl text-stone-800 font-light font-serif">{advice}</p>}
      {error !== "" && <p className="text-stone-800 font-medium text-xl">{error}</p>}
    </>
  );
};

export default AdviceGenerator;
