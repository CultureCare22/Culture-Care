
import React from 'react';
import Navigation from './Navigation/Nav';
import TherapistPortal from './pages/TherapistPortal/TherapistPortal';
import SelectClinician from './pages/SelectClinician/SelectClinician';
import PendingRequest from './pages/PendingRequest/PendingRequest';
import Confirmation from './pages/Confirmation/Confirmation';
import Ramirez from './pages/Ramirez/Ramirez';
import Tapia from './pages/Tapia/Tapia';
import Silva from './pages/Silva/Silva';
import ApprovedApt from './pages/ApprovedApt/ApprovedApt';
import DeclinedApt from './pages/DeclinedApt/DeclinedApt';
// import PersonalInfo from './pages/PersonalInfo/PersonalInfo';
// import Sidebar from './pages/Sidebar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// const Stack = createNativeStackNavigator();

function App() {
  return (
    <div className='all'>
      <Router>
        {/* <Sidebar /> */}
        <Navigation />

        <Routes>
          <Route path="/" exact element={<SelectClinician />} />
          <Route path="/pending-request" element={<TherapistPortal />} />
          <Route path="/pending-request-details" element={<PendingRequest />} />
          <Route path="/clinician-j-ramirez" element={<Ramirez />} />
          <Route path="/clinician-l-tapia" element={<Tapia />} />
          <Route path="/clinician-s-silva" element={<Silva />} />
          <Route path="/confirmation-page" element={<Confirmation />} />
          <Route path="/appt-declined" element={<DeclinedApt />} />
          <Route path="/appt-approved" element={<ApprovedApt />} />

        </Routes>

      </Router >
    </div>
  );
}

export default App;
