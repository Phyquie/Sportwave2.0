"use client"

import { useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Search } from "lucide-react"
import LocationPicker from "./locationPicker"

interface SearchBarFeedProps {
  onSearch?: (query: string) => void
  placeholder?: string
}

const SearchBarFeed = ({
  onSearch,
  placeholder = "Search events, teams, players...",
}: SearchBarFeedProps) => {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="relative flex w-full max-w-sm items-center space-x-2">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          className="w-full pl-9 pr-4"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <LocationPicker />
      <Button
        variant="default"
        size="sm"
        onClick={handleSearch}
        className="flex-shrink-0"
      >
        Search
      </Button>
    </div>
  )
}

export default SearchBarFeed