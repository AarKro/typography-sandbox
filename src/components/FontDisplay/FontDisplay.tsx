import { FC, useMemo, useState } from "react";
import { useAtom } from "jotai";
import { Card, CardBody } from "@nextui-org/react";
import { masterConfigAtom, useFontDisplayById,  } from "../../jotaiStore";
import { getStyles } from "../../utils";

interface Props {
  id: string;
}

export const FontDisplay: FC<Props> = ({ id }) => {
  const fontDisplay = useFontDisplayById(id);
  const [ masterConfig ] = useAtom(masterConfigAtom);
  const [ overwriteMaster ] = useState<boolean>(false);

  const styles: React.CSSProperties = useMemo(() => ({
    width: `${fontDisplay.width}px`,
    height: `${fontDisplay.height}px`,
    ...getStyles(overwriteMaster ? fontDisplay.fontConfig : masterConfig)
  }), [fontDisplay.fontConfig, fontDisplay.height, fontDisplay.width, masterConfig, overwriteMaster]);

  return (
    <Card className="m-2" style={styles}>
      <CardBody>
        <p>
          {overwriteMaster ? fontDisplay.fontConfig.content : masterConfig.content}
        </p>
      </CardBody>
    </Card>
  );
}