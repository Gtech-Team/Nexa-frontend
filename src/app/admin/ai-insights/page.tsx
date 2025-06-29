/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import {
  Search,
  TrendingUp,
  TrendingDown,
  Brain,
  Target,
  Users,
  Building2,
  Star,
  Clock,
  ArrowRight,
  ChevronRight,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  Rocket,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock AI insights data
const aiInsights = [
  {
    id: 1,
    type: "trend",
    priority: "high",
    title: "Peak Booking Hours Identified",
    description: "Bookings are 45% higher between 2-4 PM. Suggest businesses optimize availability during these hours.",
    impact: "Revenue Optimization",
    confidence: 92,
    actionable: true,
    category: "Booking Patterns",
    icon: Clock,
    trend: "up",
    value: "+45%",
  },
  {
    id: 2,
    type: "opportunity",
    priority: "high",
    title: "Untapped Market in Kano",
    description: "High user search volume for beauty services in Kano with only 3 active businesses. Market opportunity detected.",
    impact: "Market Expansion",
    confidence: 88,
    actionable: true,
    category: "Market Analysis",
    icon: Target,
    trend: "up",
    value: "300% growth potential",
  },
  {
    id: 3,
    type: "warning",
    priority: "medium",
    title: "Decreasing Response Times",
    description: "Average business response time increased by 23% this month. This may impact customer satisfaction.",
    impact: "Customer Experience",
    confidence: 85,
    actionable: true,
    category: "Performance",
    icon: AlertTriangle,
    trend: "down",
    value: "+23% response time",
  },
  {
    id: 4,
    type: "success",
    priority: "low",
    title: "Negotiation Success Rate Improving",
    description: "Businesses using our negotiation features have 34% higher conversion rates.",
    impact: "Feature Adoption",
    confidence: 94,
    actionable: false,
    category: "Product Performance",
    icon: CheckCircle,
    trend: "up",
    value: "+34% conversion",
  },
]

const performanceMetrics = [
  {
    title: "Platform Health Score",
    value: 87,
    change: "+5",
    description: "Overall platform performance and user satisfaction",
    color: "bg-green-500",
  },
  {
    title: "Market Penetration",
    value: 68,
    change: "+12",
    description: "Coverage across target markets and demographics",
    color: "bg-blue-500",
  },
  {
    title: "Business Growth Rate",
    value: 92,
    change: "+8",
    description: "Rate of business onboarding and activation",
    color: "bg-purple-500",
  },
  {
    title: "Customer Retention",
    value: 76,
    change: "-3",
    description: "User engagement and return rate",
    color: "bg-orange-500",
  },
]

const predictiveAnalytics = [
  {
    title: "Revenue Forecast",
    period: "Next 30 Days",
    prediction: "₦3.2M",
    confidence: 89,
    trend: "up",
    change: "+18%",
    details: "Based on current booking trends and seasonal patterns",
  },
  {
    title: "User Growth",
    period: "Next Quarter",
    prediction: "2,450 new users",
    confidence: 82,
    trend: "up",
    change: "+25%",
    details: "Marketing campaigns and referral programs impact",
  },
  {
    title: "Business Demand",
    period: "Peak Season",
    prediction: "340% increase",
    confidence: 91,
    trend: "up",
    change: "+340%",
    details: "Holiday season and event planning surge expected",
  },
]

const categoryInsights = [
  {
    category: "Food & Restaurants",
    bookings: 1250,
    growth: "+23%",
    avgRating: 4.6,
    topService: "Catering Services",
    recommendation: "Expand delivery options",
  },
  {
    category: "Beauty & Wellness",
    bookings: 980,
    growth: "+31%",
    avgRating: 4.8,
    topService: "Bridal Makeup",
    recommendation: "Add mobile services",
  },
  {
    category: "Automotive",
    bookings: 720,
    growth: "+15%",
    avgRating: 4.3,
    topService: "Car Maintenance",
    recommendation: "Improve response times",
  },
  {
    category: "Events & Entertainment",
    bookings: 650,
    growth: "+45%",
    avgRating: 4.7,
    topService: "DJ Services",
    recommendation: "Package deals promotion",
  },
]

export default function AIInsights() {
  const [timeRange, setTimeRange] = useState("30days")
  const [insightFilter, setInsightFilter] = useState("all")

  const filteredInsights = aiInsights.filter((insight) => {
    if (insightFilter === "all") return true
    if (insightFilter === "actionable") return insight.actionable
    return insight.priority === insightFilter
  })

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      high: { color: "bg-red-100 text-red-700", label: "High Priority" },
      medium: { color: "bg-yellow-100 text-yellow-700", label: "Medium Priority" },
      low: { color: "bg-green-100 text-green-700", label: "Low Priority" },
    }
    return priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.low
  }

  const getInsightIcon = (type: string) => {
    const iconConfig = {
      trend: TrendingUp,
      opportunity: Target,
      warning: AlertTriangle,
      success: CheckCircle,
    }
    return iconConfig[type as keyof typeof iconConfig] || Brain
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Insights & Analytics</h1>
        <p className="mt-2 text-gray-600">
          Leverage artificial intelligence to optimize your platform performance and discover growth opportunities.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 Days</SelectItem>
            <SelectItem value="30days">Last 30 Days</SelectItem>
            <SelectItem value="90days">Last 90 Days</SelectItem>
            <SelectItem value="1year">Last Year</SelectItem>
          </SelectContent>
        </Select>
        <Select value={insightFilter} onValueChange={setInsightFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Insights</SelectItem>
            <SelectItem value="actionable">Actionable</SelectItem>
            <SelectItem value="high">High Priority</SelectItem>
            <SelectItem value="medium">Medium Priority</SelectItem>
            <SelectItem value="low">Low Priority</SelectItem>
          </SelectContent>
        </Select>
        <Button className="w-full sm:w-auto">
          <Rocket className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{metric.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-3">
                <div className="text-3xl font-bold text-gray-900">{metric.value}%</div>
                <div className={`flex items-center text-sm ${
                  metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                }`}>
                  {metric.change.startsWith('+') ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {metric.change}
                </div>
              </div>
              <Progress value={metric.value} className="mb-2" />
              <p className="text-xs text-gray-500">{metric.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2 text-purple-500" />
                AI-Generated Insights
              </CardTitle>
              <CardDescription>
                Machine learning analysis of your platform data with actionable recommendations
              </CardDescription>
            </div>
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              {filteredInsights.length} insights
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredInsights.map((insight) => {
              const IconComponent = getInsightIcon(insight.type)
              const priorityBadge = getPriorityBadge(insight.priority)
              
              return (
                <div key={insight.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        insight.type === 'warning' ? 'bg-red-100' :
                        insight.type === 'success' ? 'bg-green-100' :
                        insight.type === 'opportunity' ? 'bg-blue-100' :
                        'bg-purple-100'
                      }`}>
                        <IconComponent className={`h-5 w-5 ${
                          insight.type === 'warning' ? 'text-red-500' :
                          insight.type === 'success' ? 'text-green-500' :
                          insight.type === 'opportunity' ? 'text-blue-500' :
                          'text-purple-500'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={priorityBadge.color}>
                        {priorityBadge.label}
                      </Badge>
                      {insight.actionable && (
                        <Badge variant="outline" className="border-green-200 text-green-700">
                          Actionable
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 text-sm">
                    <div>
                      <span className="text-gray-500">Impact:</span>
                      <div className="font-medium">{insight.impact}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Category:</span>
                      <div className="font-medium">{insight.category}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Confidence:</span>
                      <div className="font-medium">{insight.confidence}%</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Value:</span>
                      <div className={`font-medium flex items-center ${
                        insight.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {insight.trend === 'up' ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        {insight.value}
                      </div>
                    </div>
                  </div>

                  {insight.actionable && (
                    <div className="mt-4 pt-4 border-t">
                      <Button size="sm" variant="outline" className="mr-2">
                        <Lightbulb className="h-4 w-4 mr-2" />
                        View Recommendations
                      </Button>
                      <Button size="sm">
                        Take Action
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Predictive Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2 text-blue-500" />
            Predictive Analytics
          </CardTitle>
          <CardDescription>
            AI-powered forecasts based on historical data and market trends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {predictiveAnalytics.map((prediction) => (
              <div key={prediction.title} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{prediction.title}</h3>
                  <Badge variant="outline" className="text-xs">
                    {prediction.confidence}% confidence
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-gray-900">{prediction.prediction}</div>
                  <div className="text-sm text-gray-500">{prediction.period}</div>
                  
                  <div className={`flex items-center text-sm ${
                    prediction.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {prediction.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {prediction.change} vs current period
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-2">{prediction.details}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <PieChart className="h-5 w-5 mr-2 text-green-500" />
            Category Performance Analysis
          </CardTitle>
          <CardDescription>
            AI insights into business category performance and optimization opportunities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {categoryInsights.map((category) => (
              <div key={category.category} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">{category.category}</h3>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    {category.growth}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-gray-500">Bookings:</span>
                    <div className="font-medium">{category.bookings.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Avg Rating:</span>
                    <div className="font-medium flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      {category.avgRating}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-500">Top Service:</span>
                    <div className="font-medium">{category.topService}</div>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center">
                    <Lightbulb className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="text-sm font-medium text-blue-700">AI Recommendation:</span>
                  </div>
                  <p className="text-sm text-blue-600 mt-1">{category.recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
