import RectangleDrawing from "@/components/FilterArea/RectangleDrawing";
import Scatterplot from "@/components/Scatterplot";
import { cat_size, item_size, MAX_X, MAX_Y, MIN_X, MIN_Y } from "@/lib/consts";
import { producer } from "@/lib/dataProducer";

export default function Home() {
  const data = producer(cat_size, item_size, MIN_X, MAX_X, MIN_Y, MAX_Y);
  console.log(data);

  return (
    <div className="flex">
      <div className="container h-full">
        <Scatterplot width={600} height={400} data={data} />
      </div>
      <RectangleDrawing />
    </div>
  );
}
