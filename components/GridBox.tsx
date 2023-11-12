"use client";

import React, { FC, useEffect } from "react";

export const GridBox: FC<{
  posts: { id: number; title: string; body: string }[];
}> = ({ posts }) => {
  useEffect(() => {
    window.addEventListener("popstate", function (event) {
      // Handle popstate event
      console.log("State changed:", event.state);
    });
  }, []);
//   return React.createElement("div", { style: { backgroundColor: "red" } }, 'hello!', React.createElement('span', {}, 'liiii'));
//change!!
//change for new one
  return (
    <>
      <button
        className="w-[max-content] border border-slate-700 bg-slate-300 rounded p-2"
        onClick={() => {
          history.replaceState({ data: "some data" }, "Title", "/questions");
        }}
      >
        Click me
      </button>
      <picture>
        <source
          media="(min-width: 1200px)"
          srcSet="assets/Landscape-Color.jpg"
        />
        <source media="(min-width: 600px)" srcSet="assets/cry.png" />
        <img src="assets/images.png" alt="Description" />
      </picture>
      <div className="grid-box">
        {posts.map(({ title, body, id }) => {
          return (
            <div key={id} className="post">
              <h3>{title}</h3>
              <div>{body}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};
