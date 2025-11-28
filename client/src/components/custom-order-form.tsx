import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";
import { Palette, Gift, Flower } from "lucide-react";

const formSchema = z.object({
  quantity: z.number().min(1, "At least 1 flower is required").max(100, "Max 100 flowers"),
  color: z.string().min(1, "Please select a color"),
  wrapping: z.string().min(1, "Please select wrapping"),
  notes: z.string().optional(),
});

export default function CustomOrderForm() {
  const [previewPrice, setPreviewPrice] = useState(15); // Base price

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: 1,
      color: "teal-blue",
      wrapping: "kraft",
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Request Submitted",
      description: `Order for ${values.quantity} flowers initiated.`,
    });
  }

  return (
    <div className="p-8 lg:p-10">
        <div className="text-center mb-10">
          <h3 className="font-serif text-2xl text-foreground mb-2">Start Your Project</h3>
          <p className="text-sm text-muted-foreground">Configure your arrangement below.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            {/* Quantity Slider */}
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center mb-4">
                     <FormLabel className="text-base font-medium text-foreground">Flower Count</FormLabel>
                     <span className="font-mono text-sm font-bold text-primary bg-secondary px-3 py-1 rounded-md">
                        {field.value}
                     </span>
                  </div>
                  <FormControl>
                    <Slider
                      min={1}
                      max={50}
                      step={1}
                      defaultValue={[field.value]}
                      onValueChange={(vals) => {
                        field.onChange(vals[0]);
                        setPreviewPrice(vals[0] * 5);
                      }}
                      className="py-2"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Color Selection */}
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-foreground flex items-center gap-2 mb-3">
                    <Palette className="w-4 h-4 text-primary" /> Color Palette
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-3 gap-3"
                    >
                      {[
                        { id: "signature-pink", name: "Signature Pink", color: "bg-[#f97a9d]" },
                        { id: "ocean-teal", name: "Ocean Teal", color: "bg-[#2596be]" },
                        { id: "creamy-white", name: "Pure White", color: "bg-stone-100" },
                        { id: "lavender", name: "Lavender", color: "bg-purple-200" },
                        { id: "ruby-red", name: "Ruby Red", color: "bg-red-700" },
                        { id: "sunny-yellow", name: "Gold", color: "bg-yellow-200" },
                      ].map((color) => (
                        <FormItem key={color.id}>
                          <FormControl>
                            <RadioGroupItem value={color.id} className="peer sr-only" />
                          </FormControl>
                          <FormLabel className="flex flex-col items-center justify-center rounded-lg border border-border bg-white p-3 hover:border-primary hover:bg-secondary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:text-primary cursor-pointer transition-all h-24 text-center">
                            <div className={`w-6 h-6 rounded-full mb-2 shadow-sm ${color.color}`} />
                            <span className="text-xs font-medium">{color.name}</span>
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Wrapping Selection */}
            <FormField
              control={form.control}
              name="wrapping"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-foreground flex items-center gap-2">
                    <Gift className="w-4 h-4 text-primary" /> Presentation
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 bg-white border-border">
                        <SelectValue placeholder="Select wrapping" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="kraft">Signature Kraft Paper</SelectItem>
                      <SelectItem value="silk">Silk Ribbon Binding</SelectItem>
                      <SelectItem value="vase">Ceramic Vase (+$15)</SelectItem>
                      <SelectItem value="box">Premium Gift Box</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-6 border-t border-border mt-4">
              <div className="flex justify-between items-end mb-6">
                 <span className="text-sm text-muted-foreground">Estimated Total</span>
                 <span className="text-3xl font-serif font-medium text-primary">{previewPrice}.00 K.D.</span>
              </div>
              <Button type="submit" size="lg" className="w-full h-14 text-lg rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all">
                Begin Order
              </Button>
            </div>
          </form>
        </Form>
    </div>
  );
}
