import StudentLayout from "./components/student/studentLayout";
import StudentDashboard from './components/student/studentDashboard';
import StudentOpenings from "./components/student/studentOpenings";
import StudentJobProfile from "./components/student/studentJobProfile";
import StudentApplied from "./components/student/studentApplied";
import StudentProfile from './components/student/studentProfile';
import StudentRegister from './components/student/studentRegister';
import RecruiterLayout from './components/recruiter/recruiterLayout';
import RecruiterDashboard from './components/recruiter/recruiterDashboard';
import RecruiterOpening from './components/recruiter/recruiterOpening';
import RecruiterPosted from "./components/recruiter/recruiterPosted";
import RecruiterJobProfile from "./components/recruiter/recruiterJobProfile";
import RecruiterApplications from "./components/recruiter/recruiterApplications";
import RecruiterStudentProfile from "./components/recruiter/recruiterStudentProfile";
import RecruiterProfile from './components/recruiter/recruiterProfile';
import RecruiterRegister from './components/recruiter/recruiterRegister';
import CollegeLayout from './components/college/collegeLayout';
import CollegeRegister from "./components/college/collegeRegister";
import CollegeProfile from './components/college/collegeProfile';
import CollegeDashboard from "./components/college/collegeDashboard";
import CollegeCompanies from "./components/college/collegeCompanies";
import CollegeCompanyProfile from "./components/college/collegeCompanyProfile";
import CollegeSections from "./components/college/collegeSections";
import CollegeDrives from "./components/college/collegeDrives";
import CollegeDriveProfile from "./components/college/collegeDriveProfile";
import CollegeStudents from "./components/college/collegeStudents";
import AdminLayout from './components/admin/adminLayout';
import AdminDashboard from "./components/admin/adminDashboard";
import AdminStudents from "./components/admin/adminStudents";
import AdminRecruiters from "./components/admin/adminRecruiters";
import AdminOpenings from "./components/admin/adminOpenings";
import AdminSelected from "./components/admin/adminSelected";
import AdminProfile from './components/admin/adminProfile';
import Layout from "./components/layout";
import Login from "./components/login";
import Signup from './components/signup';
import Home from "./components/home";
import Toast from "./components/toast";
import NotFound from './components/notFound';
import UserLayout from "./components/userLayout";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Toast />
      <Routes>
        <Route path='/' element={<Layout />}>

          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path="studentRegister" element={<StudentRegister />} />
          <Route path="recruiterRegister" element={<RecruiterRegister />} />
          <Route path="collegeRegister" element={<CollegeRegister />} />

          <Route path='user/' element={<UserLayout />}>

            <Route path='student/' element={<StudentLayout />}>
              <Route index element={<StudentDashboard />} />
              <Route path='jobOpenings' element={<StudentOpenings />} />
              <Route path='jobOpenings/:id' element={<StudentJobProfile />} />
              <Route path="applied" element={<StudentApplied />} />
              <Route path="profile" element={<StudentProfile />} />
            </Route>

            <Route path="recruiter/" element={<RecruiterLayout />}>
              <Route index element={<RecruiterDashboard />} />
              <Route path="new" element={<RecruiterOpening />} />
              <Route path="posted" element={<RecruiterPosted />} />
              <Route path="posted/:id" element={<RecruiterJobProfile />} />
              <Route path="applications" element={<RecruiterApplications />} />
              <Route path="applications/:id" element={<RecruiterStudentProfile />} />
              <Route path="profile" element={<RecruiterProfile />} />
            </Route>

            <Route path="college/" element={<CollegeLayout />}>
              <Route index element={<CollegeDashboard />} />
              <Route path="companies" element={<CollegeCompanies />} />
              <Route path="companies/:id" element={<CollegeCompanyProfile />} />
              <Route path="sections" element={<CollegeSections />} />
              <Route path="sections/:course/:id" element={<CollegeStudents />} />
              <Route path="drives" element={<CollegeDrives />} />
              <Route path="drives/:id" element={<CollegeDriveProfile />} />
              <Route path="profile" element={<CollegeProfile />} />
            </Route>

            <Route path="admin/" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="students" element={<AdminStudents />} />
              <Route path="recruiters" element={<AdminRecruiters />} />
              <Route path="openings" element={<AdminOpenings />} />
              <Route path="selected" element={<AdminSelected />} />
              <Route path="profile" element={<AdminProfile />} />
            </Route>

          </Route>

          <Route path='*' element={<NotFound />} />

        </Route>
      </Routes>
    </>
  );
}

export default App;