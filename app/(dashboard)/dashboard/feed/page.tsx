import CreateEventsTeams from "@/components/createEventsTeams"
import LocationButton from "@/components/locationButton"
import SearchBarFeed from "@/components/searchbarfeed"


const page = () => {
  return (
    <div className="flex flex-col w-full items-center text-black bg-white">
      <div className="flex  flex-row items-baseline py-3 gap-6"><SearchBarFeed/>  <LocationButton/><CreateEventsTeams/> </div>
      <>Hello</>
  
    </div>
  )
}
export default page