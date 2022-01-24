import { MetaFunction, Outlet, useLoaderData, Link } from "remix";
import { IStory, fetchHNStories } from "../utils/fetchHNData";

export const meta: MetaFunction = () => {
  return {
    title: "HN",
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

export default function stories() {
  const stories = useLoaderData<IStory[]>();

  return (
    <div className="p-4">
      <div className="flex w-full">
        <div className="fixed w-1/4 top-4 bottom-4 bg-181818">
          <div className="h-full overflow-auto">
            <div className="p-4">
              {stories.map((story) => (
                <Link key={story.id} to={`/hn/${story.id}`}>
                  <button className="p-2 text-left border-0 bg-none">
                    <div>{story.title}</div>
                    <div className="dark:text-gray-600">{story.by}</div>
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="relative w-3/4 left-1/4">
          <div className="p-4">
            <div className="px-4">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
