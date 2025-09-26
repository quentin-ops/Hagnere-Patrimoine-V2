import { Github, Linkedin, Twitter, Award } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  certifications?: string[];
  github?: string;
  twitter?: string;
  linkedin?: string;
}

interface ExpertsSectionProps {
  heading?: string;
  subheading?: string;
  description?: string;
  members?: TeamMember[];
}

export function ExpertsSection({
  heading = "Les experts Hagnéré Patrimoine",
  description = "Une équipe d'experts certifiés à votre service pour vous accompagner dans tous vos projets patrimoniaux.",
  members = [
    {
      id: "quentin",
      name: "Quentin Hagnéré",
      role: "Fondateur & Président",
      certifications: ["CIF", "COA", "COBSP", "CARTE T"],
      avatar: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758556598517-537bd5c866cd3e3e.webp",
      linkedin: "https://linkedin.com/in/quentin-hagnere",
    },
    {
      id: "clement",
      name: "Clément Chatelain",
      role: "Directeur Groupe Hagnéré Patrimoine",
      certifications: ["CIF", "COA", "COBSP", "CARTE T"],
      avatar: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758132066596-39914bc30c1a3f7d.webp",
      linkedin: "https://www.linkedin.com/in/cl%C3%A9ment-chatelain-7b526093/",
    },
    {
      id: "victor",
      name: "Victor Baurain",
      role: "Conseiller en Gestion de Patrimoine",
      certifications: ["CIF", "COA", "COBSP", "CARTE T"],
      avatar: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758132083916-a3ace8c2b434b584.png",
      linkedin: "https://linkedin.com/in/victor-baurain",
    },
  ],
}: ExpertsSectionProps = {}) {
  return (
    <section className="from-background to-muted/20 bg-gradient-to-b py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-20 text-center">
          <h2 className="text-4xl font-semibold text-gray-900 dark:text-white lg:text-5xl mb-6">
            {heading}
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-xl leading-relaxed">
            {description}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-card border-border/50 hover:shadow-primary/10 hover:border-primary/20 group relative overflow-hidden rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="from-primary/5 absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="from-primary/20 to-primary/10 absolute inset-0 rounded-full bg-gradient-to-r blur-xl transition-all duration-300 group-hover:blur-2xl" />
                  <Avatar className="ring-background group-hover:ring-primary/20 relative size-24 shadow-lg ring-4 transition-all duration-300 lg:size-28">
                    <AvatarImage src={member.avatar} className="object-cover" />
                    <AvatarFallback className="from-primary/10 to-primary/5 bg-gradient-to-br text-xl font-semibold">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="mb-6">
                  <h3 className="group-hover:text-primary mb-2 text-xl font-bold transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-muted-foreground bg-muted/50 inline-block rounded-full px-4 py-1.5 text-sm font-medium mb-3">
                    {member.role}
                  </p>
                  {member.certifications && (
                    <div className="flex flex-wrap justify-center gap-1.5">
                      {member.certifications.map((cert) => (
                        <Badge
                          key={cert}
                          variant="secondary"
                          className="text-xs px-2 py-0.5 bg-primary/10 text-primary border-primary/20"
                        >
                          <Award className="h-3 w-3 mr-1" />
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  {member.github && (
                    <a
                      href={member.github}
                      className="bg-muted/80 hover:bg-primary/10 rounded-xl p-3 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                      aria-label={`${member.name}'s GitHub`}
                    >
                      <Github className="text-muted-foreground hover:text-primary size-5 transition-colors duration-300" />
                    </a>
                  )}
                  {member.twitter && (
                    <a
                      href={member.twitter}
                      className="bg-muted/80 hover:bg-primary/10 rounded-xl p-3 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                      aria-label={`${member.name}'s twitter`}
                    >
                      <Twitter className="text-muted-foreground hover:text-primary size-5 transition-colors duration-300" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      className="bg-muted/80 hover:bg-primary/10 rounded-xl p-3 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                      aria-label={`${member.name}'s linkedin`}
                    >
                      <Linkedin className="text-muted-foreground hover:text-primary size-5 transition-colors duration-300" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}