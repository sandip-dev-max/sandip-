import type { RefObject } from "react";
import { ProjectCardActions } from "@/components/portfolio/ProjectCardActions";
import { PROJECTS } from "@/constants/projects";

type ProjectGalleryProps = {
  galleryRef: RefObject<HTMLDivElement | null>;
};

export function ProjectGallery({ galleryRef }: ProjectGalleryProps) {
  return (
    <div
      ref={galleryRef}
      className="absolute inset-0 z-10 grid h-full grid-cols-1 grid-rows-4 gap-4 bg-black p-4 opacity-0 scale-95 pointer-events-none will-change-[opacity,transform] md:grid-cols-2 md:grid-rows-2 md:gap-6 md:p-12"
    >
      {PROJECTS.map((project) => (
        <article
          key={project.id}
          className="group relative flex min-h-0 flex-col justify-end overflow-hidden rounded-sm border border-neutral-800 p-4 md:p-6"
        >
          <div className="pointer-events-none absolute inset-0 z-0 bg-neutral-900">
            <div className="absolute -top-[10%] left-0 h-[120%] w-full">
              <img
                src={project.image}
                alt={project.imageAlt}
                className="project-img h-full w-full object-cover object-top opacity-90 transition-opacity duration-300 group-hover:opacity-100"
              />
            </div>
          </div>

          <div className="relative z-20 w-full text-white">
            <h3 className="mb-1 font-sans text-xl font-bold tracking-tight normal-case">
              {project.title}
            </h3>
            <div className="mb-3 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-widest text-neutral-400">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <ProjectCardActions
              liveUrl={project.liveUrl}
              githubUrl={project.githubUrl}
              variant="dark"
            />
          </div>
        </article>
      ))}
    </div>
  );
}
