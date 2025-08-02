'use client';

import React, { useEffect } from 'react'
import FloatingNavbar from "@/components/floating-navbar"

export default function AboutPage() {
  useEffect(() => {
    // Load UnicornStudio script exactly as provided
    const scriptContent = `!function(){if(!window.UnicornStudio){window.UnicornStudio={isInitialized:!1};var i=document.createElement("script");i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js",i.onload=function(){window.UnicornStudio.isInitialized||(UnicornStudio.init(),window.UnicornStudio.isInitialized=!0)},(document.head || document.body).appendChild(i)}}();`;
    
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = scriptContent;
    document.head.appendChild(script);
  }, []);

  return (
    <div>
        {/* Floating Navigation */}
        <FloatingNavbar />

      {/* UnicornStudio Embed */}
      <div data-us-project="XwO5GLuAbJitfDZ8HfYy" style={{ width: '1440px', height: '900px' }}></div>
      
      {/* About Us Section */}
      <section className="bg-background py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">About HungryZhub</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connecting students through shared experiences and building vibrant campus communities
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Our Mission */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                HungryZhub is more than just a platform - it's a movement to bring students together, 
                foster meaningful connections, and make campus life more engaging and interactive. 
                We believe that the best experiences happen when students come together around shared interests.
              </p>
            </div>

            {/* What We Do */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-2xl font-bold mb-4">What We Do</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Create meaningful connections between students across campuses
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Provide a platform for sharing authentic campus experiences
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Facilitate community engagement and meaningful interactions
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Help students discover local food spots and dining experiences
                </li>
              </ul>
            </div>
          </div>

          {/* Our Values */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center mb-8">Our Core Values</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card p-6 rounded-lg border text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h4 className="text-xl font-semibold mb-3">Inclusivity</h4>
                <p className="text-muted-foreground">
                  We believe in creating a welcoming space for all students, regardless of background, 
                  culture, or experience level.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h4 className="text-xl font-semibold mb-3">Innovation</h4>
                <p className="text-muted-foreground">
                  Continuously improving our platform with cutting-edge technology to serve 
                  students better and enhance their experiences.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💝</span>
                </div>
                <h4 className="text-xl font-semibold mb-3">Community</h4>
                <p className="text-muted-foreground">
                  Strengthening connections that matter and building lasting relationships 
                  that extend beyond campus life.
                </p>
              </div>
            </div>
          </div>

          {/* Why Choose HungryZhub */}
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-8 rounded-lg">
            <h3 className="text-3xl font-bold text-center mb-8">Why Choose HungryZhub?</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">👥</span>
                </div>
                <h4 className="font-semibold mb-2">Student-Centric Design</h4>
                <p className="text-sm text-muted-foreground">
                  Built by students, for students. We understand campus life.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">🗺️</span>
                </div>
                <h4 className="font-semibold mb-2">Local Discovery</h4>
                <p className="text-sm text-muted-foreground">
                  Discover hidden gems through authentic student reviews.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">🌟</span>
                </div>
                <h4 className="font-semibold mb-2">Social Connection</h4>
                <p className="text-sm text-muted-foreground">
                  Meet like-minded students and expand your social circle.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">⚡</span>
                </div>
                <h4 className="font-semibold mb-2">Real-Time Updates</h4>
                <p className="text-sm text-muted-foreground">
                  Stay updated with campus events and food deals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}