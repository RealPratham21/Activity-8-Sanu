"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const hourly = [
  { hour: "8 AM", rush: 18, estimated: 22, actual: 20, waste: 0.4 },
  { hour: "9 AM", rush: 32, estimated: 38, actual: 35, waste: 0.7 },
  { hour: "10 AM", rush: 24, estimated: 28, actual: 27, waste: 0.5 },
  { hour: "11 AM", rush: 48, estimated: 54, actual: 51, waste: 1.1 },
  { hour: "12 PM", rush: 92, estimated: 108, actual: 104, waste: 2.4 },
  { hour: "1 PM", rush: 100, estimated: 116, actual: 112, waste: 2.8 },
  { hour: "2 PM", rush: 68, estimated: 74, actual: 71, waste: 1.4 },
  { hour: "3 PM", rush: 38, estimated: 42, actual: 40, waste: 0.8 },
]

const month = [
  { label: "1", savings: 72, waste: 24 }, { label: "4", savings: 86, waste: 18 }, { label: "7", savings: 64, waste: 31 },
  { label: "10", savings: 92, waste: 14 }, { label: "13", savings: 78, waste: 22 }, { label: "16", savings: 96, waste: 11 },
  { label: "19", savings: 88, waste: 17 }, { label: "22", savings: 70, waste: 29 }, { label: "25", savings: 98, waste: 9 }, { label: "28", savings: 84, waste: 16 },
]

export function InsightDialog({ open, onOpenChange, title, description, mode = "day" }: { open: boolean; onOpenChange: (open: boolean) => void; title: string; description: string; mode?: "day" | "month" }) {
  const isMonth = mode === "month"
  return <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-3xl">
      <DialogHeader><DialogTitle>{title}</DialogTitle><DialogDescription>{description}</DialogDescription></DialogHeader>
      {isMonth ? <div className="flex flex-col gap-5">
        <div className="grid grid-cols-3 gap-3"><Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Meals saved</p><p className="mt-1 text-xl font-semibold">1,248</p></CardContent></Card><Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Waste avoided</p><p className="mt-1 text-xl font-semibold">42.6 kg</p></CardContent></Card><Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Cost recovered</p><p className="mt-1 text-xl font-semibold">₹18,420</p></CardContent></Card></div>
        <div className="h-64"><ResponsiveContainer width="100%" height="100%"><BarChart data={month} margin={{ left: -18, right: 8 }}><CartesianGrid vertical={false} stroke="currentColor" opacity={0.12}/><XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fontSize: 11 }}/><YAxis hide/><Tooltip/><Bar dataKey="savings" name="Savings score" fill="#9fbe91" radius={[4,4,0,0]}/><Bar dataKey="waste" name="Waste score" fill="#d7a15c" radius={[4,4,0,0]}/></BarChart></ResponsiveContainer></div>
        <p className="text-xs text-muted-foreground">Each bar compares the predicted savings opportunity with actual food waste across the month. Lower waste scores and taller savings scores indicate healthier operating days.</p>
      </div> : <div className="flex flex-col gap-5">
        <div className="flex flex-wrap gap-2"><Badge variant="secondary">Peak rush 12–2 PM</Badge><Badge variant="secondary">104 meals served at peak</Badge><Badge variant="secondary">₹860 saved today</Badge></div>
        <div className="h-64"><ResponsiveContainer width="100%" height="100%"><LineChart data={hourly} margin={{ left: -18, right: 8 }}><CartesianGrid vertical={false} stroke="currentColor" opacity={0.12}/><XAxis dataKey="hour" tickLine={false} axisLine={false} tick={{ fontSize: 11 }}/><YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11 }}/><Tooltip/><Line type="monotone" dataKey="estimated" name="Estimated" stroke="#aeb4ae" strokeDasharray="5 5" strokeWidth={2}/><Line type="monotone" dataKey="actual" name="Actual" stroke="#9fbe91" strokeWidth={3}/></LineChart></ResponsiveContainer></div>
        <div className="grid grid-cols-4 gap-2">{hourly.map((item) => <div key={item.hour} className="rounded-md border border-border p-2 text-center"><div className="mx-auto mb-2 h-1.5 rounded-full bg-[var(--color-accent)]" style={{ opacity: Math.max(0.25, item.rush / 100) }}/><p className="text-[10px] text-muted-foreground">{item.hour}</p><p className="text-sm font-medium">{item.actual}</p><p className="text-[10px] text-muted-foreground">{item.waste}kg waste</p></div>)}</div>
      </div>}
    </DialogContent>
  </Dialog>
}

