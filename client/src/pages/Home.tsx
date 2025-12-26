import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, Code2, Server, Globe, Cpu } from 'lucide-react';
import Scene from '@/components/Scene';
import { Navigation } from '@/components/Navigation';
import { CyberButton } from '@/components/CyberButton';
import { CyberInput, CyberTextarea } from '@/components/CyberInput';
import { GlitchText } from '@/components/GlitchText';
import { useProjects } from '@/hooks/use-projects';
import { useSubmitContact } from '@/hooks/use-contact';
import { useToast } from '@/hooks/use-toast';
import { api } from '@shared/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { insertMessageSchema } from '@shared/schema';

// Sections
const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="container px-4 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-accent font-mono text-xl md:text-2xl mb-4 tracking-[0.2em]">SYSTEM ONLINE</h2>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-white animate-pulse">
            <GlitchText text="FULLSTACK" />
            <br />
            <span className="text-stroke-primary text-transparent bg-clip-text bg-gradient-to-r from-secondary to-purple-500">
              DEVELOPER
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg md:text-xl font-mono mb-10 leading-relaxed">
            Building immersive digital experiences at the intersection of design and technology.
            Specialized in React, Node.js, and 3D Web interfaces.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <CyberButton onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
              View Projects
            </CyberButton>
            <CyberButton variant="secondary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Contact Me
            </CyberButton>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
};

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const timeline = [
    { year: '2020', title: 'Start', desc: 'Started journey with HTML/CSS & JS' },
    { year: '2021', title: 'Frontend', desc: 'Mastered React & Modern UI Libraries' },
    { year: '2022', title: 'Backend', desc: 'Node.js, Databases & API Design' },
    { year: '2023', title: 'Fullstack', desc: 'Building complex web applications' },
    { year: '2024', title: 'Creative', desc: 'WebGL, Three.js & Creative Coding' },
  ];

  return (
    <section id="about" className="py-24 relative border-t border-white/5">
      <div className="container px-4 mx-auto">
        <motion.h2 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-display mb-16 text-white"
        >
          <span className="text-primary">01.</span> ABOUT_ME
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center" ref={ref}>
          <div className="space-y-6 text-lg text-muted-foreground font-mono leading-relaxed">
            <p>
              I am a creative developer with a passion for building digital products that look as good as they work.
              My background involves a mix of design sensibility and engineering discipline.
            </p>
            <p>
              Currently focusing on the React ecosystem and exploring the possibilities of WebGL to create
              immersive, interactive web experiences that leave a lasting impression.
            </p>
            
            <div className="pt-8 grid grid-cols-2 gap-4">
              <div className="p-4 border border-white/10 bg-white/5 rounded-lg">
                <h3 className="text-2xl font-display text-primary mb-1">5+</h3>
                <p className="text-xs uppercase tracking-wider">Years Experience</p>
              </div>
              <div className="p-4 border border-white/10 bg-white/5 rounded-lg">
                <h3 className="text-2xl font-display text-secondary mb-1">20+</h3>
                <p className="text-xs uppercase tracking-wider">Projects Completed</p>
              </div>
            </div>
          </div>

          <div className="relative border-l border-primary/20 ml-4 md:ml-0 space-y-8 pl-8 md:pl-12">
            {timeline.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-[39px] md:-left-[53px] top-1 w-3 h-3 bg-background border-2 border-primary rounded-full shadow-[0_0_10px_theme('colors.primary.DEFAULT')]" />
                <span className="text-accent font-mono text-sm">{item.year}</span>
                <h3 className="text-xl font-display text-white mt-1 mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const skills = [
    { icon: <Code2 className="w-8 h-8" />, title: "Frontend", items: ["React", "TypeScript", "Tailwind", "Next.js"] },
    { icon: <Server className="w-8 h-8" />, title: "Backend", items: ["Node.js", "PostgreSQL", "Express", "Drizzle ORM"] },
    { icon: <Globe className="w-8 h-8" />, title: "3D / Creative", items: ["Three.js", "R3F", "WebGL", "Framer Motion"] },
    { icon: <Cpu className="w-8 h-8" />, title: "DevOps", items: ["Docker", "Git", "CI/CD", "AWS"] },
  ];

  return (
    <section id="skills" className="py-24 bg-black/20 border-t border-white/5">
      <div className="container px-4 mx-auto">
        <motion.h2 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-display mb-16 text-white text-right"
        >
          <span className="text-secondary">02.</span> SKILLS_SET
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-6 border border-white/10 bg-white/5 rounded-xl hover:border-primary/50 hover:shadow-[0_0_20px_rgba(0,243,255,0.1)] transition-all group"
            >
              <div className="mb-4 text-primary group-hover:text-white transition-colors">
                {skill.icon}
              </div>
              <h3 className="text-xl font-display mb-4">{skill.title}</h3>
              <ul className="space-y-2">
                {skill.items.map((item, j) => (
                  <li key={j} className="flex items-center text-sm font-mono text-muted-foreground">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const { data: projects, isLoading } = useProjects();

  return (
    <section id="projects" className="py-24 border-t border-white/5">
      <div className="container px-4 mx-auto">
        <motion.h2 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-display mb-16 text-white"
        >
          <span className="text-accent">03.</span> SELECTED_WORKS
        </motion.h2>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-background border border-white/10 overflow-hidden"
              >
                {/* Image */}
                <div className="aspect-video overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay" />
                  
                  {/* Scanline effect */}
                  <div className="absolute inset-0 z-20 pointer-events-none opacity-20 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]" />
                  
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                </div>

                {/* Content */}
                <div className="p-6 relative z-10 bg-background">
                  <h3 className="text-2xl font-display mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack?.map((tech, j) => (
                      <span key={j} className="text-[10px] uppercase font-mono tracking-wider px-2 py-1 border border-white/20 text-muted-foreground rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex gap-4">
                    {project.demoUrl && (
                      <a 
                        href={project.demoUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center text-sm font-mono hover:text-primary transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                      </a>
                    )}
                    {project.repoUrl && (
                      <a 
                        href={project.repoUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center text-sm font-mono hover:text-white transition-colors"
                      >
                        <Github className="w-4 h-4 mr-2" /> Source
                      </a>
                    )}
                  </div>
                </div>

                {/* Neon Border on Hover */}
                <div className="absolute inset-0 border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-[inset_0_0_20px_rgba(0,243,255,0.2)]" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const Contact = () => {
  const { toast } = useToast();
  const mutation = useSubmitContact();
  const form = useForm<z.infer<typeof insertMessageSchema>>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  });

  const onSubmit = (data: z.infer<typeof insertMessageSchema>) => {
    mutation.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Message Transmitted",
          description: "Your signal has been received. I will respond shortly.",
          className: "bg-background border-primary text-primary-foreground font-mono"
        });
        form.reset();
      },
      onError: (error) => {
        toast({
          title: "Transmission Failed",
          description: error.message,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <section id="contact" className="py-24 bg-black/40 border-t border-white/5">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display mb-12 text-center text-white"
          >
            <span className="text-white">04.</span> INITIATE_CONTACT
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <p className="text-lg text-muted-foreground font-mono leading-relaxed">
                Whether you have a question, a project proposal, or just want to discuss the latest tech trends, 
                my inbox is always open.
              </p>
              
              <div className="space-y-4">
                <a href="mailto:contact@dev.system" className="flex items-center text-lg hover:text-primary transition-colors group">
                  <div className="w-10 h-10 border border-white/20 flex items-center justify-center mr-4 group-hover:border-primary group-hover:shadow-[0_0_10px_theme('colors.primary.DEFAULT')] transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  contact@dev.system
                </a>
                <a href="#" className="flex items-center text-lg hover:text-primary transition-colors group">
                  <div className="w-10 h-10 border border-white/20 flex items-center justify-center mr-4 group-hover:border-primary group-hover:shadow-[0_0_10px_theme('colors.primary.DEFAULT')] transition-all">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  /in/developer
                </a>
                <a href="#" className="flex items-center text-lg hover:text-primary transition-colors group">
                  <div className="w-10 h-10 border border-white/20 flex items-center justify-center mr-4 group-hover:border-primary group-hover:shadow-[0_0_10px_theme('colors.primary.DEFAULT')] transition-all">
                    <Github className="w-5 h-5" />
                  </div>
                  /github-profile
                </a>
              </div>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <CyberInput 
                label="Name" 
                {...form.register("name")} 
              />
              <CyberInput 
                label="Email" 
                type="email" 
                {...form.register("email")} 
              />
              <CyberTextarea 
                label="Message" 
                {...form.register("message")} 
              />
              
              <CyberButton type="submit" className="w-full" isLoading={mutation.isPending}>
                Transmit Message
              </CyberButton>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-background">
      <Scene />
      <Navigation />
      
      <main className="relative z-0">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <footer className="py-8 border-t border-white/5 text-center text-muted-foreground font-mono text-sm">
        <div className="container mx-auto px-4">
          <p>© 2024 DEV.SYSTEM // ALL RIGHTS RESERVED</p>
        </div>
      </footer>
    </div>
  );
}
