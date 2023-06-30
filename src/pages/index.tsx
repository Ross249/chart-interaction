import RectangleDrawing from "@/components/FilterArea/RectangleDrawing";
import Scatterplot from "@/components/Scatterplot";
import { cat_size, item_size, MAX_X, MAX_Y, MIN_X, MIN_Y } from "@/lib/consts";
import { producer } from "@/lib/dataProducer";
import TreeMap from "@/components/TreeMap";
import { Data } from "@/types/data";

export default function Home({ data }: { data: Data[] }) {
  return (
    <div className="flex flex-col items-center">
      <div className="container h-full flex flex-col ">
        <Scatterplot width={600} height={400} data={data} />
        <TreeMap width={700} height={700} data={data} />
      </div>
      <RectangleDrawing />
    </div>
  );
}

export async function getStaticProps() {
  const data = producer(cat_size, item_size, MIN_X, MAX_X, MIN_Y, MAX_Y);
  console.log(data);
  return {
    props: {
      data: data,
    },
  };
}
