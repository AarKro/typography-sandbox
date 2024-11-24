import { useAtom } from "jotai";
import { FC } from "react";
import { Helmet } from "react-helmet";
import { fontDisplaysAtom } from "../../jotaiStore";

export const FontHandler: FC = () => {
  const [ fontDisplays ] = useAtom(fontDisplaysAtom);

  return (
    <Helmet>
      {Object.entries(fontDisplays).map(([id, config]) => (
        <link key={id} rel="stylesheet" href={`http://fonts.googleapis.com/css?family=${config.fontFamily}`}/>
      ))}
    </Helmet>
  );
};