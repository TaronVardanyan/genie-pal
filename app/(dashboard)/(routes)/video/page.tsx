'use client';

import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import Heading from '@/components/heading';
import Empty from '@/components/empty';
import Loader from '@/components/loader';
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { VideoIcon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { formSchema } from './constants';
import { useRouter } from 'next/navigation';

const VideoPage = () => {
  const router = useRouter();
  const [video, setVideo] = useState<string>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo(undefined);
      const response = await axios.post('/api/video/', values);

      setVideo(response.data[0]);

      form.reset();
    } catch (error: any) {
      //Todo open PRO modal
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Video Generation"
        description="Turn your prompt into video"
        icon={VideoIcon}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid w-full grid-cols-12 gap-2 rounded-lg border p-4 px-3 focus-within:shadow-sm md:px-6"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        {...field}
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Fish swimming around a coral reef"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                className="col-span-12 w-full lg:col-span-2"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="mt-4 space-y-4">
          {isLoading && (
            <div className="p-20">
              <Loader />
            </div>
          )}
          {!video && !isLoading && <Empty label="No video generated!" />}
          {!!video && (
            <video
              controls
              className="mt-8 aspect-video w-full rounded-lg border bg-black"
            >
              <source src={video} />
            </video>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
