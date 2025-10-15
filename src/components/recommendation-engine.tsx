'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { personalizedTourRecommendations, type PersonalizedTourRecommendationsOutput } from '@/ai/flows/personalized-tour-recommendations';
import { TourCard } from './tour-card';
import { useToast } from '@/hooks/use-toast';
import { Separator } from './ui/separator';

const recommendationFormSchema = z.object({
  interests: z.string().min(3, { message: "Please enter at least one interest (e.g., 'beaches, history')." }),
  pastTravelHistory: z.string().min(10, { message: "Please describe your travel history a bit more." }),
});

export function RecommendationEngine() {
  const [recommendations, setRecommendations] = useState<PersonalizedTourRecommendationsOutput['recommendations'] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof recommendationFormSchema>>({
    resolver: zodResolver(recommendationFormSchema),
    defaultValues: {
      interests: '',
      pastTravelHistory: '',
    },
  });

  async function onSubmit(values: z.infer<typeof recommendationFormSchema>) {
    setIsLoading(true);
    setRecommendations(null);

    try {
      const result = await personalizedTourRecommendations({
        ...values,
        numRecommendations: 3,
      });
      setRecommendations(result.recommendations);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "An error occurred.",
        description: "Failed to generate recommendations. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
      <Card className="lg:col-span-1 sticky top-24">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="text-primary" />
            AI Tour Planner
          </CardTitle>
          <CardDescription>
            Tell us about your travel style, and our AI will craft personalized tour suggestions just for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Travel Interests</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., food, hiking, museums" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pastTravelHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Past Travel History</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., 'Loved the beaches in Thailand, enjoyed the history in Rome...'" {...field} />
                    </FormControl>
                    <FormDescription>
                      The more detail, the better the recommendations!
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Get Recommendations'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="lg:col-span-2">
        <h3 className="text-2xl font-bold tracking-tight mb-4">Your Personalized Itinerary</h3>
        <Separator className="mb-8" />
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-4">
                    <div className="w-full h-48 bg-muted rounded-lg animate-pulse" />
                    <div className="w-3/4 h-6 bg-muted rounded animate-pulse" />
                    <div className="w-full h-4 bg-muted rounded animate-pulse" />
                    <div className="w-1/2 h-4 bg-muted rounded animate-pulse" />
                </div>
            ))}
          </div>
        )}
        {!isLoading && recommendations && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recommendations.map((tour, index) => (
              <TourCard
                key={index}
                image={{ id: `rec-${index}`, description: 'recommended tour', imageUrl: tour.imageUrl, imageHint: 'travel recommendation' }}
                title={tour.tourName}
                description={tour.description}
                price={tour.price}
                rating={4.5 + (Math.random() * 0.5)} // Add a mock rating
              />
            ))}
          </div>
        )}
        {!isLoading && !recommendations && (
          <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg h-96">
            <Sparkles className="w-12 h-12 text-muted-foreground mb-4" />
            <h4 className="text-lg font-semibold text-foreground">Recommendations will appear here</h4>
            <p className="text-sm text-muted-foreground">Fill out the form to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
