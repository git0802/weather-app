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
  const [activeTab, setActiveTab] = React.useState("html");
  console.log("weather: ", tabData);

  const data = [
    {
      label: "WEEKLY FORECAST",
      value: "DayForcast",
      desc: <DayForcast data={tabData.tabData} />,
    },
    {
      label: "SUMMARY",
      value: "Summary",
      desc: <Summary data={tabData.tabData} />,
    },
  ];
  return (
    <Tabs value={activeTab}>
      <TabsHeader
        className="rounded-none text-[#202b3c] font-semibold text-sm bg-transparent p-0"
        indicatorProps={{
          className: "bg-transparent shadow-none rounded-none",
        }}
      >
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => setActiveTab(value)}
            className={activeTab === value ? "text-[#c4cad3]" : ""}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody className="text-[#202b3c]">
        {data.map(({ value, desc }) => (
          <TabPanel className="p-0" key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
