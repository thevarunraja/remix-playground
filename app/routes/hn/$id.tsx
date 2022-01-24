import { useLoaderData } from "remix";

export const loader = async ({ params }: { params: { id: string } }) => {
  return params.id;
};

export default function PostSlug() {
  const id = useLoaderData();
  return (
    <div>
      <h1>{id} </h1>
    </div>
  );
}
