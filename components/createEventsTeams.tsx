"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { MdLibraryAdd } from "react-icons/md";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { useCreateEventMutation } from "@/redux/slices/eventSlices"   

const CreateEventsTeams = () => {
  const [open, setOpen] = useState(false)
  const [eventName, setEventName] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [eventLocation, setEventLocation] = useState("")
  const [eventDescription, setEventDescription] = useState("")
  const [eventSportType, setEventSportType] = useState("")
  const [createEvent, { isLoading, isError, error }] = useCreateEventMutation()

  // Replace with actual user id from auth context/session
  const createdById = "user-id-placeholder"

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createEvent({
        name: eventName,
        createdById,
        eventType: "soloEvent",
        date: eventDate,
        location: eventLocation,
        description: eventDescription,
        sportType: eventSportType,
      }).unwrap()
      setOpen(false)
      setEventName("")
      setEventDate("")
      setEventLocation("")
      setEventDescription("")
      setEventSportType("")
    } catch (err) {
      // Optionally handle error
    }
  }

  return (
    <div className="flex flex-row gap-2">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="sm" className="bg-black text-white hover:bg-gray-800 ">
            Create <MdLibraryAdd className="h-6 w-6"/>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New</DialogTitle>
            <DialogDescription>
              Create a new event or team to connect with sports enthusiasts.
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="event" className="mt-4">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="event">Event</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
            </TabsList>
            <TabsContent value="event" className="space-y-4 py-4">
              <form className="space-y-4" onSubmit={handleCreateEvent}>
                <div>
                  <label htmlFor="event-name" className="text-sm font-medium">Event Name</label>
                  <Input
                    id="event-name"
                    placeholder="Enter event name"
                    className="mt-1"
                    value={eventName}
                    onChange={e => setEventName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="event-date" className="text-sm font-medium">Date</label>
                  <Input
                    id="event-date"
                    type="date"
                    className="mt-1"
                    value={eventDate}
                    onChange={e => setEventDate(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="event-location" className="text-sm font-medium">Location</label>
                  <Input
                    id="event-location"
                    placeholder="Enter location"
                    className="mt-1"
                    value={eventLocation}
                    onChange={e => setEventLocation(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="event-sport-type" className="text-sm font-medium">Sport Type</label>
                  <Input
                    id="event-sport-type"
                    placeholder="Enter sport type"
                    className="mt-1"
                    value={eventSportType}
                    onChange={e => setEventSportType(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="event-description" className="text-sm font-medium">Description</label>
                  <textarea 
                    id="event-description" 
                    placeholder="Enter event description" 
                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring mt-1"
                    rows={3}
                    value={eventDescription}
                    onChange={e => setEventDescription(e.target.value)}
                  />
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Creating..." : "Create Event"}
                  </Button>
                </DialogFooter>
                {isError && (
                  <div className="text-red-500 text-sm mt-2">
                    {error && "message" in error && typeof error.message === "string" && error.message
                      ? error.message
                      : error && "data" in error && error.data
                        ? typeof error.data === "string"
                          ? error.data
                          : JSON.stringify(error.data)
                        : "Failed to create event"}
                  </div>
                )}
              </form>
            </TabsContent>
            <TabsContent value="team" className="space-y-4 py-4">
              <div className="space-y-4">
                <div>
                  <label htmlFor="team-name" className="text-sm font-medium">Team Name</label>
                  <Input id="team-name" placeholder="Enter team name" className="mt-1" />
                </div>
                <div>
                  <label htmlFor="team-sport" className="text-sm font-medium">Sport</label>
                  <Input id="team-sport" placeholder="Enter sport type" className="mt-1" />
                </div>
                <div>
                  <label htmlFor="team-members" className="text-sm font-medium">Number of Members</label>
                  <Input id="team-members" type="number" placeholder="Enter number of members" className="mt-1" />
                </div>
                <div>
                  <label htmlFor="team-description" className="text-sm font-medium">Description</label>
                  <textarea 
                    id="team-description" 
                    placeholder="Enter team description" 
                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring mt-1"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Team</Button>
              </DialogFooter>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  )
}


export default CreateEventsTeams