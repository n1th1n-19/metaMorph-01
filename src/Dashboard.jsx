import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FaQrcode, FaFilePdf, FaMicrophone, FaFileAlt, FaTools } from "react-icons/fa";
import DashboardHome from './Components/DashboardHome';
import OCR from './Components/OCR';
import QRCode from './Components/QRCode';
import FileConverter from './Components/FileConverter';
import SpeechToText from './Components/SpeechToText';
import Settings from './Components/Settings';

const NAVIGATION = [
  { kind: 'header', title: 'Main Items' },
  { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
  { segment: 'ocr', title: 'OCR (Image to Text)', icon: <FaFileAlt /> },
  { segment: 'qrcode', title: 'QR Code Generator', icon: <FaQrcode /> },
  { segment: 'file-converter', title: 'File Converter', icon: <FaFilePdf /> },
  { segment: 'speech-to-text', title: 'Speech to Text', icon: <FaMicrophone /> },
  { segment: 'settings', title: 'Settings', icon: <FaTools /> },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);
  const router = React.useMemo(() => {
    return { pathname, searchParams: new URLSearchParams(), navigate: (path) => setPathname(String(path)) };
  }, [pathname]);
  return router;
}

export default function DashboardLayoutBasic(props) {
  const { window } = props;
  const router = useDemoRouter('/dashboard');
  const demoWindow = window ? window() : undefined;

  return (
    <Router>
      <AppProvider navigation={NAVIGATION} router={router} theme={demoTheme} window={demoWindow} branding={{ title: 'MetaMorph' }}>
        <DashboardLayout>
          <PageContainer>
            <Routes>
              <Route path="/dashboard" element={<DashboardHome />} />
              <Route path="/ocr" element={<OCR />} />
              <Route path="/qrcode" element={<QRCode />} />
              <Route path="/file-converter" element={<FileConverter />} />
              <Route path="/speech-to-text" element={<SpeechToText />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </PageContainer>
        </DashboardLayout>
      </AppProvider>
    </Router>
  );
}
