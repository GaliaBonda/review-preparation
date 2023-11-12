import { GridBox } from "@components/GridBox";
import React from "react";

async function getData() {
  const result = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 0 },
  }).then((res) => {
    return res.json();
  });
  // console.log(result);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error("Failed to fetch data");
  // }

  return result;
}

const Page = async () => {
  const posts: { id: number; body: string; title: string }[] = await getData();
  console.log(posts);

  return (
    <div className="p-4 flex flex-col gap-5">
      <h1>Grid</h1>
      <GridBox posts={posts} />
    </div>
  );
};

export default Page;
