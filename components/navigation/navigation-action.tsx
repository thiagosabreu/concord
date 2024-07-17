"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { ActionTooltip } from "@/components/action-tooltip";


export const NavigationAction = () => {
  const router = useRouter();
  
  const handleCreateServer = () => {
    router.push('/servers/create'); // Redireciona para a página de criação de servidor
  }

  return (
    <div>
      <ActionTooltip
        side="right"
        align="center"
        label="Add a server"
      >
        <button
          onClick={handleCreateServer}
          className="group flex items-center"
        >
          <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-[#14143b] group-hover:bg-[#0ddde0]">
            <Plus
              className="group-hover:text-white transition text-emerald-500"
              size={25}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  )
}