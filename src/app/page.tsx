import ChatBot from "./ChatBot";

import { db } from "../db";

export default async function Home() {
  const data = await db.query.situations.findMany();
  if (!data) return <p>no data</p>;
  return (
    <div>
      <ChatBot />
      <p>
        {data.map((s) => (
          <div key={s.id}>
            <h2>{s.name}</h2>
            <p>{s.address}</p>
            <p>{s.situation}</p>
          </div>
        ))}
      </p>
    </div>
  );
}
