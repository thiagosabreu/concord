"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FileUpload } from "@/components/file-upload";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Server name is required."
    }),
    imageUrl: z.string().min(1, {
        message: "Server image is required."
    })
});

const CreateServerUrl = () => {
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: "",
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            console.log("Fetching user server...");
            const response = await fetch("/api/servers", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });
            if (response.ok) {
                const data = await response.json();
                console.log("Server fetched successfully", data);
                const serverId = data.serverId;
                form.reset();
                router.push(`/servers/${serverId}`);
            } else {
                console.error('Failed to fetch server.', response.statusText);
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="mx-auto p-4 max-w-2xl">
            <h1 className="text-2xl font-bold text-center mb-4">Customize your server</h1>
            <p className="text-center text-zinc-500 mb-6">
                Give your server a personality with a name and an image. You can always change it later.
            </p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-6">
                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <FileUpload
                                            endpoint="serverImage"
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 block mb-1">
                                        Server name
                                    </FormLabel>
                                    <FormControl>

                                        <Input
                                            disabled={isLoading}
                                            className="bg-zinc-300/50 border border-zinc-200 rounded focus-visible:ring-2 focus-visible:ring-indigo-500 text-black focus-visible:ring-offset-0"
                                            placeholder="Enter server name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex justify-center p-4">
                        <button type="submit" className="bg-[#0a0a2b] dark:bg-[#df9ff7] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:bg-blue-300" disabled={isLoading}>
                            Create
                        </button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default CreateServerUrl;
