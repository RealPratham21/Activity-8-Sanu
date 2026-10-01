"use client"

import { useMemo, useState } from "react"
import { Activity, ArrowDownRight, ArrowUpRight, CalendarClock, PackagePlus, Search, TriangleAlert, Utensils } from "lucide-react"
import { PageHeader } from "@/components/dashboard/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

const base = [
  { name: "Rice", category: "Grains", stock: 42, unit: "kg", min: 20, daily: 6, status: "Healthy" },
  { name: "Potatoes", category: "Vegetables", stock: 18, unit: "kg", min: 25, daily: 8, status: "Low stock" },
  { name: "Cooking Oil", category: "Essentials", stock: 12, unit: "L", min: 10, daily: 1.5, status: "Healthy" },
  { name: "Paneer", category: "Dairy", stock: 8, unit: "kg", min: 12, daily: 3, status: "Low stock" },
  { name: "Bread", category: "Bakery", stock: 64, unit: "packs", min: 30, daily: 10, status: "Healthy" },
]

export default function InventoryPage() {
  const [items, setItems] = useState(base)
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [stockName, setStockName] = useState("")
  const [stockAmount, setStockAmount] = useState("")
  const filtered = items.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
  const lowStock = items.filter((item) => item.stock < item.min)
  const totalUnits = items.reduce((sum, item) => sum + item.stock, 0)
  const daysCovered = Math.min(...items.map((item) => Math.floor(item.stock / item.daily)))
  const topStock = [...items].sort((a, b) => b.stock / b.min - a.stock / a.min)[0]
  const avgDailyUse = useMemo(() => items.reduce((sum, item) => sum + item.daily, 0), [items])

  function addStock(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const amount = Number(stockAmount)
    if (!stockName || !amount || amount <= 0) return
    setItems((current) => current.map((item) => item.name === stockName ? { ...item, stock: item.stock + amount, status: item.stock + amount < item.min ? "Low stock" : "Healthy" } : item))
    setStockName("")
    setStockAmount("")
    setOpen(false)
  }

  return <>
    <PageHeader title="Inventory" description="Keep live stock levels healthy for every meal service.">
      <div className="flex items-center gap-3"><span className="flex items-center gap-2 text-xs text-[var(--color-positive)]"><span className="size-2 animate-pulse rounded-full bg-[var(--color-positive)]" />Live inventory</span><Button onClick={() => setOpen(true)} className="gap-2 bg-foreground text-background"><PackagePlus data-icon="inline-start" />Add Stock</Button></div>
    </PageHeader>

    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Card><CardContent className="p-5"><div className="flex items-start justify-between"><div><p className="text-sm text-muted-foreground">Coverage remaining</p><p className="mt-2 text-3xl font-semibold">{daysCovered} days</p><p className="mt-1 text-xs text-muted-foreground">Across {items.length} tracked items</p></div><CalendarClock className="size-5 text-muted-foreground" /></div></CardContent></Card>
      <Card><CardContent className="p-5"><div className="flex items-start justify-between"><div><p className="text-sm text-muted-foreground">Low stock risk</p><p className="mt-2 text-3xl font-semibold">{lowStock.length}</p><p className="mt-1 text-xs text-[var(--color-warning)]">Needs replenishment today</p></div><TriangleAlert className="size-5 text-[var(--color-warning)]" /></div></CardContent></Card>
      <Card><CardContent className="p-5"><div className="flex items-start justify-between"><div><p className="text-sm text-muted-foreground">Top stock buffer</p><p className="mt-2 text-xl font-semibold">{topStock.name}</p><p className="mt-1 text-xs text-[var(--color-positive)]">{Math.floor(topStock.stock / topStock.daily)} days of cover</p></div><ArrowUpRight className="size-5 text-[var(--color-positive)]" /></div></CardContent></Card>
      <Card><CardContent className="p-5"><div className="flex items-start justify-between"><div><p className="text-sm text-muted-foreground">Daily usage rate</p><p className="mt-2 text-3xl font-semibold">{avgDailyUse.toFixed(1)}</p><p className="mt-1 text-xs text-muted-foreground">Combined units consumed</p></div><Activity className="size-5 text-muted-foreground" /></div></CardContent></Card>
    </div>

    <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3"><Card className="lg:col-span-2"><CardHeader><div className="flex items-center justify-between"><div><CardTitle className="text-base">Stock health overview</CardTitle><p className="mt-1 text-sm text-muted-foreground">{totalUnits} total units on hand, updated live</p></div><Badge variant="secondary">{lowStock.length ? "Action needed" : "All healthy"}</Badge></div></CardHeader><CardContent><div className="grid gap-3 sm:grid-cols-3"><div className="rounded-lg bg-muted/50 p-4"><p className="text-xs text-muted-foreground">Healthy buffer</p><p className="mt-2 text-2xl font-semibold">{items.length - lowStock.length}</p><p className="mt-1 text-xs text-muted-foreground">items above minimum</p></div><div className="rounded-lg bg-muted/50 p-4"><p className="text-xs text-muted-foreground">At risk next</p><p className="mt-2 text-2xl font-semibold">{lowStock[0] ? `${Math.floor(lowStock[0].stock / lowStock[0].daily)}d` : "—"}</p><p className="mt-1 text-xs text-muted-foreground">{lowStock[0]?.name ?? "No urgent items"}</p></div><div className="rounded-lg bg-muted/50 p-4"><p className="text-xs text-muted-foreground">Meal services covered</p><p className="mt-2 text-2xl font-semibold">{Math.floor(daysCovered / 1)} </p><p className="mt-1 text-xs text-muted-foreground">estimated service days</p></div></div></CardContent></Card><Card><CardHeader><CardTitle className="text-base">Replenishment cue</CardTitle></CardHeader><CardContent className="flex flex-col gap-3">{lowStock.slice(0, 3).map((item) => <div key={item.name} className="flex items-center justify-between rounded-lg border p-3"><div><p className="text-sm font-medium">{item.name}</p><p className="text-xs text-muted-foreground">{item.stock}{item.unit} left · min {item.min}{item.unit}</p></div><ArrowDownRight className="size-4 text-[var(--color-warning)]" /></div>)}{!lowStock.length && <p className="text-sm text-muted-foreground">No replenishment needed.</p>}</CardContent></Card></div>

    <Card><CardHeader><div className="flex items-center justify-between"><CardTitle className="text-base">Stock levels</CardTitle><div className="relative w-56"><Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" /><Input className="pl-9" placeholder="Search stock..." value={search} onChange={(e) => setSearch(e.target.value)} /></div></div></CardHeader><CardContent><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b text-left text-muted-foreground"><th className="py-3">Item</th><th>Category</th><th>On hand</th><th>Daily use</th><th>Coverage</th><th>Status</th></tr></thead><tbody>{filtered.map((item) => <tr key={item.name} className="border-b last:border-0"><td className="py-4 font-medium">{item.name}</td><td className="text-muted-foreground">{item.category}</td><td>{item.stock} {item.unit}</td><td className="text-muted-foreground">{item.daily} {item.unit}</td><td>{Math.floor(item.stock / item.daily)} days</td><td><Badge variant={item.status === "Healthy" ? "secondary" : "destructive"}>{item.status}</Badge></td></tr>)}</tbody></table></div></CardContent></Card>

    <Dialog open={open} onOpenChange={setOpen}><DialogContent><DialogHeader><DialogTitle>Add stock</DialogTitle></DialogHeader><form onSubmit={addStock} className="flex flex-col gap-4"><div className="flex flex-col gap-2"><Label htmlFor="item">Inventory item</Label><select id="item" className="h-10 rounded-md border bg-background px-3 text-sm" value={stockName} onChange={(e) => setStockName(e.target.value)}><option value="">Select an item</option>{items.map((item) => <option key={item.name} value={item.name}>{item.name} ({item.unit})</option>)}</select></div><div className="flex flex-col gap-2"><Label htmlFor="amount">Quantity added</Label><Input id="amount" type="number" min="1" value={stockAmount} onChange={(e) => setStockAmount(e.target.value)} placeholder="e.g. 10" /></div><Button type="submit">Confirm stock update</Button></form></DialogContent></Dialog>
  </>
}
