import { HeadersFunction, MetaFunction, useLoaderData } from "remix";
import fetchHNStories, { IStory } from "~/utils/fetchHNStories";

export const meta: MetaFunction = () => {
  return {
    title: "Home",
  };
};

export let headers: HeadersFunction = () => {
  return {
    "Cache-Control": `public, max-age=${60 * 10}, s-maxage=${60 * 10}`,
  };
};

export const loader = async ({ param = 1 }: { param?: number }) => {
  try {
    const res = await fetchHNStories(param);
    return res;
  } catch (error) {
    return error;
  }
};

export default function Index() {
  const data = useLoaderData<IStory[]>();
  return (
    <div className="flex flex-col tracking-wide">
      <div>
        {data?.map((d) => (
          <div key={d.id} className="p-2">
            <div>{d.title}</div>
            <div className="text-sm text-gray-600">{d.by}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
