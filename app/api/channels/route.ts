import { NextResponse } from "next/server"
import { MemberRole } from "@prisma/client"

import { db } from "@/lib/db"
import { currentProfile } from "@/lib/current-profile"

export async function POST(
  req: Request,
) {
  try {
    const profile = await currentProfile()
    const { name, type } = await req.json()
    const { searchParams } = new URL(req.url)
    const serverId = searchParams.get('serverId')

    if(!profile) return new NextResponse("Unauthorized", { status: 401 })
    if(!serverId) return new NextResponse("ServerID missing", { status: 400 })

    // Preventing users from creating channel named general
    if(name === 'general') return new NextResponse("Name cannot be general", { status: 400 })

    const server = await db.server.update({
      where: {
        id: serverId,
        // Giving access to admin and moderator to create channel
        // ! Not every member can create a channel inside a server
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR]
            }
          }
        }
      },
      data: {
        channels: {
          create: {
            profileId: profile.id,
            name,
            type
          }
        }
      }
    })

    return NextResponse.json(server)


  } catch (error) {
    console.log("[CHANNELS_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}