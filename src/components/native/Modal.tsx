"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import SubmitButton from "./SubmitButton";

export default function Modal({
  openModalTrigger,
  title,
  description,
  children,
}: {
  openModalTrigger: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Dialog>
      <DialogTrigger asChild>{openModalTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          <SubmitButton />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
