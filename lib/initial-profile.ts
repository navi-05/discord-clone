import { currentUser, redirectToSignIn } from "@clerk/nextjs";

import { db } from "./db";

// * Checks whether there is a user logged in and returns the profile associated with the userId
// ? If there is no profile associated with the user logged in, new profile is created for that userId

export const initialProfile = async () => {
  const user = await currentUser()
  if(!user) return redirectToSignIn();

  const profile = await db.profile.findUnique({
    where: {
      userId: user.id
    }
  })

  if(profile) return profile

  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress
    }
  })

  return newProfile
}