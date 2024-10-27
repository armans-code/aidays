import MapPage from "@/components/ui/map/map";
import { getSituations } from "@/lib/actions";


export default async function SituationMap() {
    const situations = await getSituations()

    return (
       <MapPage situations={situations} />
    )
}