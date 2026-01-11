import React from 'react';
import { useConfig } from '../context/ConfigContext'; // Import useConfig
import { useTheme } from '../context/ThemeContext';
import { RevealOnScroll } from './RevealOnScroll'; 

interface ProgramDetailPageProps {
  onBackToLanding: () => void;
  onGoToEnrollment: () => void;
}

export const ProgramDetailPage: React.FC<ProgramDetailPageProps> = ({ onBackToLanding, onGoToEnrollment }) => {
  const { isDarkMode } = useTheme();
  const { config } = useConfig();
  const { images } = config;

  return (
    <div 
      className={`relative min-h-screen animate-in fade-in duration-700 transition-colors bg-cover bg-center`}
      style={{ backgroundImage: `url(${images.PROGRAM_DETAIL_BG})` }}
    >
      {/* Overlay for readability */}
      <div className={`absolute inset-0 z-0 ${isDarkMode ? 'bg-black/70' : 'bg-white/70'}`}></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto pt-32 pb-16 px-6 lg:px-12">
        <RevealOnScroll className="mb-12 text-center">
            <button 
                onClick={onBackToLanding}
                className={`flex items-center mx-auto space-x-3 px-6 py-3 rounded-md uppercase tracking-widest text-sm font-bold transition-all shadow-md
                            border ${isDarkMode ? 'bg-zinc-800 text-white hover:bg-zinc-700 border-zinc-600' : 'bg-white text-zinc-800 hover:bg-zinc-100 border-zinc-300'}`}>
                <i className="fas fa-arrow-left"></i>
                <span>Back to Main Deck</span>
            </button>
        </RevealOnScroll>

        <RevealOnScroll className="text-center mb-16">
          <h1 className={`text-5xl md:text-7xl font-bold brand-font leading-tight mb-4 
                          ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
            The Wing Mentorship Program
          </h1>
          <h2 className={`text-xl md:text-3xl font-light leading-relaxed uppercase tracking-widest
                         ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            Bridging the experience gap <br /> 
            <span className="inline-flex items-center gap-x-2 align-middle mt-2">
                Low timer
                <span className="text-yellow-500 font-bold mx-1">TO</span>
                wing mentor
            </span>
          </h2>
        </RevealOnScroll>

        <div className={`space-y-16 mt-20 p-8 md:p-12 rounded-xl shadow-md transition-all duration-500 border
                        ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-white'}`}>
          
          <RevealOnScroll delay={100}>
            <h2 className={`text-3xl md:text-4xl font-bold brand-font mb-6 text-center
                           ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
              For the Aspiring Pilot
            </h2>
            <p className={`text-lg md:text-xl leading-relaxed notam-font
                           ${isDarkMode ? 'text-zinc-300' : 'text-black'}`}>
              The aviation industry often presents a paradox: demand for experience without clear pathways to obtain it, especially for newly commercial or recently graduated pilots. Many low-timer pilots struggle to find direction, facing challenges due to the scarcity of pilot-oriented internship programs. The Wing Mentorship Program is designed to directly address this critical gap, providing a structured environment for you to gain invaluable, hands-on experience and guidance.
            </p>
          </RevealOnScroll>
          
          <RevealOnScroll delay={150}>
            <h2 className={`text-3xl md:text-4xl font-bold brand-font mb-6 text-center
                           ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
              The "Big Brother" Advantage
            </h2>
            <p className={`text-lg md:text-xl leading-relaxed notam-font
                           ${isDarkMode ? 'text-zinc-300' : 'text-black'}`}>
              Wing Mentor is more than a service; it is a brotherhood. Think of us as the "Big Brother" you wish you had in aviation—someone who has already walked the path, made the mistakes, and knows exactly how to guide you through them. We offer a supportive academic environment to boost your confidence and skills before your next test flight or lesson. We are here to answer the questions you might be afraid to ask an examiner, ensuring you walk into the cockpit prepared, polished, and professional.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <h2 className={`text-3xl md:text-4xl font-bold brand-font mb-6 text-center
                           ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
              Our Unique Approach: Consultation, Not Teaching
            </h2>
            <p className={`text-lg md:text-xl leading-relaxed notam-font
                           ${isDarkMode ? 'text-zinc-300' : 'text-black'}`}>
              Unlike traditional flight schools or tutorial programs, Wing Mentorship is not a teaching organization. We do not sell courses or provide instructor-led lessons. Our sole mission is to offer peer-to-peer consultation and support. We partner with you to help assess and address specific challenges you encounter, ensuring you are thoroughly prepared for your next flight or lesson with a certified instructor. Our focus is on problem-solving and preparation, enhancing your understanding and confidence without acting as a substitute for official flight training.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={300}>
            <h2 className={`text-3xl md:text-4xl font-bold brand-font mb-6 text-center
                           ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
              How It Works: For the Mentee
            </h2>
            <div className="space-y-6">
                <p className={`text-lg md::text-xl leading-relaxed notam-font
                               ${isDarkMode ? 'text-zinc-300' : 'text-black'}`}>
                  The process begins after your lesson with an instructor from a flight school. You'll receive a grading sheet detailing areas for improvement. You then share this document with your dedicated Wing Mentor.
                </p>
                <p className={`text-lg md::text-xl leading-relaxed notam-font
                               ${isDarkMode ? 'text-zinc-300' : 'text-black'}`}>
                  Your Wing Mentor will meticulously assess the identified issues and problems. Through one-on-one interaction, they will guide you through the complexities, offering insights, strategies, and preparation tailored to your needs. This personalized approach ensures you're equipped to overcome obstacles and excel in your subsequent training.
                </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={400}>
            <h2 className={`text-3xl md:text-4xl font-bold brand-font mb-6 text-center
                           ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
              Becoming a Wing Mentor: Your Program Pathway
            </h2>
            <div className="space-y-6">
                <p className={`text-lg md:text-xl leading-relaxed notam-font
                               ${isDarkMode ? 'text-zinc-300' : 'text-black'}`}>
                  Upon enrollment as a <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>junior mentor</span>, we arrange a dedicated "support day" meeting to fully familiarize you with the Wing Mentorship program and its operational guidelines, ensuring you know how it works. We conduct a rigorous dual assessment: firstly, on your foundational aviation knowledge relevant to your pilot level (e.g., a private pilot will be assessed on private pilot information they should know); and secondly, a rigorous assessment on how you provide effective support.
                </p>
                <p className={`text-lg md:text-xl leading-relaxed notam-font
                               ${isDarkMode ? 'text-zinc-300' : 'text-black'}`}>
                  The initial <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>first 20 hours</span> of your mentorship journey are crucial. During this period, an <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Official Mentor Team Personnel</span> will be with you when you are assessing with a fellow <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>mentee</span> – the individual receiving support. (We refer to individuals seeking assistance as 'mentees' because their needs vary, from student pilots to instrument-rated pilots, and they are not 'students' in a traditional instructional sense. Similarly, new mentors are designated 'junior mentors'.) This official mentor will provide direct supervision and be available to offer help as needed, ensuring a robust and structured <span className={`${isDarkMode ? 'text-white' : 'text-black'}`}>program experience</span>.
                </p>
                <p className={`text-lg md:text-xl leading-relaxed notam-font
                               ${isDarkMode ? 'text-zinc-300' : 'text-black'}`}>
                  Therefore, throughout this supervised phase, you will be actively <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>graded on how you support mentees</span>, consulting effectively and solving problems, and adeptly address various issues. This rigorous assessment and hands-on experience are designed to cultivate <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>crucial communication and guidance skills</span>, significantly impacting your development as a mentor and propelling your future aviation career.
                </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={500}>
            <h2 className={`text-3xl md:text-4xl font-bold brand-font mb-6 text-center
                           ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
              Mentor Credibility & Accountability: The Logbook System
            </h2>
            <div className="space-y-6">
                <p className={`text-lg md:text-xl leading-relaxed notam-font
                               ${isDarkMode ? 'text-zinc-300' : 'text-black'}`}>
                  For legal reasons, Wing Mentorship operates as a support and guidance program, not a teaching organization. To maintain accountability and provide verifiable experience for our mentors, we implement a robust logbook system. Every interaction, every piece of support, is meticulously documented, including:
                </p>
                <ul className={`list-disc list-inside ml-4 space-y-2 notam-font
                               ${isDarkMode ? 'text-zinc-300' : 'text-black'}`}>
                    <li>Mentee Name and Wing Mentor</li>
                    <li>The Issue Addressed and its Description</li>
                    <li>Date, Time, and Mentee Signature</li>
                    <li>The Pilot Level of the Mentee</li>
                </ul>
                <p className={`text-lg md:text-xl leading-relaxed notam-font
                               ${isDarkMode ? 'text-zinc-300' : 'text-black'}`}>
                  This documented and verifiable log is crucial. After accumulating 20 hours of assessing and supporting multiple mentees, each mentor's logbook is reviewed and verified by our Wing Mentor team. This process ensures accountability and builds a strong, credible record of your mentorship experience.
                </p>
                <p className={`text-lg md:text-xl leading-relaxed notam-font
                               ${isDarkMode ? 'text-zinc-300' : 'text-black'}`}>
                  This verifiable experience is invaluable for your career. It serves as powerful evidence for flight school enrollment, job interviews, or applications to become a future flight instructor. You can confidently showcase your practical experience in communicating, guiding, and solving problems with diverse mentees through a closely monitored program.
                </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={600}>
            <h2 className={`text-3xl md:text-4xl font-bold brand-font mb-6 text-center
                           ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
              Qualified Mentors, Credible Guidance
            </h2>
            <p className={`text-lg md:text-xl leading-relaxed notam-font
                           ${isDarkMode ? 'text-zinc-300' : 'text-black'}`}>
              Our Wing Mentor team consists of commercially licensed pilots who also hold ground instructor certificates. This ensures that the guidance and support you receive are not only relevant but also rooted in credible, up-to-date aviation knowledge and experience. Our program is an excellent stepping stone for those aspiring to become flight instructors or future mentors themselves, helping you develop essential leadership and communication skills across multiple aviation pathways.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={700}>
            <h2 className={`text-3xl md:text-4xl font-bold brand-font mb-6 text-center
                           ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
              Tiered Support: Grow with Us
            </h2>
            <div className="space-y-6">
                <p className={`text-lg md:text-xl leading-relaxed notam-font
                               ${isDarkMode ? 'text-zinc-300' : 'text-black'}`}>
                  The Wing Mentorship Program is designed to cater to pilots across various stages of their development, from their first solo to advanced ratings. We provide tailored support for:
                </p>
                <ul className={`list-disc list-inside ml-4 space-y-2 notam-font
                               ${isDarkMode ? 'text-zinc-300' : 'text-black'}`}>
                    <li>Student Pilots</li>
                    <li>Private Pilots</li>
                    <li>Commercial Pilots</li>
                    <li>Instrument Rated Pilots</li>
                    <li>Multi-Engine Rated Pilots</li>
                    <li>Aspiring and Current Flight Instructors</li>
                </ul>
                <p className={`text-lg md:text-xl leading-relaxed notam-font
                               ${isDarkMode ? 'text-zinc-300' : 'text-black'}`}>
                  To ensure the highest quality and adherence to licensing standards, our Wing Mentors are carefully selected and can only provide guidance within their own licensed and rated pilot levels. This means:
                </p>
                <ul className={`list-disc list-inside ml-4 space-y-2 notam-font
                               ${isDarkMode ? 'text-zinc-300' : 'text-black'}`}>
                    <li><span className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Private Pilot Mentors:</span> Eligible to support Student Pilots and Private Pilots.</li>
                    <li><span className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Commercial Pilot Mentors:</span> Capable of guiding Student Pilots, Private Pilots, and Commercial Pilots.</li>
                    <li><span className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Instrument Rated (IFR) Mentors:</span> Specialized in supporting Instrument Rated Pilots.</li>
                    <li><span className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Multi-Engine Rated Mentors:</span> Provide support for Multi-Engine aspects.</li>
                    <li><span className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Flight Instructor Mentors:</span> Offer advanced insights for aspiring and current CFIs.</li>
                </ul>
                <p className={`text-lg md:text-xl leading-relaxed notam-font
                               ${isDarkMode ? 'text-zinc-300' : 'text-black'}`}>
                  Each documented log in our system specifies the mentee's pilot level, and we verify information by contacting the mentee directly, ensuring the integrity and relevance of every interaction.
                </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={800}>
            <h2 className={`text-3xl md:text-4xl font-bold brand-font mb-6 text-center
                           ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
              Enrollment & Benefits
            </h2>
            <div className="space-y-6">
                <p className={`text-lg md:text-xl leading-relaxed notam-font
                               ${isDarkMode ? 'text-zinc-300' : 'text-black'}`}>
                  Ready to bridge the gap in your aviation career and elevate your skills? Sign up below and contact our team to get started!
                </p>
                <p className={`text-lg md:text-xl leading-relaxed notam-font
                               ${isDarkMode ? 'text-zinc-300' : 'text-black'}`}>
                  Our enrollment package includes valuable Wing Mentor equipment and resources such as exclusive Wing Mentor apparel, access to specialized aviation apps, Quizlet study materials, and simulation support ideal for IFR guidance. Join a community dedicated to your success, offering unparalleled support and guidance across all areas of aviation knowledge, from student pilot through flight instructor.
                </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={900} className="mt-20 text-center">
            <button 
              onClick={onGoToEnrollment} 
              className={`px-12 py-6 rounded-full tracking-widest text-lg font-bold transition-all shadow-xl
                                bg-red-700 text-white hover:bg-red-600`}>
                Enroll now in wingmentorship program
            </button>
          </RevealOnScroll>
        </div>
      </div>
    </div>
  );
};