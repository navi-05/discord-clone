import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { NextResponse } from "next/server"

export async function PATCH (
  req: Request,
  { params }: { params: { serverId: string }}
) {
  try {
    const profile = await currentProfile();
    if(!profile) return new NextResponse("Unauthorized", { status: 401 })

    if(!params.serverId) return new NextResponse("ServerId missing", { status: 400 })

    const server = await db.server.update({
      where: {
        id: params.serverId,
        // Making sure that admin cannot leave the server themself
        profileId: {
          not: profile.id
        },
        // Confirming that a person who's trying to leave the server is actually a member of the server itself
        members: {
          some: {
            profileId: profile.id
          }
        }
      },
      data: {
        members: {
          deleteMany: {
            profileId: profile.id
          }
        }
      }
    })

    return NextResponse.json(server)

  } catch (error) {
    console.log("[SERVER_ID_LEAVE]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}