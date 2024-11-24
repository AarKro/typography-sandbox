import { useAtom } from "jotai";
import { FC, useState } from "react";
import { upsertFontDisplayByIdAtom } from "../../jotaiStore";
import { getId } from "../../utils";

export const MasterControls: FC = () => {
  const [ , upsertFontDisplayById ] = useAtom(upsertFontDisplayByIdAtom);
  const [ width, setWidth ] = useState<number>(0);
  const [ height, setHeight ] = useState<number>(0);

  const handleSumbit = (event: React.FormEvent) => {
    event.preventDefault();
    
    upsertFontDisplayById([ getId(), {
      fontFamily: 'Consolas',
      width,
      height,
      sizeUnit: 'px',
    }]);
  }

  return (
    <div>
      <form onSubmit={handleSumbit}>
        <input type="number" value={width} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setWidth(Number(event.target.value))}/>
        <input type="number" value={height} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setHeight(Number(event.target.value))}/>
        <button type="submit">
          add
        </button>
      </form>
    </div>
  );
}