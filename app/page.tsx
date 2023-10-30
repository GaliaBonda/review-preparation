import React from "react";
import { Questions } from "@components/Questions";

async function getData() {
  const result = await fetch("http://localhost:3000/api/question/", {
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

const Home = async () => {
  // const router = useRouter();

  const questions = await getData();

  return (
    <div className="h-full flex flex-col">
      {/* <Nav /> */}
      <h1 className="my-5 uppercase font-bold text-4xl from-blue-600 via-violet-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">
        Preparation for the review
      </h1>

      {/* <CustomButton
        className="w-[max-content]"
        onClick={() => {
          router.push("/questions/new");
        }}
      >
        Create new question
      </CustomButton> */}
      {questions ? (
        <Questions questions={questions} />
      ) : (
        <div className="flex justify-center basis-full">
          <p className="mt-[30vh] h-[max-content] font-medium text-lg">
            No questions added yet...
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
