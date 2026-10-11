import { useMemo, useState } from "react";
import { companies } from "@/data/companies";
import { CompanyCard } from "./CompanyCard";
import { CompanyFilters, type SortOption, type FilterOption } from "./CompanyFilters";
import { MotionStagger, MotionItem } from "@/components/motion/MotionReveal";
export function CompanyGrid(){const [sortBy,setSortBy]=useState<SortOption>("portfolio");const [filterBy,setFilterBy]=useState<FilterOption>("all");const filtered=useMemo(()=>{const list=companies.filter(c=>filterBy==="all"||c.sector.toLowerCase().includes(filterBy));return sortBy==="name"?[...list].sort((a,b)=>a.name.localeCompare(b.name)):list;},[sortBy,filterBy]);return <div className="space-y-6"><CompanyFilters sortBy={sortBy} filterBy={filterBy} onSortChange={setSortBy} onFilterChange={setFilterBy}/><MotionStagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">{filtered.map(company=><MotionItem key={company.id} className="h-full"><CompanyCard company={company}/></MotionItem>)}</MotionStagger>{filtered.length===0&&<p className="text-muted-foreground">No ventures in this sector.</p>}</div>;}
