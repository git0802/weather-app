import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import DayForcast from "./day-forecast";
import Summary from "./summary";

export function UnderlineTabs(tabData: any) {
  const [activeTab, setActiveTab] = React.useState("dayForcast");

  const data = [
    {
      label: "WEEKLY FORECAST",
      value: "dayForcast",
      desc: <DayForcast data={tabData.tabData} />,
    },
    {
      label: "SUMMARY",
      value: "summary",
      desc: <Summary data={tabData.tabData} />,
    },
  ];

  return (
    <Tabs value={activeTab}>
      <TabsHeader
        className="rounded-none text-[#202b3c] font-semibold text-sm bg-transparent p-0"
        indicatorProps={{
          className: "bg-gray-900/10 shadow-none !text-gray-900",
        }}
      >
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => setActiveTab(value)}
            className={
              activeTab === value
                ? "bg-[#202b3c] text-white font-semibold text-sm rounded-full"
                : "text-[#c4cad3] font-semibold text-sm"
            }
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel className="p-0" key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
