import { awardNames } from "@/data/facts";
export function AwardWall(){return <ul className="grid md:grid-cols-2 gap-x-12 gap-y-0">{awardNames.map(award=><li key={award.value} className="text-lg font-medium text-foreground border-b border-pink/20 py-5">{award.value}</li>)}</ul>;}
