import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Their experience helped us to develop the business as a whole",
      author: "Philip Love",
      role: "Business owner",
      content: "MLab's expertise goes beyond just providing a consulting service focused on achieving revenue goals. When I started my online business, I was really looking forward to optimizing our ads with Melanie and her team. But their help went much further than that. They genuinely care about helping you reach your goals and will provide all the support you can to get there."
    },
    {
      quote: "The MLab team is fast, savvy, and truly ahead of the curve",
      author: "Amelie Williams",
      role: "Content Manager", 
      content: "Working with MLab has been transformative for our mental health platform. Their innovative approach to therapy solutions has helped us reach more people who need support, while maintaining the highest standards of care and professionalism."
    }
  ];

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-max">
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-8 bg-background border-none shadow-card hover:shadow-lg transition-all duration-300">
              <Quote className="w-8 h-8 text-accent mb-6" />
              
              <blockquote className="text-lg font-medium text-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {testimonial.content}
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                  <span className="text-accent font-semibold text-lg">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;