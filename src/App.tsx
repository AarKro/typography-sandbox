import { FC } from "react";
import { FontHandler } from "./components/FontHandler/FontHandler";
import { useAtom } from "jotai";
import { fontDisplaysAtom } from "./jotaiStore";
import { FontDisplay } from "./components/FontDisplay/FontDisplay";
import { MasterControls } from "./components/MasterControls/MasterControls";

export const App: FC = () => {
  const [ fontDisplays ] = useAtom(fontDisplaysAtom);

  return (
    <div className="h-screen w-screen p-2 overflow-auto">
      <FontHandler/>
      <MasterControls/>
      <section className="flex flex-row flex-wrap">
        {Object.keys(fontDisplays).map((key) => (
          <FontDisplay key={key} id={key} />
        ))}
      </section>
    </div>
  );
};