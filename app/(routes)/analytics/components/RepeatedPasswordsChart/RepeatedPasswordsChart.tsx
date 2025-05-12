"use client";
import { RepeatedPasswordsChartProps } from "./RepeatedPasswordsChart.types";
import { TrendingUp } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function RepeatedPasswordsChart(props: RepeatedPasswordsChartProps) {
  const { repeated, unique } = props;
  const totalPasswords = unique + repeated;

  const chartData = [{ month: "", unique: unique, repeated: repeated }];
  const chartConfig = {
    unique: {
      label: "Repetidas",
      color: "#2563eb",
    },
    repeated: {
      label: "Unicas",
      color: "#60a5fa",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Contraseñas repetidas vs unicas</CardTitle>
        <CardDescription>
          Previsualiza tus contraseñas repetidas
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (
                    viewBox &&
                    typeof viewBox === "object" &&
                    "cx" in viewBox &&
                    "cy" in viewBox
                  ) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy ?? 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalPasswords.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy ?? 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Contraseñas
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="unique"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-unique)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="repeated"
              fill="var(--color-repeated)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Prueba no repetir la misma contraseña{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Mostrando el total de contraseñas creadas
        </div>
      </CardFooter>
    </Card>
  );
}
