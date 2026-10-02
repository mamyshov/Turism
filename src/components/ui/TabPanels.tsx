"use client";

import { useState } from "react";
import { Tabs, type TabItem } from "@/components/ui/Tabs";

export type TabPanel = TabItem & { content: React.ReactNode };

export function TabPanels({ panels }: { panels: TabPanel[] }) {
  const [active, setActive] = useState(panels[0]?.key ?? "");
  const current = panels.find((p) => p.key === active);
  return (
    <div>
      <Tabs
        items={panels.map(({ content: _content, ...item }) => item)}
        active={active}
        onChange={setActive}
      />
      <div className="pt-6" role="tabpanel">
        {current?.content}
      </div>
    </div>
  );
}
