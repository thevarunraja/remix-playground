import { redirect } from "remix";

export const loader = async () => {
  return redirect("/hn");
};

export default function Index() {
  return null;
}
