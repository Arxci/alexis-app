"use client";

import { useState } from "react";

import Image from "next/image";

import { Content as DialogContentPrimitive } from "@radix-ui/react-dialog";

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
import { Skeleton } from "../ui/skeleton";

import { Icons } from "../icons";

import { cn } from "@/lib/utils";
import { useImageLoad } from "@/lib/hooks/useImageLoad";

export const ImageCard = ({
  src,
  alt,
  ratio,
  priority = false,
}: {
  src: string;
  alt: string;
  ratio: number;
  priority?: boolean;
}) => {
  const [open, setOpen] = useState(false);

  const thumbnail = useImageLoad();
  const modal = useImageLoad();

  const handleOpenChanged = (open: boolean) => {
    setOpen(open);

    if (open) modal.reset();
  };

  return (
    <Dialog onOpenChange={handleOpenChanged} open={open}>
      <DialogTrigger className="cursor-pointer group hover:-translate-y-2 transition-transform rounded-none">
        <ImageFrame>
          <AspectRatio ratio={ratio} className="overflow-hidden">
            {thumbnail.isLoading && (
              <Skeleton className="h-full w-full bg-stone-300" />
            )}
            {thumbnail.hasError && (
              <div className="h-full flex items-center justify-center bg-stone-800">
                <Icons.placeholder className="text-stone-900 h-12 w-12" />
              </div>
            )}
            <Image
              src={src}
              alt={alt}
              fill
              quality={75}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 384px"
              priority={priority}
              fetchPriority={priority ? "high" : undefined}
              className={cn(
                "object-cover transition-opacity duration-500",
                thumbnail.isLoading || thumbnail.hasError
                  ? "opacity-0"
                  : "opacity-100"
              )}
              onLoad={thumbnail.handleLoad}
              onError={thumbnail.handleError}
            />
            <span className="sr-only">Click to enlarge</span>
          </AspectRatio>
        </ImageFrame>
      </DialogTrigger>
      <DialogContent
        aria-describedby="Full screen image"
        showCloseButton={!modal.isLoading}
        className="min-w-[300px] min-h-[300px]"
      >
        <DialogTitle className="sr-only" />
        <DialogDescription className="sr-only" />
        {modal.isLoading && (
          <Icons.spinner className="absolute animate-spin w-10 h-10 text-stone-400" />
        )}
        {modal.hasError && (
          <div className="h-full flex items-center justify-center bg-stone-800">
            <Icons.placeholder className="text-stone-900 h-12 w-12" />
          </div>
        )}
        <div
          className={cn(
            "relative bg-stone-800/50 border-2 overflow-hidden transition-opacity duration-150",
            modal.isLoading || modal.hasError ? "opacity-0" : "opacity-100"
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
            onLoad={modal.handleLoad}
            onError={modal.handleError}
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
}: React.ComponentProps<typeof DialogContentPrimitive> & {
  showCloseButton?: boolean;
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay className="bg-stone-900/60 supports-backdrop-filter:backdrop-blur-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 " />
      <DialogContentPrimitive
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
      </DialogContentPrimitive>
    </DialogPortal>
  );
}
