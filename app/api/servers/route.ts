import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name = "Default Server Name", imageUrl = "/default-image.jpg" } = await req.json(); // Corrigido o caminho da imagem
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: [{ name: "general", profileId: profile.id }]
        },
        members: {
          create: [{ profileId: profile.id, role: MemberRole.ADMIN }]
        }
      }
    });

    return NextResponse.json({ serverId: server.id });
  } catch (error) {
    console.log("[SERVERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
export async function GET(req: Request) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Suponha que queremos buscar o primeiro servidor associado ao profileId do usuário atual
    const server = await db.server.findFirst({
      where: {
        profileId: profile.id
      }
    });

    if (server) {
      return NextResponse.json({ serverId: server.id, name: server.name, imageUrl: server.imageUrl });
    } else {
      return new NextResponse("No server found", { status: 404 });
    }
  } catch (error) {
    console.log("[SERVERS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}