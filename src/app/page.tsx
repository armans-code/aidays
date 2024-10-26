import ChatBot from "./ChatBot";

import { db } from "../db";

export default async function Home() {
  const data = await db.query.wants.findFirst();
  if (!data) return <p>no data</p>;
  return (
    <div>
      <ChatBot />
      <p>{data.first_name}</p>
    </div>
  );
}
