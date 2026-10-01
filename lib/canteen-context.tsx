"use client"

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"

export type OrderStatus = "Pending" | "Preparing" | "Ready" | "Completed" | "Cancelled"
export type WasteReason = "Overproduction" | "Low Demand" | "Oversized Portions" | "Spoilage" | "Quality Issue" | "Other"

export type Order = { id: string; time: string; item: string; quantity: number; payment: string; status: OrderStatus; total: number }
export type MenuItem = { name: string; price: number; category: string; avgDemand: number; orders: number; planned: number; status: string }
export type WasteEntry = { meal: string; item: string; prepared: number; leftover: number; reason: WasteReason; notes?: string }

const initialOrders: Order[] = [
  { id: "#CW1082", time: "12:31 PM", item: "Veg Thali", quantity: 2, payment: "UPI", status: "Preparing", total: 120 },
  { id: "#CW1081", time: "12:29 PM", item: "Fried Rice", quantity: 1, payment: "Cash", status: "Ready", total: 70 },
  { id: "#CW1080", time: "12:27 PM", item: "Sandwich", quantity: 2, payment: "UPI", status: "Completed", total: 100 },
  { id: "#CW1079", time: "12:23 PM", item: "Pav Bhaji", quantity: 1, payment: "UPI", status: "Pending", total: 60 },
  { id: "#CW1078", time: "12:19 PM", item: "Veg Thali", quantity: 1, payment: "Cash", status: "Completed", total: 60 },
  { id: "#CW1077", time: "12:14 PM", item: "Fried Rice", quantity: 2, payment: "UPI", status: "Completed", total: 140 },
]

const initialMenu: MenuItem[] = [
  { name: "Veg Thali", price: 60, category: "Main Course", avgDemand: 132, orders: 116, planned: 140, status: "On Track" },
  { name: "Fried Rice", price: 70, category: "Main Course", avgDemand: 68, orders: 64, planned: 80, status: "Watch" },
  { name: "Pav Bhaji", price: 60, category: "Main Course", avgDemand: 42, orders: 47, planned: 50, status: "High Demand" },
  { name: "Sandwich", price: 50, category: "Snacks", avgDemand: 38, orders: 24, planned: 40, status: "Possible Surplus" },
]

const CanteenContext = createContext<{
  orders: Order[]; setOrderStatus: (id: string, status: OrderStatus) => void
  menu: MenuItem[]; addMenuItem: (item: MenuItem) => void
  wasteEntries: WasteEntry[]; addWasteEntry: (entry: WasteEntry) => void; totalWaste: number
}>({ orders: initialOrders, setOrderStatus: () => {}, menu: initialMenu, addMenuItem: () => {}, wasteEntries: [], addWasteEntry: () => {}, totalWaste: 12.4 })

export function CanteenProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [menu, setMenu] = useState<MenuItem[]>(initialMenu)
  const [wasteEntries, setWasteEntries] = useState<WasteEntry[]>([])
  useEffect(() => {
    try {
      const saved = localStorage.getItem("canteenwise-state")
      if (saved) { const value = JSON.parse(saved); setOrders(value.orders ?? initialOrders); setMenu(value.menu ?? initialMenu); setWasteEntries(value.wasteEntries ?? []) }
    } catch {}
  }, [])
  useEffect(() => { localStorage.setItem("canteenwise-state", JSON.stringify({ orders, menu, wasteEntries })) }, [orders, menu, wasteEntries])
  const value = useMemo(() => ({
    orders, setOrderStatus: (id: string, status: OrderStatus) => setOrders((items) => items.map((order) => order.id === id ? { ...order, status } : order)),
    menu, addMenuItem: (item: MenuItem) => setMenu((items) => [...items, item]), wasteEntries,
    addWasteEntry: (entry: WasteEntry) => setWasteEntries((items) => [...items, entry]), totalWaste: 12.4 + wasteEntries.reduce((sum, entry) => sum + entry.leftover, 0),
  }), [orders, menu, wasteEntries])
  return <CanteenContext.Provider value={value}>{children}</CanteenContext.Provider>
}
export const useCanteen = () => useContext(CanteenContext)
export const nextStatus: Record<OrderStatus, OrderStatus> = { Pending: "Preparing", Preparing: "Ready", Ready: "Completed", Completed: "Completed", Cancelled: "Cancelled" }
export const wasteCategories = ["Rice", "Vegetables", "Roti/Bread", "Curries", "Other"]
export const wasteReasons: { name: WasteReason; value: number }[] = [
  { name: "Overproduction", value: 8.1 }, { name: "Low Demand", value: 5.4 }, { name: "Oversized Portions", value: 3.7 }, { name: "Spoilage", value: 2.2 }, { name: "Other", value: 1.3 },
]
export const formatInr = (value: number) => `₹${value.toLocaleString("en-IN")}`
export const totalOrders = 286
export const totalRevenue = 18460
export const preparedMeals = 335
export const plannedMeals = 335
export const chartDemand = [{ day: "Mon", demand: 310, prepared: 340 }, { day: "Tue", demand: 328, prepared: 345 }, { day: "Wed", demand: 285, prepared: 330 }, { day: "Thu", demand: 341, prepared: 350 }, { day: "Fri", demand: 319, prepared: 335 }, { day: "Sat", demand: 244, prepared: 260 }, { day: "Sun", demand: 198, prepared: 215 }]
export const statusClass = (status: string) => status === "On Track" || status === "Healthy" || status === "Completed" ? "bg-green-100 text-green-800" : status === "High Demand" || status === "Preparing" || status === "Ready" ? "bg-blue-100 text-blue-800" : status === "Pending" || status === "Watch" || status === "Low Stock" || status === "Possible Surplus" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"
export const cardClass = "bg-card border border-border"
export const inputClass = "h-10 bg-background/60"
export const buttonClass = "bg-foreground text-background hover:bg-foreground/90"
export const statusOrder: OrderStatus[] = ["Pending", "Preparing", "Ready", "Completed"]
export const weeklyWaste = [2.1, 1.8, 2.4, 1.6, 1.9, 1.2, 1.4]
export const wasteBreakdown = [{ name: "Rice", value: 34, color: "#B4D4A5" }, { name: "Vegetables", value: 26, color: "#9DBF8C" }, { name: "Roti/Bread", value: 18, color: "#D6C7A1" }, { name: "Curries", value: 14, color: "#7D9275" }, { name: "Other", value: 8, color: "#D1D5DB" }]

export function AppCard({ children, className = "" }: { children: ReactNode; className?: string }) { return <div className={`${cardClass} rounded-xl ${className}`}>{children}</div> }
export function CardHeading({ title, description }: { title: string; description?: string }) { return <div className="p-5 pb-2"><h2 className="text-base font-medium">{title}</h2>{description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}</div> }
export function SectionCard({ title, description, children, className = "" }: { title: string; description?: string; children: ReactNode; className?: string }) { return <AppCard className={className}><CardHeading title={title} description={description} /><div className="p-5 pt-3">{children}</div></AppCard> }
export function StatusBadge({ children }: { children: string }) { return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusClass(children)}`}>{children}</span> }
export function Metric({ label, value, change, icon: Icon }: { label: string; value: string; change?: string; icon?: any }) { return <AppCard className="p-5"><div className="flex items-center justify-between mb-2"><span className="text-sm text-muted-foreground">{label}</span>{Icon && <span className="rounded-lg bg-muted p-2"><Icon className="h-4 w-4 text-muted-foreground" /></span>}</div><p className="text-3xl font-semibold tracking-tight">{value}</p>{change && <p className="text-xs text-[var(--color-positive)] mt-1">{change}</p>}</AppCard> }
export function TableEmpty({ text }: { text: string }) { return <div className="py-10 text-center text-sm text-muted-foreground">{text}</div> }
export const tableHead = "text-left py-3 px-2 text-xs font-medium text-muted-foreground"
export const tableCell = "py-3 px-2 text-sm"
export const tableRow = "border-b border-border last:border-0 hover:bg-muted/40"
export const selectClass = "h-10 rounded-md border border-input bg-background px-3 text-sm"
export const transitionClass = "transition-colors"
export const pieColors = wasteBreakdown.map((item) => item.color)
export const menuCategories = ["Main Course", "Snacks", "Beverage", "Breakfast"]
export const dateLabel = "Today"
export const timeSlots = [{ label: "8:00–10:00 AM", value: 18 }, { label: "10:00–12:00 PM", value: 21 }, { label: "12:00–1:00 PM", value: 37 }, { label: "1:00–2:00 PM", value: 19 }, { label: "After 2:00 PM", value: 5 }]
export const inventoryItems = [{ ingredient: "Rice", category: "Grain", available: "42 kg", required: "18 kg required", reorder: "20 kg reorder", expiry: "—", status: "Healthy" }, { ingredient: "Paneer", category: "Dairy", available: "8 kg", required: "5 kg required", reorder: "5 kg reorder", expiry: "2 Oct", status: "Expiring Soon" }, { ingredient: "Tomatoes", category: "Produce", available: "12 kg", required: "6 kg required", reorder: "6 kg reorder", expiry: "3 Oct", status: "Healthy" }, { ingredient: "Cooking Oil", category: "Grocery", available: "7 L", required: "4 L required", reorder: "8 L reorder", expiry: "—", status: "Low Stock" }, { ingredient: "Potatoes", category: "Produce", available: "18 kg", required: "9 kg required", reorder: "8 kg reorder", expiry: "4 Oct", status: "Healthy" }]
export const inventoryHealth = [{ name: "Healthy", value: 72, color: "bg-[var(--color-accent)]" }, { name: "Low Stock", value: 14, color: "bg-amber-400" }, { name: "Expiring Soon", value: 9, color: "bg-orange-400" }, { name: "Out of Stock", value: 5, color: "bg-gray-400" }]
export const progressBar = (value: number, color = "bg-[var(--color-accent)]") => <div className="h-2 rounded-full bg-muted overflow-hidden"><div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} /></div>
export const wasteTrend = [{ day: "Mon", current: 2.1, previous: 2.8 }, { day: "Tue", current: 1.8, previous: 2.5 }, { day: "Wed", current: 2.4, previous: 2.7 }, { day: "Thu", current: 1.6, previous: 2.4 }, { day: "Fri", current: 1.9, previous: 2.3 }, { day: "Sat", current: 1.2, previous: 1.8 }, { day: "Sun", current: 1.4, previous: 1.7 }]
export const dashboardMenu = [{ name: "Veg Thali", detail: "124 sold • 140 planned", status: "On Track" }, { name: "Fried Rice", detail: "73 sold • 80 planned", status: "High Demand" }, { name: "Pav Bhaji", detail: "46 sold • 50 planned", status: "On Track" }, { name: "Sandwich", detail: "31 sold • 40 planned", status: "Possible Surplus" }]
export const dashboardWaste = 12.4
export const dashboardCost = 1860
export const orderCounts = { total: 286, preparing: 42, ready: 18, completed: 226 }
export const currentDate = "Tuesday, September 30, 2026"
export const formatKg = (value: number) => `${value.toFixed(1)} kg`
