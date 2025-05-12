import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LoginForms from "../LoginForms/LoginForms"
import RegisterForms from "../RegisterForms/RegisterForms"



export default function TabsForms() {
  return (
    <Tabs defaultValue="singin" className="w-[400px] ">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin" className="cursor-pointer">Sign in</TabsTrigger>
            <TabsTrigger value="signup" className="cursor-pointer">Sign up</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
            <Card>
                <CardContent className="space-y-2">
                    <LoginForms></LoginForms>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="signup">
            <Card>
                <CardContent className="space-y-2">
                    <RegisterForms></RegisterForms>
                </CardContent>
            </Card>
        </TabsContent>
    </Tabs>
  )
}
