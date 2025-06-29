"use client"
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  MapPin,
  Tag,
  Building2,
  TrendingUp,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const cities = [
  {
    id: 1,
    name: "Lagos",
    state: "Lagos State",
    businesses: 1247,
    categories: 12,
    isActive: true,
    featured: true,
    population: "15M+",
    addedDate: "2023-01-15",
  },
  {
    id: 2,
    name: "Abuja",
    state: "FCT",
    businesses: 892,
    categories: 10,
    isActive: true,
    featured: true,
    population: "3M+",
    addedDate: "2023-01-20",
  },
  {
    id: 3,
    name: "Port Harcourt",
    state: "Rivers State",
    businesses: 634,
    categories: 8,
    isActive: true,
    featured: false,
    population: "2M+",
    addedDate: "2023-02-10",
  },
  {
    id: 4,
    name: "Kano",
    state: "Kano State",
    businesses: 423,
    categories: 6,
    isActive: false,
    featured: false,
    population: "4M+",
    addedDate: "2023-03-05",
  },
]

const categories = [
  {
    id: 1,
    name: "Food & Restaurants",
    icon: "🍽️",
    parent: null,
    businesses: 2341,
    subcategories: 8,
    isActive: true,
    cities: ["Lagos", "Abuja", "Port Harcourt"],
    description: "Restaurants, cafes, food delivery, catering",
  },
  {
    id: 2,
    name: "Beauty & Wellness",
    icon: "💄",
    parent: null,
    businesses: 1876,
    subcategories: 6,
    isActive: true,
    cities: ["Lagos", "Abuja"],
    description: "Salons, spas, fitness centers, wellness",
  },
  {
    id: 3,
    name: "Home Services",
    icon: "🏠",
    parent: null,
    businesses: 1543,
    subcategories: 12,
    isActive: true,
    cities: ["Lagos", "Abuja", "Port Harcourt", "Kano"],
    description: "Cleaning, repairs, maintenance, security",
  },
  {
    id: 4,
    name: "Automotive",
    icon: "🚗",
    parent: null,
    businesses: 1234,
    subcategories: 5,
    isActive: true,
    cities: ["Lagos", "Abuja", "Port Harcourt"],
    description: "Car repairs, parts, services, rentals",
  },
]

export default function LocationsManager() {
  let searchQuery = ""
  let isAddCityOpen = false
  let isAddCategoryOpen = false

  const setSearchQuery = (value: string) => {
    searchQuery = value
  }

  const setIsAddCityOpen = (value: boolean) => {
    isAddCityOpen = value
  }

  const setIsAddCategoryOpen = (value: boolean) => {
    isAddCategoryOpen = value
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cities & Categories</h1>
          <p className="text-gray-600 mt-1">Manage locations and business categories</p>
        </div>
        <Button className="bg-[#05BBC8] hover:bg-[#05BBC8]/90">
          <TrendingUp className="h-4 w-4 mr-2" />
          Analytics Report
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="cities" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="cities">Cities</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        {/* Cities Tab */}
        <TabsContent value="cities" className="space-y-6">
          {/* Cities Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Cities</p>
                    <p className="text-2xl font-bold text-gray-900">24</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Cities</p>
                    <p className="text-2xl font-bold text-gray-900">18</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-xl">
                    <Eye className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Businesses</p>
                    <p className="text-2xl font-bold text-gray-900">3,196</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <Building2 className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Featured Cities</p>
                    <p className="text-2xl font-bold text-gray-900">6</p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-xl">
                    <TrendingUp className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cities Controls */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex-1 w-full sm:w-auto">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search cities..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Dialog open={isAddCityOpen} onOpenChange={setIsAddCityOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-[#05BBC8] hover:bg-[#05BBC8]/90">
                      <Plus className="h-4 w-4 mr-2" />
                      Add City
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New City</DialogTitle>
                      <DialogDescription>Add a new city to the Nexa platform</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="city-name" className="text-right">
                          City Name
                        </Label>
                        <Input id="city-name" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="state" className="text-right">
                          State
                        </Label>
                        <Input id="state" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="population" className="text-right">
                          Population
                        </Label>
                        <Input id="population" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="active" className="text-right">
                          Active
                        </Label>
                        <Switch id="active" className="col-span-3" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" className="bg-[#05BBC8] hover:bg-[#05BBC8]/90">
                        Add City
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Cities Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Cities</CardTitle>
              <CardDescription>Manage cities available on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">City</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">State</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Businesses</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cities.map((city) => (
                      <tr key={city.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <MapPin className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{city.name}</p>
                              <p className="text-sm text-gray-500">Population: {city.population}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-gray-900">{city.state}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="space-y-1">
                            <p className="font-medium text-gray-900">{city.businesses}</p>
                            <p className="text-sm text-gray-500">{city.categories} categories</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            {city.isActive ? (
                              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>
                            ) : (
                              <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">Inactive</Badge>
                            )}
                            {city.featured && (
                              <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">Featured</Badge>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit City
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                {city.isActive ? (
                                  <>
                                    <EyeOff className="h-4 w-4 mr-2" />
                                    Deactivate
                                  </>
                                ) : (
                                  <>
                                    <Eye className="h-4 w-4 mr-2" />
                                    Activate
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-6">
          {/* Categories Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Categories</p>
                    <p className="text-2xl font-bold text-gray-900">28</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Tag className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Categories</p>
                    <p className="text-2xl font-bold text-gray-900">24</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-xl">
                    <Eye className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Businesses</p>
                    <p className="text-2xl font-bold text-gray-900">6,994</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <Building2 className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Subcategories</p>
                    <p className="text-2xl font-bold text-gray-900">31</p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-xl">
                    <TrendingUp className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Categories Controls */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex-1 w-full sm:w-auto">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search categories..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-[#05BBC8] hover:bg-[#05BBC8]/90">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Category
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Category</DialogTitle>
                      <DialogDescription>Add a new business category to the platform</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category-name" className="text-right">
                          Category Name
                        </Label>
                        <Input id="category-name" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="icon" className="text-right">
                          Icon
                        </Label>
                        <Input id="icon" placeholder="🍽️" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                          Description
                        </Label>
                        <Input id="description" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category-active" className="text-right">
                          Active
                        </Label>
                        <Switch id="category-active" className="col-span-3" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" className="bg-[#05BBC8] hover:bg-[#05BBC8]/90">
                        Add Category
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Categories Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Categories</CardTitle>
              <CardDescription>Manage business categories on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Category</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Businesses</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Cities</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category) => (
                      <tr key={category.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl">{category.icon}</div>
                            <div>
                              <p className="font-medium text-gray-900">{category.name}</p>
                              <p className="text-sm text-gray-500">{category.description}</p>
                              {category.subcategories > 0 && (
                                <p className="text-xs text-gray-400">{category.subcategories} subcategories</p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-medium text-gray-900">{category.businesses}</p>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-wrap gap-1">
                            {category.cities.slice(0, 2).map((city) => (
                              <Badge key={city} variant="secondary" className="text-xs">
                                {city}
                              </Badge>
                            ))}
                            {category.cities.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{category.cities.length - 2}
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          {category.isActive ? (
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>
                          ) : (
                            <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">Inactive</Badge>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Category
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Subcategory
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                {category.isActive ? (
                                  <>
                                    <EyeOff className="h-4 w-4 mr-2" />
                                    Deactivate
                                  </>
                                ) : (
                                  <>
                                    <Eye className="h-4 w-4 mr-2" />
                                    Activate
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
