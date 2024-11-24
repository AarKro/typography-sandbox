import { FC } from "react";
import { FontHandler } from "./components/FontHandler/FontHandler";
import { useAtom } from "jotai";
import { fontDisplaysAtom } from "./jotaiStore";
import { FontDisplay } from "./components/FontDisplay/FontDisplay";
import { MasterControls } from "./components/MasterControls/MasterControls";
import "./App.scss";

export const App: FC = () => {
  const [ fontDisplays ] = useAtom(fontDisplaysAtom);

  return (
    <div>
      <FontHandler/>
      <MasterControls/>
      <section className="display-container">
        {Object.keys(fontDisplays).map((key) => (
          <FontDisplay key={key} id={key} />
        ))}
      </section>
    </div>
  );
};