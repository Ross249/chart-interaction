import RectangleDrawing from "@/components/FilterArea/RectangleDrawing";
import Scatterplot from "@/components/Scatterplot";
import { producer } from "@/lib/dataProducer";

export default function Home() {
  const data = producer(2, 10, 10, 10000);
  return (
    <div className="flex">
      <div className="container h-full">
        <Scatterplot width={600} height={400} data={data} />
      </div>
      <RectangleDrawing />
    </div>
  );
}
