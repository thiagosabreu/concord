"use client";

import { useEffect } from "react";

const Reload = ({ serverId }: { serverId: string }) => {
  useEffect(() => {
    const prevServerId = sessionStorage.getItem("prevServerId");
    if (prevServerId !== serverId) {
      sessionStorage.setItem("prevServerId", serverId);
      window.location.reload();
    }
  }, [serverId]);

  return null;
};

export default Reload;
