"use client";

import { useState } from "react";

import Image from "next/image";

import * as DialogPrimitive from "@radix-ui/react-dialog";

import { AspectRatio } from "../ui/aspect-ratio";

import { ImageFrame } from "./image-frame";
import {
  Dialog,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogPortal,
  DialogOverlay,
  DialogDescription,
} from "../ui/dialog";
import { Card } from "../ui/card";
import { Icons } from "../icons";

import { cn } from "@/lib/utils";

export const ImageCard = ({
  src,
  alt,
  ratio,
}: {
  src: string;
  alt: string;
  ratio: number;
}) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleOpenChanged = (open: boolean) => {
    setOpen(open);

    if (open) setIsLoading(true);
  };

  const handleImageLoaded = () => {
    setIsLoading(false);
  };

  return (
    <Dialog onOpenChange={handleOpenChanged} open={open}>
      <DialogTrigger className="cursor-pointer group hover:-translate-y-2 transition-transform rounded-none">
        <ImageFrame>
          <AspectRatio ratio={ratio} className="overflow-hidden">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, 1000px"
              className="object-cover"
            />
          </AspectRatio>
        </ImageFrame>
      </DialogTrigger>
      <DialogContent
        aria-describedby="Full screen image"
        showCloseButton={!isLoading}
        className="min-w-[300px] min-h-[300px]"
      >
        <DialogTitle className="sr-only" />
        <DialogDescription className="sr-only" />
        {isLoading && (
          <Icons.spinner className="absolute animate-spin w-10 h-10 text-stone-400" />
        )}

        <div
          className={cn(
            "relative bg-stone-800/50 border-2 overflow-hidden transition-opacity duration-150",
            isLoading ? "opacity-0" : "opacity-100"
          )}
        >
          <Image
            src={src}
            alt={alt}
            width={1920}
            height={1080}
            className={cn(
              "w-auto h-auto max-w-[95vw] max-h-[95vh] object-contain"
            )}
            onLoad={handleImageLoaded}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay className="bg-stone-900/60 supports-backdrop-filter:backdrop-blur-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 " />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "outline-none flex items-center justify-center data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%]  p-6 duration-200",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogClose
            data-slot="dialog-close"
            className=" data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-10 right-10 z-10 cursor-pointer opacity-60 transition-opacity focus:opacity-100 hover:opacity-100  disabled:pointer-events-none "
          >
            <Card className="m-0">
              <Icons.close className="h-10 w-10" />
              <span className="sr-only ">Close</span>
            </Card>
          </DialogClose>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}
