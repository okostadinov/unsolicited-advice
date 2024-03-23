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
        <button type="submit">Get Advice</button>
      </form>
      {advice != "" && <p className="advice">{advice}</p>}
      {error != "" && <p className="error">{error}</p>}
    </>
  );
};

export default AdviceGenerator;
