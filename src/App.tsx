import { useEffect, useState } from "react";
import { generateTongueTwister } from "./services/geminiService";
import { Twister } from "./types";

function App() {
  const [twister, setTwister] = useState<Twister | null>(null);

  useEffect(() => {
    generateTongueTwister("Easy").then(setTwister);
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Twistopia</h1>
      {twister ? <p>{twister.text}</p> : <p>Loading...</p>}
    </div>
  );
}

export default App;
