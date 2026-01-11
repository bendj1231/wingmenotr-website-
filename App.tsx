import React, { useState, useEffect } from 'react';
import { LoadingStage } from './types';
import { LoadingScreen } from './components/LoadingScreen';
import { Navigation } from './components/Navigation';
import { LandingPage } from './components/LandingPage';
import { Hub } from './components/Hub';
import { ProgramDetailPage } from './components/ProgramDetailPage';
import { EnrollmentPage } from './components/EnrollmentPage';
import { ShopPage } from './components/ShopPage'; 
import { LowTimerGapPage } from './components/LowTimerGapPage';
import { BlackBoxPage } from './components/BlackBoxPage'; 
import { LatestNewsPage } from './components/LatestNewsPage'; 
import { ImageEditorPage } from './components/ImageEditorPage'; 
import { OperatingHandbookPage } from './components/OperatingHandbookPage'; 
import { WingMentorTeamPage } from './components/WingMentorTeamPage'; 
import { ExaminationTerminalPage } from './components/ExaminationTerminalPage'; 
import { LoginPage } from './components/LoginPage'; 
import { WingMentorshipProgramPage } from './components/WingMentorshipProgramPage'; 
import { MailSystem } from './components/MailSystem';
import { IFRSimulatorPage } from './components/IFRSimulatorPage';
import { ConfigProvider, useConfig } from './context/ConfigContext';
import { ThemeProvider } from './context/ThemeContext';

const AppContent: React.FC = () => {
  const [stage, setStage] = useState<LoadingStage>(LoadingStage.LOGO);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVideoWarm, setIsVideoWarm] = useState(false);
  const [scrollToSection, setScrollToSection] = useState<string | null>(null);
  const { config } = useConfig();

  // Handle Startup Sequence: LOGO (2.5s) -> LOADING (3.5s) -> LANDING
  useEffect(() => {
    if (stage === LoadingStage.LOGO) {
      const timer = setTimeout(() => {
        setStage(LoadingStage.LOADING);
      }, 2500);
      return () => clearTimeout(timer);
    }
    if (stage === LoadingStage.LOADING) {
      const timer = setTimeout(() => {
        // App starts on Landing Page as requested
        setStage(LoadingStage.LANDING);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  // Reset scroll to top on every page transition
  useEffect(() => {
    if (stage !== LoadingStage.LOGO && stage !== LoadingStage.LOADING) {
      window.scrollTo(0, 0);
    }
  }, [stage]);

  const handleToggleLogin = () => setIsLoggedIn(!isLoggedIn);

  const goToLanding = () => setStage(LoadingStage.LANDING);
  const goToHub = () => setStage(LoadingStage.HUB);
  const goToProgramDetail = () => setStage(LoadingStage.PROGRAM_DETAIL);
  const goToProgramOverview = () => setStage(LoadingStage.PROGRAM_OVERVIEW);
  const goToEnrollment = () => setStage(LoadingStage.ENROLLMENT);
  const goToShop = () => setStage(LoadingStage.SHOP);
  const goToGapPage = () => setStage(LoadingStage.LOW_TIMER_GAP);
  const goToBlackBox = () => setStage(LoadingStage.BLACK_BOX);
  const goToLatestNews = () => setStage(LoadingStage.LATEST_NEWS);
  const goToDeveloperEditor = () => setStage(LoadingStage.DEVELOPER_EDITOR);
  const goToOperatingHandbook = () => setStage(LoadingStage.OPERATING_HANDBOOK);
  const goToTeamPage = () => setStage(LoadingStage.TEAM_PAGE);
  const goToExaminationTerminal = () => setStage(LoadingStage.EXAMINATION_TERMINAL);
  const goToMailSystem = () => setStage(LoadingStage.MESSAGING);
  const goToIfrSimulator = () => setStage(LoadingStage.IFR_SIMULATOR);

  const goToLandingAndScroll = (sectionId: string) => {
    setStage(LoadingStage.LANDING);
    setScrollToSection(sectionId);
  };

  const handleHubNavigation = (destination: string) => {
    const navMap: Record<string, () => void> = {
      LANDING: goToLanding,
      PROGRAM: goToProgramOverview,
      EXAMINATION: goToExaminationTerminal,
      SHOP: goToShop,
      GAP: goToGapPage,
      BLACK_BOX: goToBlackBox,
      LATEST_NEWS: goToLatestNews,
      DEVELOPER: goToDeveloperEditor,
      PASSPORT: goToOperatingHandbook,
      LOGS: goToOperatingHandbook,
      MAIL: goToMailSystem,
      LOGIN: () => setStage(LoadingStage.LOGIN),
      TOOLS: goToLanding,
      IFR: goToIfrSimulator
    };
    if (navMap[destination]) navMap[destination]();
  };

  const renderCurrentPage = () => {
    switch (stage) {
      case LoadingStage.LOGIN:
        return <LoginPage onLoginSuccess={() => { setIsLoggedIn(true); goToHub(); }} onCancel={goToHub} />;
      case LoadingStage.LANDING:
        return (
          <LandingPage 
            isVideoWarm={isVideoWarm} 
            setIsVideoWarm={setIsVideoWarm}
            onGoToProgramDetail={goToProgramOverview}
            onGoToGapPage={goToGapPage}
            onGoToOperatingHandbook={goToOperatingHandbook}
            onGoToBlackBox={goToBlackBox}
            onGoToExaminationTerminal={goToExaminationTerminal}
            scrollToSection={scrollToSection}
            onScrollComplete={() => setScrollToSection(null)}
            onGoToEnrollment={goToEnrollment} 
          />
        );
      case LoadingStage.HUB:
        return <Hub onNavigate={handleHubNavigation} />;
      case LoadingStage.MESSAGING:
        return <MailSystem onBackToHub={goToHub} />;
      case LoadingStage.PROGRAM_OVERVIEW:
        return <WingMentorshipProgramPage onBackToLanding={goToLanding} onGoToProgramDetail={goToProgramDetail} />;
      case LoadingStage.PROGRAM_DETAIL:
        return <ProgramDetailPage onBackToLanding={goToProgramOverview} onGoToEnrollment={goToEnrollment} />;
      case LoadingStage.ENROLLMENT:
        return <EnrollmentPage onBackToProgramDetail={goToProgramDetail} isLoggedIn={isLoggedIn} onLogin={handleToggleLogin} />;
      case LoadingStage.SHOP:
        return <ShopPage onBackToHub={goToHub} />;
      case LoadingStage.LOW_TIMER_GAP:
        return <LowTimerGapPage onBackToLanding={goToLanding} onGoToProgram={goToProgramOverview} isLoggedIn={isLoggedIn} />;
      case LoadingStage.BLACK_BOX:
        return <BlackBoxPage onBackToLanding={goToLanding} isLoggedIn={isLoggedIn} onLogin={handleToggleLogin} />;
      case LoadingStage.LATEST_NEWS:
        return <LatestNewsPage onBackToLanding={goToLanding} />;
      case LoadingStage.DEVELOPER_EDITOR:
        return <ImageEditorPage onBackToHub={goToHub} />;
      case LoadingStage.OPERATING_HANDBOOK:
        return <OperatingHandbookPage onBackToLanding={goToLanding} onGoToEnrollment={goToEnrollment} onGoToDeveloper={goToDeveloperEditor} />;
      case LoadingStage.TEAM_PAGE:
        return <WingMentorTeamPage onBackToLanding={goToLanding} />;
      case LoadingStage.IFR_SIMULATOR:
        return <IFRSimulatorPage onBackToLanding={goToLanding} />;
      case LoadingStage.EXAMINATION_TERMINAL:
        return (
          <ExaminationTerminalPage
            onNavigate={(dest) => dest === 'PROGRAM' ? goToProgramOverview() : goToHub()}
            onBackToHub={goToHub}
          />
        );
      default:
        return null;
    }
  };

  const isBooting = stage === LoadingStage.LOGO || stage === LoadingStage.LOADING;
  const hideNavigation = isBooting || stage === LoadingStage.LOGIN || stage === LoadingStage.HUB || stage === LoadingStage.DEVELOPER_EDITOR || stage === LoadingStage.EXAMINATION_TERMINAL || stage === LoadingStage.MESSAGING || stage === LoadingStage.IFR_SIMULATOR;

  return (
    <div className="min-h-screen overflow-x-hidden font-['Raleway'] transition-colors duration-300 bg-white dark:bg-black text-black dark:text-white">
      {isBooting ? (
        <LoadingScreen showBars={stage === LoadingStage.LOADING} />
      ) : (
        <>
          {!hideNavigation && (
            <Navigation 
              isLoggedIn={isLoggedIn} 
              toggleLogin={handleToggleLogin} 
              onGoToLanding={goToLanding}
              onGoToHub={goToHub}
              onGoToProgramDetail={goToProgramOverview}
              onGoToShop={goToShop}
              onGoToGapPage={goToGapPage}
              onGoToBlackBox={goToBlackBox} 
              onGoToLatestNews={goToLatestNews} 
              onGoToLandingAndScroll={goToLandingAndScroll}
              onGoToOperatingHandbook={goToOperatingHandbook}
              onGoToTeamPage={goToTeamPage} 
              onGoToEnrollment={goToEnrollment}
              onGoToIfrSimulator={goToIfrSimulator}
            />
          )}
          {renderCurrentPage()}
        </>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ConfigProvider>
        <AppContent />
      </ConfigProvider>
    </ThemeProvider>
  );
};

export default App;