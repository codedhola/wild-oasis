import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { useDarkMode } from "../../context/DarkModeContext";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;


type Props = {
  bookings: any;
  numDays: any
}
    

export function SalesChart({ bookings, numDays}: Props){

  const { isDarkMode } = useDarkMode()

  const colors = isDarkMode
  ? {
      totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
      extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
      text: "#e5e7eb",
      background: "#18212f",
    }
  : {
      totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
      extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
      text: "#374151",
      background: "#fff",
    };

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookings
        .filter((booking: any) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc: any, cur: any) => acc + cur.total_price, 0),
      extrasSales: bookings
        .filter((booking: any) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc: any, cur: any) => acc + cur.extra_price, 0),
    };
  });

  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales from {format(allDates?.at(0)!, "MMM dd yyyy")} &mdash;{" "}
        {format(allDates?.at(-1)!, "MMM dd yyyy")}{" "}
      </Heading>
      <ResponsiveContainer height={300} width="100%">
          <AreaChart data={data}>
            <XAxis
                dataKey="label"
                tick={{ fill: colors.text }}
                tickLine={{ stroke: colors.text }}
              />
              <YAxis
                unit="$"
                tick={{ fill: colors.text }}
                tickLine={{ stroke: colors.text }}
              />
            <CartesianGrid strokeDasharray="4" />
            <Tooltip contentStyle={{ backgroundColor: colors.background }} />
            <CartesianGrid />
            <Tooltip />
            <Area 
              dataKey="totalSales"
              stroke={colors.totalSales.stroke}
              fill={colors.totalSales.fill}
              strokeWidth={2}
              name="Total sales"
              unit="$"
            />
            <Area 
              dataKey="extrasSales"
              stroke={colors.extrasSales.stroke}
              fill={colors.extrasSales.fill}
              strokeWidth={2}
              name="Extras sales"
              unit="$"  
            />
          </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  )
}