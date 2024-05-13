"use client";

import { Member, MemberRole, Profile, Server } from "@prisma/client";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";

interface ServerMemberProps {
  member: Member & { profile: Profile };
  server: Server;
}



export const ServerMember = ({
  member,
  server
}: ServerMemberProps) => {
  const params = useParams();
  const router = useRouter();



  const onClick = () => {
    router.push(`/servers/${params?.serverId}/conversations/${member.id}`)
  }

  return (
    <><div className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full">
    <UserAvatar 
        src={member.profile.imageUrl}
        className="h-8 w-8 md:h-8 md:w-8"
      />
      <p
        className={cn(
          " font-semibold text-sm text-zinc-500 g dark:text-zinc-400  transition",
          params?.memberId === member.id && "text-primary dark:text-zinc-200 "
        )}
      >
        {member.profile.name}
      </p></div></>
  )
}