"use server"
import { prisma } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"

export const fetchUsers = async () => {
  try {
    const clerkUser = await currentUser()
    console.log("Clerk User:", clerkUser)

    let mongoUser = null
    mongoUser = await prisma.user.findUnique({
      where: {
        clerkUserId: clerkUser?.id
      }
    })

    console.log("Mongo User:", mongoUser)

    if (!mongoUser) {
      let username = clerkUser?.username
      if (!username) {
        username = clerkUser?.firstName + " " + clerkUser?.lastName
      }
      const newUser: any = {
        clerkUserId: clerkUser?.id,
        username,
        email: clerkUser?.emailAddresses[0].emailAddress,
        profilePic: clerkUser?.imageUrl
      }
      console.log("New User:", newUser)
      
      mongoUser = await prisma.user.create({
        data: newUser
      })
    }

    const quizResults = await prisma.quizResult.findMany({
      where: {
        userId: mongoUser.id
      }
    })

    return {
      data: {
        user: mongoUser,
        quizResults
      }
    }
  } catch (error) {
    console.log("Error:", error)
  }
}
