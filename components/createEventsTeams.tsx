
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

const CreateEventsTeams = () => {
  const [open, setOpen] = useState(false)
  
  return (
    <div className="flex flex-row gap-2">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button         size="sm" 
 className="bg-black text-white hover:bg-gray-800 ">
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
              <div className="space-y-4">
                <div>
                  <label htmlFor="event-name" className="text-sm font-medium">Event Name</label>
                  <Input id="event-name" placeholder="Enter event name" className="mt-1" />
                </div>
                <div>
                  <label htmlFor="event-date" className="text-sm font-medium">Date</label>
                  <Input id="event-date" type="date" className="mt-1" />
                </div>
                <div>
                  <label htmlFor="event-location" className="text-sm font-medium">Location</label>
                  <Input id="event-location" placeholder="Enter location" className="mt-1" />
                </div>
                <div>
                  <label htmlFor="event-description" className="text-sm font-medium">Description</label>
                  <textarea 
                    id="event-description" 
                    placeholder="Enter event description" 
                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring mt-1"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Event</Button>
              </DialogFooter>
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