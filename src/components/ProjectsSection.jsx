import { ArrowDown, ExternalLink, Github } from "lucide-react";
import React from "react";

const ProjectsSection = () => {
  const projects = [
    {
      id: 1,
      title: "PortFolioPilot",
      description: "PortFolioPilot is a full-stack, AI-powered resume and portfolio builder",
      image: "/projects/WhatsApp Image 2025-08-04 at 20.22.41_18833d6d.jpg",
      tags: ["React", "TailwindCSS", "Node.js"],
      demoUrl: "https://port-folio-pilot.vercel.app//",
      githurl: "https://github.com/yadavluv2004/PortFolioPilot",
    },
    {
      id: 2,
      title: "StayNest",
      description: "A platform for finding vacation rentals.",
      image: "/projects/StayNest.jpeg",
      tags: ["React", "TailwindCSS", "Node.js"],
      demoUrl: "https://staynest-tq1y.onrender.com/listings",
      githurl: "https://github.com/yadavluv2004/StayNest",
    },
    {
      id: 3,
      title: "MeetHive",
      description: "A beautiful video conferencing app.",
      image: "/projects/MeetHive.jpeg",
      tags: ["React", "TailwindCSS", "Node.js"],
      demoUrl: "https://meethivefrontend.onrender.com",
      githurl: "https://github.com/yadavluv2004/MeetHive",
    },
  ];

  return (
    <section id="project" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured <span className="text-primary">Projects</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects. Each project was carefully
          crafted with attention to detail, performance, and user experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, key) => (
            <div
              key={key}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={project.githurl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/yadavluv2004"
          >
            Check My Github <ArrowDown size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

