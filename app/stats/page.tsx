"use client"
import { useEffect, useState } from "react";
import StatCard from "@/components/StatCard";
import { fetchUsers } from "../(auth)/actions/fetchUsers";

const StatsPage = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUsers();
        setCurrentUser(userData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state if necessary
      }
    };

    fetchData();
  }, []);

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

export default StatsPage;
