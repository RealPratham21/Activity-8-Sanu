"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, CheckCircle2, ChevronDown, IndianRupee, Leaf, ShoppingBag } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const navItems = [{ label: "Dashboard", href: "/" }, { label: "Orders", href: "/orders" }, { label: "Menu & Demand", href: "/sales" }, { label: "Inventory", href: "/customers" }, { label: "Sustainability", href: "/reports" }]
const notifications = [{ icon: ShoppingBag, title: "Order placed", detail: "#CW1082 · Veg Thali × 2", time: "2 min ago" }, { icon: IndianRupee, title: "Payment received", detail: "₹120 via UPI", time: "8 min ago" }, { icon: Leaf, title: "You saved 8.6 kg", detail: "Waste avoided vs baseline today", time: "34 min ago" }]

export function Header() {
  const pathname = usePathname()
  return <header className="mb-8 flex items-center justify-between">
    <Link href="/" className="flex items-center gap-2"><div className="flex flex-col gap-1"><div className="h-0.5 w-5 bg-foreground" /><div className="h-0.5 w-5 bg-foreground" /><div className="h-0.5 w-3 bg-foreground" /></div><span className="text-xl font-semibold">CanteenWise</span></Link>
    <nav className="hidden items-center rounded-full border border-border bg-card px-2 py-1.5 md:flex">{navItems.map((item) => <Link key={item.href} href={item.href} className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${item.href === "/" ? pathname === "/" : pathname.startsWith(item.href) ? "bg-[var(--color-accent)] text-foreground" : "text-muted-foreground hover:text-foreground"}`}>{item.label}</Link>)}</nav>
    <div className="flex items-center gap-4"><Popover><PopoverTrigger asChild><Button variant="ghost" size="icon" className="relative rounded-full"><Bell className="size-5" /><span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-[var(--color-positive)]" /></Button></PopoverTrigger><PopoverContent align="end" className="w-80 p-0"><div className="flex items-center justify-between border-b p-4"><div><p className="font-semibold">Notifications</p><p className="text-xs text-muted-foreground">Latest canteen activity</p></div><span className="rounded-full bg-[var(--color-accent)] px-2 py-1 text-[10px] font-medium">3 new</span></div><div className="flex flex-col">{notifications.map(({ icon: Icon, title, detail, time }) => <div key={title} className="flex gap-3 border-b p-4 last:border-0"><div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)]"><Icon className="size-4" /></div><div className="min-w-0 flex-1"><p className="text-sm font-medium">{title}</p><p className="truncate text-xs text-muted-foreground">{detail}</p><p className="mt-1 text-[10px] text-muted-foreground">{time}</p></div><CheckCircle2 className="size-4 text-[var(--color-positive)]" /></div>)}</div></PopoverContent></Popover><DropdownMenu><DropdownMenuTrigger asChild><button className="flex items-center gap-2"><Avatar className="size-9"><AvatarFallback>MC</AvatarFallback></Avatar><div className="hidden text-left sm:block"><p className="text-sm font-medium">MCOE Canteen</p><p className="text-xs text-muted-foreground">Manager</p></div><ChevronDown className="hidden size-4 text-muted-foreground sm:block" /></button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem>Profile</DropdownMenuItem><DropdownMenuItem>Settings</DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem>Log out</DropdownMenuItem></DropdownMenuContent></DropdownMenu></div>
  </header>
}
