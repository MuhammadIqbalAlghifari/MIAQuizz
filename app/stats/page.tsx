import StatCard from "@/components/StatCard";
import { fetchUsers } from "../(auth)/actions/fetchUsers";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  const currentUser = await fetchUsers();
  return {
    props: {
      currentUser: currentUser?.data || null,
    },
  };
};

const Page = ({ currentUser }: { currentUser: any }) => {
  if (!currentUser) {
    return <div>Error loading user data</div>;
  }

  return (
    <div className="py-20">
      <div className="text-center mb-10 text-2xl uppercase">
        <h1>{currentUser.user.username} Statistik 📊</h1>
      </div>
      <div className="max-w-[1500px] mx-auto w-[90%] grid sm:grid-cols-3 gap-10 justify-center">
        <StatCard
          title="Total Points"
          value={currentUser.quizResults[0].quizScore}
        />
        <StatCard
          title="Jawaban Benar"
          value={currentUser.quizResults[0].correctAnswers}
        />
        <StatCard
          title="Jawaban Salah"
          value={currentUser.quizResults[0].wrongAnswers}
        />
      </div>
    </div>
  );
};

export default Page;
