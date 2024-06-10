import Quiz from "@/components/Quiz";
import { client } from "@/sanity/lib/client";
import { fetchUsers } from "../(auth)/actions/fetchUsers";

export const dynamic = "force-dynamic";

const getData = async () => {
  const query = `*[_type == "questions"]{
    question,
    answers,
    correctAnswer
  }`;

  const data = await client.fetch(query);

  return data;
};

const page = async () => {
  try {
    const questions = await getData();
    const user = await fetchUsers();
    const userId = user?.data.user.id;

    if (!questions || questions.length === 0) {
      // Handle case where questions are not available
      console.error("No questions fetched.");
      return <div>No questions available.</div>;
    }

    return (
      <>
        <Quiz questions={questions} userId={userId} />
      </>
    );
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    return <div>Error fetching quiz data.</div>;
  }
};

