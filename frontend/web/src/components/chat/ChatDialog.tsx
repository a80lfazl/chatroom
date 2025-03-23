import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner";
import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(1, "Chat name is required"),
  friend: z.string().min(1, "Please select a friend"),
  // chatType: z.string().min(1, "Please select a chat type"),
});

type Friend = {
  id: string;
  name: string;
};

export const ChatDialog = ({
  children,
  friends,
}: {
  children: React.ReactNode;
  friends: Friend[];
}) => {
  const [open, setOpen] = useState(false);

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      friend: "",
    },
  });

  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Here you would typically handle the form submission
    console.log("Creating chat:", values);

    // Reset form and close dialog
    form.reset();
    setOpen(false);

    toast("Success", {
      description: "Chat created successfully!",
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nopen) => {
        form.reset();
        setOpen(nopen);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Chat</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new chat.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter chat name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="friend"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Friends</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select friend" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {friends.map(({ id, name }) => (
                        <SelectItem value={id}>{name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="chatType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chat Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select chat type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="personal">Personal</SelectItem>
                      <SelectItem value="group">Group</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                      <SelectItem value="announcement">Announcement</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <DialogFooter>
              <Button type="submit">Create Chat</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
