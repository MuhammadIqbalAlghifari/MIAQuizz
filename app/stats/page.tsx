import StatCard from "@/components/StatCard";
import { fetchUsers } from "../(auth)/actions/fetchUsers";

const StatsPage = ({ currentUser }: { currentUser: any }) => {
  return (
    <div className="py-20">
      <div className="text-center mb-10 text-2xl uppercase">
        <h1>{currentUser?.data?.user.username} Statistik 📊</h1>
      </div>
      <div className="max-w-[1500px] mx-auto w-[90%] grid sm:grid-cols-3 gap-10 justify-center">
        <StatCard
          title="Total Points"
          value={currentUser?.data?.quizResults[0].quizScore}
        />
        <StatCard
          title="Jawaban Benar"
          value={currentUser?.data?.quizResults[0].correctAnswers}
        />
        <StatCard
          title="Jawaban Salah"
          value={currentUser?.data?.quizResults[0].wrongAnswers}
        />
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    const currentUser = await fetchUsers();

    return {
      props: {
        currentUser,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        currentUser: null, // Handle error state if necessary
      },
    };
  }
};

export default StatsPage;
