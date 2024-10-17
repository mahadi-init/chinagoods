"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string({ required_error: "আপনার নাম দিন" }),
  address: z.string({
    required_error: "আপনার ঠিকানাদিন",
  }),
  phone: z.string({ required_error: "আপনার মোবাইল নাম্বার দিন" }),
  note: z.string().optional(),
});

export default function InfoForm() {
  return (
    <div>
      <p className="text-center text-2xl font-bold">
        আপনার নাম, ঠিকানা ও মোবাইল নম্বরটি লিখে অর্ডার কনফার্ম করুন
      </p>

      <div className="mt-12">
        <p className="mb-6 text-xl font-semibold">Billing Address</p>

        <div className="flex flex-col gap-4">
          <div className="flex w-full justify-between gap-6">
            <div className="w-full space-y-2">
              <Label>আপনার নাম * * *</Label>
              <Input className="bg-gray-50" />
            </div>

            <div className="w-full space-y-2">
              <Label>আপনার নাম * * *</Label>
              <Input
                className="bg-gray-50"
                placeholder="গ্রাম-থানা-জেলা লিখুন-"
              />
            </div>
          </div>

          <div className="w-full space-y-2">
            <Label>মোবাইল নাম্বার * * *</Label>
            <Input
              className="bg-gray-50"
              placeholder="গ্রাম-থানা-জেলা লিখুন-"
            />
          </div>

          <div className="w-full space-y-2">
            <Label>Order notes (optional)</Label>
            <Textarea
              rows={4}
              className="bg-gray-50"
              placeholder="Notes about your order, e.g. special notes for delivery."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
