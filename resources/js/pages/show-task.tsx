import AppLayout from "@/layouts/app-layout";
import { Task } from "@/types";
import { Head } from "@inertiajs/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizonal } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function ShowTask({tasks}: {tasks:Task[]}){
    return (
        <AppLayout>
            <Head title="Task"/>
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {tasks.map((task) => (
                        <Card className="gap-2">
                            <CardHeader>
                                <div className="flex justify-between">
                                    <div className="space-y-2">
                                    <CardTitle>{task.title}</CardTitle>
                                    <CardDescription
                                        className="text-red-600 font-medium">
                                        Missing
                                    </CardDescription>
                                    </div>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button size="sm">Add Work</Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Add Work</DialogTitle>
                                            <DialogDescription>
                                                <Input type="file"/>
                                            </DialogDescription>
                                            <DialogFooter className="space-x-2">
                                                <Button variant="ghost">Discard</Button>
                                                <Button>Turn In</Button>
                                            </DialogFooter>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>
                                    {/* <p className="text-green-700 text-base">Turned In</p> */}
                                </div>
                                
                                <CardDescription>{task.class}</CardDescription>
                                <CardDescription className="max-w-xs flex gap-2 items-center">
                                    <span className="text-xs">99%</span><Progress value={30}/>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>{task.description}</p>
                                <CardDescription>Due: {task.due_date}</CardDescription>
                            </CardContent>
                            {/* <Card className="m-4 mb-0">
                                <CardHeader>
                                    <CardTitle>Comments</CardTitle>
                                </CardHeader>
                                <CardContent className="px-6 grid gap-2">
                                    <div className="h-full max-h-26 overflow-y-auto">
                                        <p><span className="font-bold">You:</span> asd</p>
                                        <p>Natoy: Lorem, ipsum dolor.</p>
                                        <p><span className="font-bold">You:</span> asd</p>
                                        <p>Natoy: Lorem, ipsum dolor.</p>
                                        <p><span className="font-bold">You:</span> asd</p>
                                        <p>Natoy: Lorem, ipsum dolor.</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Input type="text"/>
                                        <SendHorizonal/>
                                    </div>
                                </CardContent>
                            </Card> */}
                        </Card>
                    ))}
            </div>
        </AppLayout>
    )
}

                            // <div className="grid grid-cols-[3fr_1fr] gap-4">
                            //     <section>
                            //         <div>
                            //             <CardHeader>
                            //                 <CardTitle>{task.title}</CardTitle>
                            //                 <CardDescription>{task.class}</CardDescription>
                            //                 <CardDescription className="max-w-xs flex gap-2 items-center">
                            //                     <span className="text-xs">99%</span><Progress value={30}/>
                            //                 </CardDescription>
                            //             </CardHeader>
                            //             <CardContent>
                            //                 <p>{task.description}</p>
                            //                 <CardDescription>Due: {task.due_date}</CardDescription>
                            //             </CardContent>
                            //         </div>
                            //         <Separator className="ml-4 my-4"/>
                            //         <Card className="ml-4">
                            //             <CardHeader>
                            //                 <CardTitle>Comments</CardTitle>
                            //             </CardHeader>
                            //             <CardContent className="h-26 overflow-y-auto">
                            //                 <div className="text-xs">
                            //                     <p>You: Lorem, ipsum dolor.</p>
                            //                     <p>Natoy: Lorem, ipsum dolor.</p>
                            //                 </div>
                            //             </CardContent>
                            //         </Card>
                            //     </section>
                            //     <section className="mr-4 space-y-4">
                            //         <Card>
                            //             <CardHeader>
                            //                 <div className="flex justify-between">
                            //                     <p>Your Work</p>
                            //                     <p>Turned in</p>
                            //                 </div>
                                        
                            //                 <Label htmlFor="file">File</Label>
                            //                 <Input id="file" type="file"/>
                            //             </CardHeader>
                            //         </Card>
                            //         <Card className="py-4">
                            //             <CardHeader>
                            //                 <CardTitle>Private Comment</CardTitle>
                            //             </CardHeader>
                            //             <CardContent className="space-y-2">
                            //                 <Textarea className="w-full"/>
                            //                 <div className="flex justify-end">
                            //                     <Button>Submit</Button>
                            //                 </div>
                            //             </CardContent>
                            //         </Card>
                            //     </section>
                            // </div>