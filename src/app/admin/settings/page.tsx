/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import {
  Save,
  Settings as SettingsIcon,
  Bell,
  Shield,
  Database,
  Mail,
  Users,
  DollarSign,
  Globe,
  Palette,
  Zap,
  Lock,
  Key,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
  Copy,
  RefreshCw,
  Upload,
  Download,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminSettings() {
  const [hasMounted, setHasMounted] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)
  const [settings, setSettings] = useState({
    // General Settings
    platformName: "Nexa",
    platformDescription: "Connect with trusted local businesses across Nigeria",
    supportEmail: "support@nexa.ng",
    adminEmail: "admin@nexa.ng",
    timezone: "Africa/Lagos",
    language: "en",
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    weeklyReports: true,
    monthlyAnalytics: true,
    securityAlerts: true,
    
    // Business Settings
    autoApproval: false,
    verificationRequired: true,
    commissionRate: 10,
    minimumPayout: 10000,
    maxBusinessListings: 50,
    negotiationEnabled: true,
    
    // Security Settings
    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordMinLength: 8,
    requireSpecialChars: true,
    
    // Payment Settings
    paystackPublicKey: "pk_test_xxxxx",
    paystackSecretKey: "sk_test_xxxxx",
    flutterwavePublicKey: "FLWPUBK_TEST-xxxxx",
    flutterwaveSecretKey: "FLWSECK_TEST-xxxxx",
    
    // Integration Settings
    googleMapsApi: "AIzaSyxxxxx",
    twilioSid: "ACxxxxx",
    twilioToken: "xxxxx",
    
    // Maintenance
    maintenanceMode: false,
    maintenanceMessage: "We're performing scheduled maintenance. Please check back soon.",
  })

  useEffect(() => {
    setHasMounted(true)
  }, [])

  // Prevent hydration mismatch by not rendering until mounted
  if (!hasMounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#05BBC8] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading admin settings...</p>
        </div>
      </div>
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSaveSettings = () => {
    // Save settings logic here
    console.log("Saving settings:", settings)
  }

  const generateApiKey = () => {
    if (typeof window !== 'undefined') {
      const newKey = `nexa_${Math.random().toString(36).substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}`
      handleSettingChange('apiKey', newKey)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Platform Settings</h1>
        <p className="mt-2 text-gray-600">
          Configure and manage your Nexa platform settings, integrations, and preferences.
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="flex items-center space-x-1 bg-white rounded-lg p-1 border border-gray-200 w-full overflow-x-auto h-auto">
          <TabsTrigger 
            value="general"
            className="px-3 sm:px-6 py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 cursor-pointer data-[state=active]:bg-[#05BBC8] data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-gray-900 data-[state=inactive]:hover:bg-gray-50"
          >
            ⚙️ General
          </TabsTrigger>
          <TabsTrigger 
            value="notifications"
            className="px-3 sm:px-6 py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 cursor-pointer data-[state=active]:bg-[#05BBC8] data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-gray-900 data-[state=inactive]:hover:bg-gray-50"
          >
            🔔 Notifications
          </TabsTrigger>
          <TabsTrigger 
            value="business"
            className="px-3 sm:px-6 py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 cursor-pointer data-[state=active]:bg-[#05BBC8] data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-gray-900 data-[state=inactive]:hover:bg-gray-50"
          >
            🏢 Business
          </TabsTrigger>
          <TabsTrigger 
            value="security"
            className="px-3 sm:px-6 py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 cursor-pointer data-[state=active]:bg-[#05BBC8] data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-gray-900 data-[state=inactive]:hover:bg-gray-50"
          >
            🔒 Security
          </TabsTrigger>
          <TabsTrigger 
            value="payments"
            className="px-3 sm:px-6 py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 cursor-pointer data-[state=active]:bg-[#05BBC8] data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-gray-900 data-[state=inactive]:hover:bg-gray-50"
          >
            💳 Payments
          </TabsTrigger>
          <TabsTrigger 
            value="integrations"
            className="px-3 sm:px-6 py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 cursor-pointer data-[state=active]:bg-[#05BBC8] data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-gray-900 data-[state=inactive]:hover:bg-gray-50"
          >
            🔗 Integrations
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <SettingsIcon className="h-5 w-5 mr-2" />
                  Platform Information
                </CardTitle>
                <CardDescription>Basic platform configuration and branding</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="platformName">Platform Name</Label>
                  <Input
                    id="platformName"
                    value={settings.platformName}
                    onChange={(e) => handleSettingChange('platformName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="platformDescription">Platform Description</Label>
                  <Textarea
                    id="platformDescription"
                    value={settings.platformDescription}
                    onChange={(e) => handleSettingChange('platformDescription', e.target.value)}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    value={settings.supportEmail}
                    onChange={(e) => handleSettingChange('supportEmail', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="adminEmail">Admin Email</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    value={settings.adminEmail}
                    onChange={(e) => handleSettingChange('adminEmail', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Localization
                </CardTitle>
                <CardDescription>Regional and language preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={settings.timezone} onValueChange={(value) => handleSettingChange('timezone', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 shadow-lg">
                      <SelectItem value="Africa/Lagos">Africa/Lagos (WAT)</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="language">Default Language</Label>
                  <Select value={settings.language} onValueChange={(value) => handleSettingChange('language', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 shadow-lg">
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ha">Hausa</SelectItem>
                      <SelectItem value="ig">Igbo</SelectItem>
                      <SelectItem value="yo">Yoruba</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="pt-4">
                  <Button onClick={handleSaveSettings} className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Save General Settings
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  System Controls
                </CardTitle>
                <CardDescription>Platform system status and controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                    <p className="text-sm text-gray-500">Enable to put the platform in maintenance mode</p>
                  </div>
                  <Switch
                    id="maintenanceMode"
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => handleSettingChange('maintenanceMode', checked)}
                  />
                </div>
                {settings.maintenanceMode && (
                  <div>
                    <Label htmlFor="maintenanceMessage">Maintenance Message</Label>
                    <Textarea
                      id="maintenanceMessage"
                      value={settings.maintenanceMessage}
                      onChange={(e) => handleSettingChange('maintenanceMessage', e.target.value)}
                      rows={2}
                    />
                  </div>
                )}
                <div className="pt-4">
                  <Button onClick={handleSaveSettings} className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Save System Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Configure how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Communication Channels</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailNotifications">Email Notifications</Label>
                        <p className="text-sm text-gray-500">Receive notifications via email</p>
                      </div>
                      <Switch
                        id="emailNotifications"
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="smsNotifications">SMS Notifications</Label>
                        <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                      </div>
                      <Switch
                        id="smsNotifications"
                        checked={settings.smsNotifications}
                        onCheckedChange={(checked) => handleSettingChange('smsNotifications', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="pushNotifications">Push Notifications</Label>
                        <p className="text-sm text-gray-500">Receive browser push notifications</p>
                      </div>
                      <Switch
                        id="pushNotifications"
                        checked={settings.pushNotifications}
                        onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Report Frequency</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="weeklyReports">Weekly Reports</Label>
                        <p className="text-sm text-gray-500">Platform performance summaries</p>
                      </div>
                      <Switch
                        id="weeklyReports"
                        checked={settings.weeklyReports}
                        onCheckedChange={(checked) => handleSettingChange('weeklyReports', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="monthlyAnalytics">Monthly Analytics</Label>
                        <p className="text-sm text-gray-500">Detailed analytics reports</p>
                      </div>
                      <Switch
                        id="monthlyAnalytics"
                        checked={settings.monthlyAnalytics}
                        onCheckedChange={(checked) => handleSettingChange('monthlyAnalytics', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="securityAlerts">Security Alerts</Label>
                        <p className="text-sm text-gray-500">Important security notifications</p>
                      </div>
                      <Switch
                        id="securityAlerts"
                        checked={settings.securityAlerts}
                        onCheckedChange={(checked) => handleSettingChange('securityAlerts', checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              <Button onClick={handleSaveSettings}>
                <Save className="h-4 w-4 mr-2" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Business Settings */}
        <TabsContent value="business">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Business Management
                </CardTitle>
                <CardDescription>Configure business approval and verification settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoApproval">Auto-approve Businesses</Label>
                    <p className="text-sm text-gray-500">Automatically approve new business registrations</p>
                  </div>
                  <Switch
                    id="autoApproval"
                    checked={settings.autoApproval}
                    onCheckedChange={(checked) => handleSettingChange('autoApproval', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="verificationRequired">Verification Required</Label>
                    <p className="text-sm text-gray-500">Require document verification for businesses</p>
                  </div>
                  <Switch
                    id="verificationRequired"
                    checked={settings.verificationRequired}
                    onCheckedChange={(checked) => handleSettingChange('verificationRequired', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="negotiationEnabled">Enable Negotiations</Label>
                    <p className="text-sm text-gray-500">Allow price negotiations between users and businesses</p>
                  </div>
                  <Switch
                    id="negotiationEnabled"
                    checked={settings.negotiationEnabled}
                    onCheckedChange={(checked) => handleSettingChange('negotiationEnabled', checked)}
                  />
                </div>
                <div>
                  <Label htmlFor="maxBusinessListings">Max Listings per Business</Label>
                  <Input
                    id="maxBusinessListings"
                    type="number"
                    value={settings.maxBusinessListings}
                    onChange={(e) => handleSettingChange('maxBusinessListings', parseInt(e.target.value))}
                  />
                  <p className="text-sm text-gray-500 mt-1">Maximum number of services a business can list</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Financial Settings
                </CardTitle>
                <CardDescription>Commission rates and payout configurations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="commissionRate">Platform Commission Rate (%)</Label>
                  <Input
                    id="commissionRate"
                    type="number"
                    value={settings.commissionRate}
                    onChange={(e) => handleSettingChange('commissionRate', parseFloat(e.target.value))}
                    min="0"
                    max="100"
                    step="0.1"
                  />
                  <p className="text-sm text-gray-500 mt-1">Percentage commission on each transaction</p>
                </div>
                <div>
                  <Label htmlFor="minimumPayout">Minimum Payout Amount (₦)</Label>
                  <Input
                    id="minimumPayout"
                    type="number"
                    value={settings.minimumPayout}
                    onChange={(e) => handleSettingChange('minimumPayout', parseInt(e.target.value))}
                    min="0"
                  />
                  <p className="text-sm text-gray-500 mt-1">Minimum amount businesses can withdraw</p>
                </div>
                <div className="pt-4">
                  <Button onClick={handleSaveSettings} className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Save Business Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Authentication & Access
                </CardTitle>
                <CardDescription>Configure security and access control settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-500">Require 2FA for admin access</p>
                  </div>
                  <Switch
                    id="twoFactorAuth"
                    checked={settings.twoFactorAuth}
                    onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
                  />
                </div>
                <div>
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                    min="5"
                    max="480"
                  />
                  <p className="text-sm text-gray-500 mt-1">Auto-logout after inactivity</p>
                </div>
                <div>
                  <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                  <Input
                    id="passwordMinLength"
                    type="number"
                    value={settings.passwordMinLength}
                    onChange={(e) => handleSettingChange('passwordMinLength', parseInt(e.target.value))}
                    min="6"
                    max="50"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="requireSpecialChars">Require Special Characters</Label>
                    <p className="text-sm text-gray-500">Passwords must include special characters</p>
                  </div>
                  <Switch
                    id="requireSpecialChars"
                    checked={settings.requireSpecialChars}
                    onCheckedChange={(checked) => handleSettingChange('requireSpecialChars', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Key className="h-5 w-5 mr-2" />
                  API Access
                </CardTitle>
                <CardDescription>Manage API keys and external access</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="apiKey">Platform API Key</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="apiKey"
                      type={showApiKey ? "text" : "password"}
                      value="nexa_live_sk_1234567890abcdef"
                      readOnly
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard("nexa_live_sk_1234567890abcdef")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Used for API authentication</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={generateApiKey}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Regenerate Key
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download Logs
                  </Button>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-center">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                    <span className="text-sm font-medium text-yellow-700">Security Warning</span>
                  </div>
                  <p className="text-sm text-yellow-600 mt-1">
                    Regenerating the API key will invalidate the current key. Update all integrations.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payments">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Payment Gateway Configuration
                </CardTitle>
                <CardDescription>Configure payment processors and API credentials</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 flex items-center">
                      Paystack Integration
                      <Badge variant="secondary" className="ml-2 bg-green-100 text-green-700">Active</Badge>
                    </h3>
                    <div>
                      <Label htmlFor="paystackPublicKey">Public Key</Label>
                      <Input
                        id="paystackPublicKey"
                        value={settings.paystackPublicKey}
                        onChange={(e) => handleSettingChange('paystackPublicKey', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="paystackSecretKey">Secret Key</Label>
                      <Input
                        id="paystackSecretKey"
                        type="password"
                        value={settings.paystackSecretKey}
                        onChange={(e) => handleSettingChange('paystackSecretKey', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 flex items-center">
                      Flutterwave Integration
                      <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-700">Inactive</Badge>
                    </h3>
                    <div>
                      <Label htmlFor="flutterwavePublicKey">Public Key</Label>
                      <Input
                        id="flutterwavePublicKey"
                        value={settings.flutterwavePublicKey}
                        onChange={(e) => handleSettingChange('flutterwavePublicKey', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="flutterwaveSecretKey">Secret Key</Label>
                      <Input
                        id="flutterwaveSecretKey"
                        type="password"
                        value={settings.flutterwaveSecretKey}
                        onChange={(e) => handleSettingChange('flutterwaveSecretKey', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <div>
                      <h4 className="font-medium text-green-900">Payment System Status</h4>
                      <p className="text-sm text-green-700">All payment gateways are operational</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Test Connection
                  </Button>
                </div>

                <Button onClick={handleSaveSettings}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Payment Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Integration Settings */}
        <TabsContent value="integrations">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  Third-Party Integrations
                </CardTitle>
                <CardDescription>Configure external service integrations and API keys</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Google Services</h3>
                    <div>
                      <Label htmlFor="googleMapsApi">Google Maps API Key</Label>
                      <Input
                        id="googleMapsApi"
                        value={settings.googleMapsApi}
                        onChange={(e) => handleSettingChange('googleMapsApi', e.target.value)}
                      />
                      <p className="text-sm text-gray-500 mt-1">For location services and mapping</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Twilio (SMS)</h3>
                    <div>
                      <Label htmlFor="twilioSid">Account SID</Label>
                      <Input
                        id="twilioSid"
                        value={settings.twilioSid}
                        onChange={(e) => handleSettingChange('twilioSid', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="twilioToken">Auth Token</Label>
                      <Input
                        id="twilioToken"
                        type="password"
                        value={settings.twilioToken}
                        onChange={(e) => handleSettingChange('twilioToken', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Maintenance Mode</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="maintenanceMode">Enable Maintenance Mode</Label>
                      <p className="text-sm text-gray-500">Temporarily disable platform access for maintenance</p>
                    </div>
                    <Switch
                      id="maintenanceMode"
                      checked={settings.maintenanceMode}
                      onCheckedChange={(checked) => handleSettingChange('maintenanceMode', checked)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="maintenanceMessage">Maintenance Message</Label>
                    <Textarea
                      id="maintenanceMessage"
                      value={settings.maintenanceMessage}
                      onChange={(e) => handleSettingChange('maintenanceMessage', e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>

                <Button onClick={handleSaveSettings}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Integration Settings
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Export & Backup</CardTitle>
                <CardDescription>Export platform data and configure automated backups</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Users
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Businesses
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Transactions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
