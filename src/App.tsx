import { FC } from "react";
import { FontHandler } from "./components/FontHandler/FontHandler";
import { useAtom } from "jotai";
import { fontDisplaysAtom } from "./jotaiStore";
import { FontDisplay } from "./components/FontDisplay/FontDisplay";
import "./App.scss";

export const App: FC = () => {
  const [ fontDisplays ] = useAtom(fontDisplaysAtom);

  return (
    <div>
      <FontHandler/>
      {Object.keys(fontDisplays).map((key) => (
        <FontDisplay id={key} />
      ))}
    </div>
  );
};