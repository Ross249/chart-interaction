export type InteractionData = {
  xPos: number;
  yPos: number;
  name: string;
};

type TooltipProps = {
  interactionData: InteractionData | null;
};

export const Tooltip = ({ interactionData }: TooltipProps) => {
  if (!interactionData) {
    return null;
  }
  if (interactionData) {
    console.log(interactionData);
  }

  return (
    <div
      className="absolute  rounded bg-neutral-900/80 text-slate-100 text-xs p-1 ml-4 "
      style={{
        left: interactionData.xPos,
        top: interactionData.yPos,
      }}
    >
      {interactionData.name}
    </div>
  );
};
