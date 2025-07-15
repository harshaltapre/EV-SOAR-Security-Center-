"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

// Workaround for https://github.com/recharts/recharts/issues/3615
const Customized = <T extends abstract new (...args: any) => any>(Component: T) => {
  return React.forwardRef<InstanceType<T>, React.ComponentProps<T>>((props, ref) => <Component {...props} ref={ref} />)
}

const Recharts = {
  ...RechartsPrimitive,
  ResponsiveContainer: Customized(RechartsPrimitive.ResponsiveContainer),
  AreaChart: Customized(RechartsPrimitive.AreaChart),
  Area: Customized(RechartsPrimitive.Area),
  BarChart: Customized(RechartsPrimitive.BarChart),
  Bar: Customized(RechartsPrimitive.Bar),
  LineChart: Customized(RechartsPrimitive.LineChart),
  Line: Customized(RechartsPrimitive.Line),
  PieChart: Customized(RechartsPrimitive.PieChart),
  Pie: Customized(RechartsPrimitive.Pie),
  RadarChart: Customized(RechartsPrimitive.RadarChart),
  Radar: Customized(RechartsPrimitive.Radar),
  RadialBarChart: Customized(RechartsPrimitive.RadialBarChart),
  RadialBar: Customized(RechartsPrimitive.RadialBar),
  ScatterChart: Customized(RechartsPrimitive.ScatterChart),
  Scatter: Customized(RechartsPrimitive.Scatter),
  ComposedChart: Customized(RechartsPrimitive.ComposedChart),
  FunnelChart: Customized(RechartsPrimitive.FunnelChart),
  Funnel: Customized(RechartsPrimitive.Funnel),
  Treemap: Customized(RechartsPrimitive.Treemap),
}

const ChartContext = React.createContext<{
  config: ChartConfig
} | null>(null)

type ChartConfig = {
  [k: string]: {
    label?: string
    icon?: React.ComponentType
  } & ({ type: "color"; color?: string; theme?: Record<string, string> } | { type: "icon" })
}

type ChartContainerProps = React.ComponentProps<typeof Recharts.ResponsiveContainer> & {
  config: ChartConfig
  children: React.ReactNode
}

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ config, className, children, ...props }, ref) => {
    const newConfig = React.useMemo(() => {
      if (config.theme) {
        return {
          ...config,
          theme: {
            ...config.theme,
            light: {
              ...config.theme.light,
              primary: "hsl(var(--chart-1))",
              secondary: "hsl(var(--chart-2))",
              tertiary: "hsl(var(--chart-3))",
              quaternary: "hsl(var(--chart-4))",
              quinary: "hsl(var(--chart-5))",
            },
            dark: {
              ...config.theme.dark,
              primary: "hsl(var(--chart-1))",
              secondary: "hsl(var(--chart-2))",
              tertiary: "hsl(var(--chart-3))",
              quaternary: "hsl(var(--chart-4))",
              quinary: "hsl(var(--chart-5))",
            },
          },
        }
      }
      return config
    }, [config])

    return (
      <ChartContext.Provider value={{ config: newConfig }}>
        <div ref={ref} className={cn("flex h-[300px] w-full items-center justify-center overflow-hidden", className)}>
          <Recharts.ResponsiveContainer {...props}>{children}</Recharts.ResponsiveContainer>
        </div>
      </ChartContext.Provider>
    )
  },
)
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = Recharts.Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof Recharts.Tooltip> & {
    hideLabel?: boolean
    hideIndicator?: boolean
    is
    nameKey?: string
    labelKey?: string
  }
>(({ className, viewBox, hideLabel = false, hideIndicator = false, is, nameKey, labelKey, ...props }, ref) => {
  const { config } = useChart()
  const id = React.useId()

  if (hideLabel) {
    return null
  }

  return (
    <ChartTooltip
      ref={ref}
      wrapperClassName={cn(
        "z-50 overflow-hidden rounded-md border border-border bg-background px-3 py-1.5 text-sm shadow-md",
        className,
      )}
      contentStyle={{
        padding: 0,
      }}
      labelStyle={{
        padding: 0,
      }}
      cursor={{
        stroke: "hsl(var(--border))",
        strokeWidth: 1,
      }}
      itemStyle={{
        padding: 0,
      }}
      formatter={(value, name, item) => {
        const key = nameKey || item?.dataKey || name
        const found = config[key as keyof typeof config]

        if (found && "icon" in found && found.icon) {
          const Icon = found.icon
          return (
            <span className="flex items-center gap-1.5">
              <Icon className="h-3 w-3" />
              {value}
            </span>
          )
        }
        return value
      }}
      labelFormatter={(value) => {
        if (labelKey) {
          return config[labelKey as keyof typeof config]?.label || value
        }
        return value
      }}
      {...props}
      content={({ payload, label }) => {
        if (!payload || !payload.length) {
          return null
        }

        return (
          <div className="grid min-w-[8rem] items-start text-xs">
            {!hideLabel && label ? (
              <div className="border-b border-border px-3 py-2 text-muted-foreground">
                {config[label as keyof typeof config]?.label || label}
              </div>
            ) : null}
            <div className="p-2">
              {payload.map((item, index) => {
                const key = nameKey || item.dataKey || item.name
                if (!key) {
                  return null
                }
                const found = config[key as keyof typeof config]

                return (
                  <div key={`item-${id}-${index}`} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      {!hideIndicator && (
                        <div
                          className={cn("h-2 w-2 rounded-full", item.color)}
                          style={{
                            backgroundColor: item.color,
                          }}
                        />
                      )}
                      {found && "icon" in found && found.icon ? <found.icon className="h-3 w-3" /> : null}
                      <span className="text-muted-foreground">{found?.label || item.name}</span>
                    </div>
                    <span className="font-medium text-foreground">{item.value}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )
      }}
    />
  )
})
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegend = Recharts.Legend

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof Recharts.Legend> & {
    hideIcon?: boolean
    nameKey?: string
  }
>(({ className, hideIcon = false, nameKey, ...props }, ref) => {
  const { config } = useChart()
  const id = React.useId()

  return (
    <ChartLegend
      ref={ref}
      {...props}
      content={({ payload }) => {
        if (!payload || !payload.length) {
          return null
        }

        return (
          <div className={cn("flex flex-wrap items-center justify-center gap-4", className)}>
            {payload.map((item, index) => {
              const key = nameKey || item.dataKey || item.name
              if (!key) {
                return null
              }
              const found = config[key as keyof typeof config]

              return (
                <div key={`item-${id}-${index}`} className="flex items-center gap-1.5">
                  {!hideIcon && (
                    <div
                      className={cn("h-2 w-2 rounded-full", item.color)}
                      style={{
                        backgroundColor: item.color,
                      }}
                    />
                  )}
                  {found && "icon" in found && found.icon ? <found.icon className="h-3 w-3" /> : null}
                  <span className="text-sm text-muted-foreground">{found?.label || item.name}</span>
                </div>
              )
            })}
          </div>
        )
      }}
    />
  )
})
ChartLegendContent.displayName = "ChartLegendContent"

// Helper to use ChartContext and ensure it's not null
function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }
  return context
}

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, Recharts, useChart }
