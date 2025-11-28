import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";
import { Paintbrush, Gift, Flower2 } from "lucide-react";

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
      color: "soft-pink",
      wrapping: "kraft",
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Order Request Sent!",
      description: `We've received your request for ${values.quantity} ${values.color} flowers.`,
    });
  }

  return (
    <Card className="w-full max-w-xl mx-auto shadow-xl border-none bg-white/90 backdrop-blur-sm">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-3xl font-serif text-foreground">Design Your Bouquet</CardTitle>
        <CardDescription className="text-muted-foreground text-lg">
          Create a custom arrangement just for you
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            {/* Quantity Slider */}
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-between items-center text-base">
                    <span>How many flowers?</span>
                    <span className="font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {field.value}
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Slider
                      min={1}
                      max={50}
                      step={1}
                      defaultValue={[field.value]}
                      onValueChange={(vals) => {
                        field.onChange(vals[0]);
                        setPreviewPrice(vals[0] * 15);
                      }}
                      className="py-4"
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
                  <FormLabel className="text-base flex items-center gap-2">
                    <Paintbrush className="w-4 h-4" /> Select Color Palette
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                    >
                      {[
                        { id: "soft-pink", name: "Soft Pink", color: "bg-pink-200" },
                        { id: "creamy-white", name: "Creamy White", color: "bg-stone-100" },
                        { id: "lavender", name: "Lavender", color: "bg-purple-200" },
                        { id: "ruby-red", name: "Ruby Red", color: "bg-red-700" },
                        { id: "sunny-yellow", name: "Sunny Yellow", color: "bg-yellow-200" },
                        { id: "mixed", name: "Mixed Pastel", color: "bg-gradient-to-r from-pink-200 to-blue-200" },
                      ].map((color) => (
                        <FormItem key={color.id}>
                          <FormControl>
                            <RadioGroupItem value={color.id} className="peer sr-only" />
                          </FormControl>
                          <FormLabel className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 [&:has([data-state=checked])]:border-primary cursor-pointer transition-all">
                            <div className={`w-8 h-8 rounded-full mb-2 shadow-sm ${color.color}`} />
                            <span className="text-sm font-medium">{color.name}</span>
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
                  <FormLabel className="text-base flex items-center gap-2">
                    <Gift className="w-4 h-4" /> Wrapping Style
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 text-base">
                        <SelectValue placeholder="Select wrapping" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="kraft">Rustic Kraft Paper</SelectItem>
                      <SelectItem value="silk">Silk Ribbon & Tissue</SelectItem>
                      <SelectItem value="vase">Glass Vase (+$10)</SelectItem>
                      <SelectItem value="box">Gift Box</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Estimated Total</span>
                <span className="text-2xl font-serif font-bold text-primary">${previewPrice}.00</span>
              </div>
              <Button type="submit" size="lg" className="px-8 rounded-full font-bold shadow-lg hover:shadow-xl bg-primary hover:bg-primary/90 text-primary-foreground transition-all transform hover:-translate-y-0.5">
                Start Creation <Flower2 className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
