"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Copy, CheckCircle, Loader2, Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@clerk/nextjs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { userNameSchema } from '@/zodSchema/schemas';
import useFetch from '@/hooks/use-fetch';
import { updateUsername } from '@/actions/users';
import { getLatestUpdates } from '@/actions/dashboard';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [currentUrlOrigin, setCurrentUrlOrigin] = useState('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof userNameSchema>>({
    resolver: zodResolver(userNameSchema),
    defaultValues: {
      username: user?.username || '',
    },
  });

  useEffect(() => {
    setCurrentUrlOrigin(window.location.origin);
  }, []);

  const uniqueLink = `${currentUrlOrigin}/${user?.username || 'your-username'}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast({
        title: "Copied!",
        description: "The link has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const onSubmit = async (values: z.infer<typeof userNameSchema>) => {
    await updateUsernameFn(values.username);
    toast({
      title: "Username updated!",
      description: `Your new username is ${values.username}`,
    });
    setIsDialogOpen(false);
    router.refresh();
  };

  const { loading, fn: updateUsernameFn } = useFetch(updateUsername);
  const { data: upcomingMeeting, loading: latestUpdateLoading, error: latestUpdateError, fn: fnGetLatestUpdate } = useFetch(getLatestUpdates);

  useEffect(() => {
    fnGetLatestUpdate();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse,transparent_20%,black)]" />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <header className="mb-12 text-center">
          <CalendarDays className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-primary mb-2">Welcome {user?.firstName}</h1>
          <p className="text-xl text-muted-foreground">Let's manage your schedule efficiently!</p>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <Card className="bg-white/90 dark:bg-neutral-950/90 shadow-lg backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Your Unique Slotly Link</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between bg-muted p-3 rounded-md mb-4">
                <span className="text-primary font-medium">{uniqueLink}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(uniqueLink)}
                  className="ml-2"
                >
                  {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Share this link with others to let them book time slots with you.</p>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">Update Username</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Update Username</DialogTitle>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input placeholder="your-username" {...field} type='text' />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" disabled={loading}>
                        {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                        Save changes
                      </Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          <Card className="bg-white/90 dark:bg-neutral-950/90 shadow-lg backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold flex items-center">
                <Bell className="mr-2 h-5 w-5 text-primary" />
                Latest Updates
              </CardTitle>
            </CardHeader>
            <CardContent>
              {latestUpdateLoading ? (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : latestUpdateError ? (
                <p className="text-red-500">Error loading latest updates. Please try again later.</p>
              ) : upcomingMeeting ? (
                <ul className="space-y-2">
                  {upcomingMeeting?.map((meeting: any, index: any) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start space-x-2"
                    >
                      <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-primary" />
                      <p className="text-sm text-muted-foreground">{meeting.event.title} on {format(new Date(meeting.startTime), "MMM d, yyyy h:mm a")}{" "}
                        with {meeting.name}</p>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No upcoming meetings.</p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}