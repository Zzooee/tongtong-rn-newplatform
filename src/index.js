import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRedirect, useRouterHistory} from 'react-router';
import {createHistory} from 'history'

import configureStore from './store/configureStore';

import App from './containers/App';
import Blank from './containers/Blank';
import Home from './containers/Home';
import Login from './containers/Login';
import AdminList from './containers/AdminModule/AdminList';
import ResourceList from './containers/AdminModule/ResourceList';
import RoleList from './containers/AdminModule/RoleList';
import OrganizationList from './containers/AdminModule/OrganizationList';
import DictionaryTypeList from './containers/AdminModule/DictionaryTypeList';
import DictionaryList from './containers/AdminModule/DictionaryList';
import SchedulerList from './containers/TaskModule/schedulerlist';
import TgroupList from './containers/TaskModule/schedulergroup';
import Ongoing from './containers/TaskModule/OngoingTask';
import level3 from './containers/Level2Module/level3'
import level32 from './containers/Level2Module/level32'
import level4 from './containers/Level2Module/level4'

//KinderHomeModule
import KidBasic from './containers/KinderHomeModule/KidBasic'
import KidHealth from './containers/KinderHomeModule/KidHealth'
import KidAttend from './containers/KinderHomeModule/KidAttend'
import KidPersonal from './containers/KinderHomeModule/KidPersonal'
import DiseasePlan from './containers/KinderHomeModule/DiseasePlan'
import NutritionIntake from './containers/KinderHomeModule/NutritionIntake'
import RecipeInfo from './containers/KinderHomeModule/RecipeInfo'
import KinderSecureFacilities from './containers/KinderHomeModule/SecureFacilities'

//ChildInfoModule
import ChildBasicInfo from './containers/ChildInfoModule/BasicInfo'
import ChildHealthProfile from './containers/ChildInfoModule/HealthProfile'
import ChildHistoryInfo from './containers/ChildInfoModule/HistoryInfo'

//DailyCheckModule
import DailyCheckAbsent from './containers/DailyCheckModule/Absent'
import DailyCheckDayCheck from './containers/DailyCheckModule/DayCheck'
import DailyCheckWatchRoom from './containers/DailyCheckModule/WatchRoom'

//KidIndexesModule
import KidIndexHealthIndex from './containers/KidIndexesModule/HealthIndex'
import KidIndexHealthControl from './containers/KidIndexesModule/HealthControl'
import KidIndexFreshCheck from './containers/KidIndexesModule/FreshCheck'
import KidIndexUploaded from './containers/KidIndexesModule/Uploaded'

//KidMotionModule
import KidEmotion from './containers/KidMotionModule/Emotion'
import KidMotion from './containers/KidMotionModule/Motion'

//WeakChildModule
import WeakChildRegForm from './containers/WeakChildModule/RegForm'
import WeakChildWeakPersonal from './containers/WeakChildModule/WeakPersonal'
import WeakChildOutList from './containers/WeakChildModule/OutList'
import WeakChildObese from './containers/WeakChildModule/Obese'

//InfectiousModule
import InfectiousPublications from './containers/InfectiousModule/Publications'
import InfectiousObservation from './containers/InfectiousModule/Observation'
import InfectiousSterilize from './containers/InfectiousModule/Sterilize'
import InfectiousVaccination from './containers/InfectiousModule/Vaccination'
import InfectiousSelfCheck from './containers/InfectiousModule/SelfCheck'

//InfectiousRegModule
import InfectiousRegister from './containers/InfectiousRegModule/Register'
import InfectiousRegTreatment from './containers/InfectiousRegModule/Treatment'

//RecipeMgtModule
import RecipeMgtResources from './containers/RecipeMgtModule/Resources'
import RecipeMgtWeekly from './containers/RecipeMgtModule/WeeklyRecipe'

//RecipeCommiteeModule
import RecipeCommiteeMeetings from './containers/RecipeCommiteeModule/Meetings'
import RecipeCommiteeHeadCount from './containers/RecipeCommiteeModule/HeadCount'

//KinderWorksModule
import KinderWorksPlan from './containers/KinderWorksModule/WorkPlan'
import KinderWorksAssess from './containers/KinderWorksModule/AssessTemplate'
import KinderWorksBacillary from './containers/KinderWorksModule/BacillaryDysentery'
import KinderWorksContest from './containers/KinderWorksModule/Contest'
import KinderWorksHealthCheck from './containers/KinderWorksModule/HealthCheck'
import KinderWorksHealthEdu from './containers/KinderWorksModule/HealthEdu'
import KinderWorksHealthWorker from './containers/KinderWorksModule/HealthWorker'
import KinderWorksKidsDiseases from './containers/KinderWorksModule/KidsDiseases'
import KinderWorksLogistics from './containers/KinderWorksModule/LogisticsMeeting'
import KinderWorksNurse from './containers/KinderWorksModule/NurseWorker'
import KinderWorksNutri from './containers/KinderWorksModule/NutriWorker'
import KinderWorksPoisons from './containers/KinderWorksModule/Poisons'
import KinderWorksProfessionism from './containers/KinderWorksModule/Professionism'
import KinderWorksTopic from './containers/KinderWorksModule/TopicResearch'
import KinderWorksPermit from './containers/KinderWorksModule/WorkPermit'
import KinderWorksSummary from './containers/KinderWorksModule/WorkSummary'

//SecuritiesModule
import SecuritiesAccidentsHandle from './containers/SecuritiesModule/AccidentsHandle'
import SecuritiesAccidentsLog from './containers/SecuritiesModule/AccidentsLog'
import SecuritiesCodeManagement from './containers/SecuritiesModule/CodeManagement'
import SecuritiesDrugs from './containers/SecuritiesModule/Drugs'
import SecuritiesEmergency from './containers/SecuritiesModule/EmergencyCode'
import SecuritiesFacilities from './containers/SecuritiesModule/Facilities'
import SecuritiesManagementWeb from './containers/SecuritiesModule/ManagementWeb'
import SecuritiesRehersals from './containers/SecuritiesModule/Rehersals'
import SecuritiesCode from './containers/SecuritiesModule/SecurityCode'
import SecuritiesTrainings from './containers/SecuritiesModule/Trainings'
import SecuritiesWeekly from './containers/SecuritiesModule/WeeklyFacilities'
import SecuritiesWorkPlan from './containers/SecuritiesModule/WorkPlan'
import SecuritiesWorkSummary from './containers/SecuritiesModule/WorkSummary'

//NoteBoardModule
import NoteBoardDownload from './containers/NoteBoardModule/DownloadFile'
import NoteBoardMonthSummary from './containers/NoteBoardModule/MonthSummary'
import NoteBoardManagement from './containers/NoteBoardModule/NoteManagement'
import NoteBoardUpload from './containers/NoteBoardModule/UploadFile'

//HealthEducationModule
import HealthEducationKinderDoctor from './containers/HealthEducationModule/KinderDoctor'
import HealthEducationDuties from './containers/HealthEducationModule/Duties'
import HealthEducationLectures from './containers/HealthEducationModule/Lectures'
import HealthEducationMeetings from './containers/HealthEducationModule/Meetings'
import HealthEducationSystem from './containers/HealthEducationModule/System'
import HealthEducationWorkCheck from './containers/HealthEducationModule/WorkCheck'
import HealthEducationWorkPlan from './containers/HealthEducationModule/WorkPlan'
import HealthEducationWorkSummary from './containers/HealthEducationModule/WorkSummary'

//StatisticsModule
import StatisticsAbsentCheck from './containers/StatisticsModule/AbsentCheck'
import StatisticsAbsentType from './containers/StatisticsModule/AbsentType'
import StatisticsAbsentVisit from './containers/StatisticsModule/AbsentVisit'
import StatisticsAgeWeight from './containers/StatisticsModule/AgeWeight'
import StatisticsAgeHeight from './containers/StatisticsModule/AgeHeight'
import StatisticsCloseReason from './containers/StatisticsModule/CloseReason'
import StatisticsDailyAbsent from './containers/StatisticsModule/DailyAbsent'
import StatisticsEyesight from './containers/StatisticsModule/Eyesight'
import StatisticsEyesightInfo from './containers/StatisticsModule/EyesightInfo'
import StatisticsFreshSummary from './containers/StatisticsModule/FreshSummary'
import StatisticsHeightWeight from './containers/StatisticsModule/HeightWeight'
import StatisticsHemoglobin from './containers/StatisticsModule/Hemoglobin'
import StatisticsHemoglobinInfo from './containers/StatisticsModule/HemoglobinInfo'
import StatisticsHWSummary from './containers/StatisticsModule/HWSummary'
import StatisticsMonthlyAbsent from './containers/StatisticsModule/MonthlyAbsent'
import StatisticsOralCheck from './containers/StatisticsModule/OralCheck'
import StatisticsSummaries from './containers/StatisticsModule/Summaries'
import StatisticsTermlyAbsent from './containers/StatisticsModule/TermlyAbsent'
import StatisticsUrineCheck from './containers/StatisticsModule/UrineCheck'
import StatisticsUrineInfo from './containers/StatisticsModule/UrineInfo'

//FoodStatsModule
import FoodStatsHeadCount from './containers/FoodStatsModule/HeadCount'
import FoodStatsAmino from './containers/FoodStatsModule/AminoStructure'
import FoodStatsAnimalProtein from './containers/FoodStatsModule/AnimalProtein'
import FoodStatsDailyCount from './containers/FoodStatsModule/DailyCount'
import FoodStatsFoodInfo from './containers/FoodStatsModule/FoodInfo'
import FoodStatsMajorNutri from './containers/FoodStatsModule/MajorNutri'
import FoodStatsMonthlyFood from './containers/FoodStatsModule/MonthlyFood'
import FoodStatsNutriSupply from './containers/FoodStatsModule/NutriSupply'
import FoodStatsProtein from './containers/FoodStatsModule/Protein'
import FoodStatsSurvey from './containers/FoodStatsModule/Survey'

//KinderStatsModule
import KinderStatsAge from './containers/KinderStatsModule/HistoryAge'
import KinderStatsBacillary from './containers/KinderStatsModule/HistoryBacillary'
import KinderStatsDisease from './containers/KinderStatsModule/HistoryDisease'
import KinderStatsEvents from './containers/KinderStatsModule/HistoryEvents'
import KinderStatsHealth from './containers/KinderStatsModule/HistoryHealth'
import KinderStatsPoison from './containers/KinderStatsModule/HistoryPoison'
import KinderStatsProf from './containers/KinderStatsModule/HistoryProf'

//KinderManagementModule
import KinderMgtStaff from './containers/KinderManagementModule/Staff'
import KinderMgtDept from './containers/KinderManagementModule/Department'

//KindergartenModule
import KindergartenInfo from './containers/KindergartenModule/KindergartenInfo';
import KindergartenClassList from './containers/KindergartenModule/KindergartenClassList';
import KinderDiseaseConfig from './containers/KindergartenModule/DiseaseConfig';
import KinderSecureConfig from './containers/KindergartenModule/SecureConfig';

//KinderMgtModule
import KindergartenList from './containers/KinderMgtModule/KindergartenList';


import {getCookie} from './common/utils/index';
import authUtils from './common/utils/auth';


const history = useRouterHistory(createHistory)({basename: ''})
const store = configureStore();

const validate = function (next, replace, callback) {
    const isLoggedIn = authUtils.getToken()

    if (!isLoggedIn && next.location.pathname != '/login') {
        replace('/login')
        localStorage.clear()
    }
    callback()
}

ReactDOM.render(
    <Provider store={store}>
        <div>
            <Router history={history}>
                <Route path="/" onEnter={validate}>
                    <IndexRedirect to="login"/>
                    <Route component={Blank}>
                        <Route path="home" component={Home}/>
                        <Route path="adminList" component={AdminList}/>
                        <Route path="resourcelist" component={ResourceList}/>
                        <Route path="rolelist" component={RoleList}/>
                        <Route path="organizationlist" component={OrganizationList}/>
                        <Route path="schedulerlist" component={SchedulerList}/>
                        <Route path="schedulergroup" component={TgroupList}/>
                        <Route path="ongoingtask" component={Ongoing}/>
                        <Route path="KindergartenInfo" component={KindergartenInfo}/>
                        <Route path="kindergartenClassList" component={KindergartenClassList}/>
                        <Route path="DiseaseConfig" component={KinderDiseaseConfig}/>
                        <Route path="SecureConfig" component={KinderSecureConfig}/>
                        <Route path="kidbasic" component={KidBasic}/>
                        <Route path="KidHealth" component={KidHealth}/>
                        <Route path="KidAttend" component={KidAttend}/>
                        <Route path="KidPersonal" component={KidPersonal}/>
                        <Route path="DiseasePlan" component={DiseasePlan}/>
                        <Route path="NutritionIntake" component={NutritionIntake}/>
                        <Route path="RecipeInfo" component={RecipeInfo}/>
                        <Route path="SecureFacilities" component={KinderSecureFacilities}/>
                    </Route>
                    <Route path="login" component={Login}/>
                    <Route path='/ChildInfo'>
                        <IndexRedirect to="BasicInfo"/>
                        <Route component={App}>
                            <Route path="BasicInfo" component={ChildBasicInfo}/>
                            <Route path="HealthProfile" component={ChildHealthProfile}/>
                            <Route path="HistoryInfo" component={ChildHistoryInfo}/>
                        </Route>
                    </Route>
                    <Route path='/DailyCheck'>
                        <IndexRedirect to="DayCheck"/>
                        <Route component={App}>
                            <Route path="DayCheck" component={DailyCheckDayCheck}/>
                            <Route path="Absent" component={DailyCheckAbsent}/>
                            <Route path="WatchRoom" component={DailyCheckWatchRoom}/>
                        </Route>
                    </Route>
                    <Route path='/KidIndexes'>
                        <IndexRedirect to="HealthIndex"/>
                        <Route component={App}>
                            <Route path="HealthIndex" component={KidIndexHealthIndex}/>
                            <Route path="HealthControl" component={KidIndexHealthControl}/>
                            <Route path="FreshCheck" component={KidIndexFreshCheck}/>
                            <Route path="Uploaded" component={KidIndexUploaded}/>
                        </Route>
                    </Route>
                    <Route path='/KidMotion'>
                        <IndexRedirect to="Emotion"/>
                        <Route component={App}>
                            <Route path="Emotion" component={KidEmotion}/>
                            <Route path="Motion" component={KidMotion}/>
                        </Route>
                    </Route>
                    <Route path='/WeakChild'>
                        <IndexRedirect to="RegForm"/>
                        <Route component={App}>
                            <Route path="RegForm" component={WeakChildRegForm}/>
                            <Route path="OutList" component={WeakChildOutList}/>
                            <Route path="Obese" component={WeakChildObese}/>
                            <Route path="WeakPersonal" component={WeakChildWeakPersonal}/>
                        </Route>
                    </Route>
                    <Route path='/Infectious'>
                        <IndexRedirect to="Publications"/>
                        <Route component={App}>
                            <Route path="Publications" component={InfectiousPublications}/>
                            <Route path="Observation" component={InfectiousObservation}/>
                            <Route path="Sterilize" component={InfectiousSterilize}/>
                            <Route path="Vaccination" component={InfectiousVaccination}/>
                            <Route path="SelfCheck" component={InfectiousSelfCheck}/>
                        </Route>
                    </Route>
                    <Route path='/InfectiousReg'>
                        <IndexRedirect to="Register"/>
                        <Route component={App}>
                            <Route path="Register" component={InfectiousRegister}/>
                            <Route path="Treatment" component={InfectiousRegTreatment}/>
                        </Route>
                    </Route>
                    <Route path='/RecipeMgt'>
                        <IndexRedirect to="Resources"/>
                        <Route component={App}>
                            <Route path="Resources" component={RecipeMgtResources}/>
                            <Route path="WeeklyRecipe" component={RecipeMgtWeekly}/>
                        </Route>
                    </Route>
                    <Route path='/RecipeCommitee'>
                        <IndexRedirect to="Meetings"/>
                        <Route component={App}>
                            <Route path="Meetings" component={RecipeCommiteeMeetings}/>
                            <Route path="HeadCount" component={RecipeCommiteeHeadCount}/>
                        </Route>
                    </Route>
                    <Route path='/KinderWorks'>
                        <IndexRedirect to="WorkPlan"/>
                        <Route component={App}>
                            <Route path="WorkPlan" component={KinderWorksPlan}/>
                            <Route path="AssessTemplate" component={KinderWorksAssess}/>
                            <Route path="BacillaryDysentery" component={KinderWorksBacillary}/>
                            <Route path="Contest" component={KinderWorksContest}/>
                            <Route path="HealthCheck" component={KinderWorksHealthCheck}/>
                            <Route path="HealthEdu" component={KinderWorksHealthEdu}/>
                            <Route path="HealthWorker" component={KinderWorksHealthWorker}/>
                            <Route path="KidsDiseases" component={KinderWorksKidsDiseases}/>
                            <Route path="LogisticsMeeting" component={KinderWorksLogistics}/>
                            <Route path="NurseWorker" component={KinderWorksNurse}/>
                            <Route path="NutriWorker" component={KinderWorksNutri}/>
                            <Route path="Poisons" component={KinderWorksPoisons}/>
                            <Route path="Professionism" component={KinderWorksProfessionism}/>
                            <Route path="TopicResearch" component={KinderWorksTopic}/>
                            <Route path="WorkPermit" component={KinderWorksPermit}/>
                            <Route path="WorkSummary" component={KinderWorksSummary}/>
                        </Route>
                    </Route>
                    <Route path='/Securities'>
                        <IndexRedirect to="ManagementWeb"/>
                        <Route component={App}>
                            <Route path="ManagementWeb" component={SecuritiesManagementWeb}/>
                            <Route path="AccidentsHandle" component={SecuritiesAccidentsHandle}/>
                            <Route path="AccidentsLog" component={SecuritiesAccidentsLog}/>
                            <Route path="CodeManagement" component={SecuritiesCodeManagement}/>
                            <Route path="Drugs" component={SecuritiesDrugs}/>
                            <Route path="EmergencyCode" component={SecuritiesEmergency}/>
                            <Route path="Facilities" component={SecuritiesFacilities}/>
                            <Route path="Rehersals" component={SecuritiesRehersals}/>
                            <Route path="SecurityCode" component={SecuritiesCode}/>
                            <Route path="Trainings" component={SecuritiesTrainings}/>
                            <Route path="WeeklyFacilities" component={SecuritiesWeekly}/>
                            <Route path="WorkPlan" component={SecuritiesWorkPlan}/>
                            <Route path="WorkSummary" component={SecuritiesWorkSummary}/>
                        </Route>
                    </Route>
                    <Route path='/NoteBoard'>
                        <IndexRedirect to="NoteManagement"/>
                        <Route component={App}>
                            <Route path="NoteManagement" component={NoteBoardManagement}/>
                            <Route path="DownloadFile" component={NoteBoardDownload}/>
                            <Route path="UploadFile" component={NoteBoardUpload}/>
                            <Route path="MonthSummary" component={NoteBoardMonthSummary}/>
                        </Route>
                    </Route>
                    <Route path='/HealthEducation'>
                        <IndexRedirect to="KinderDoctor"/>
                        <Route component={App}>
                            <Route path="KinderDoctor" component={HealthEducationKinderDoctor}/>
                            <Route path="Duties" component={HealthEducationDuties}/>
                            <Route path="Lectures" component={HealthEducationLectures}/>
                            <Route path="Meetings" component={HealthEducationMeetings}/>
                            <Route path="System" component={HealthEducationSystem}/>
                            <Route path="WorkCheck" component={HealthEducationWorkCheck}/>
                            <Route path="WorkPlan" component={HealthEducationWorkPlan}/>
                            <Route path="WorkSummary" component={HealthEducationWorkSummary}/>
                        </Route>
                    </Route>
                    <Route path="/Statistics">
                        <IndexRedirect to="Eyesight"/>
                        <Route component={App}>
                            <Route path="Eyesight" component={StatisticsEyesight}></Route>
                            <Route path="AbsentCheck" component={StatisticsAbsentCheck}></Route>
                            <Route path="AbsentType" component={StatisticsAbsentType}></Route>
                            <Route path="AbsentVisit" component={StatisticsAbsentVisit}></Route>
                            <Route path="AgeHeight" component={StatisticsAgeHeight}></Route>
                            <Route path="AgeWeight" component={StatisticsAgeWeight}></Route>
                            <Route path="CloseReason" component={StatisticsCloseReason}></Route>
                            <Route path="DailyAbsent" component={StatisticsDailyAbsent}></Route>
                            <Route path="EyesightInfo" component={StatisticsEyesightInfo}></Route>
                            <Route path="FreshSummary" component={StatisticsFreshSummary}></Route>
                            <Route path="HeightWeight" component={StatisticsHeightWeight}></Route>
                            <Route path="Hemoglobin" component={StatisticsHemoglobin}></Route>
                            <Route path="HemoglobinInfo" component={StatisticsHemoglobinInfo}></Route>
                            <Route path="HWSummary" component={StatisticsHWSummary}></Route>
                            <Route path="MonthlyAbsent" component={StatisticsMonthlyAbsent}></Route>
                            <Route path="OralCheck" component={StatisticsOralCheck}></Route>
                            <Route path="Summaries" component={StatisticsSummaries}></Route>
                            <Route path="TermlyAbsent" component={StatisticsTermlyAbsent}></Route>
                            <Route path="UrineCheck" component={StatisticsUrineCheck}></Route>
                            <Route path="UrineInfo" component={StatisticsUrineInfo}></Route>
                        </Route>
                    </Route>
                    <Route path='/FoodStats'>
                        <IndexRedirect to="HeadCount"/>
                        <Route component={App}>
                            <Route path="HeadCount" component={FoodStatsHeadCount}/>
                            <Route path="AminoStructure" component={FoodStatsAmino}/>
                            <Route path="AnimalProtein" component={FoodStatsAnimalProtein}/>
                            <Route path="DailyCount" component={FoodStatsDailyCount}/>
                            <Route path="FoodInfo" component={FoodStatsFoodInfo}/>
                            <Route path="MajorNutri" component={FoodStatsMajorNutri}/>
                            <Route path="MonthlyFood" component={FoodStatsMonthlyFood}/>
                            <Route path="NutriSupply" component={FoodStatsNutriSupply}/>
                            <Route path="Protein" component={FoodStatsProtein}/>
                            <Route path="Survey" component={FoodStatsSurvey}/>
                        </Route>
                    </Route>
                    <Route path='/KinderStats'>
                        <IndexRedirect to="HistoryEvents"/>
                        <Route component={App}>
                            <Route path="HistoryEvents" component={KinderStatsEvents}/>
                            <Route path="HistoryAge" component={KinderStatsAge}/>
                            <Route path="HistoryBacillary" component={KinderStatsBacillary}/>
                            <Route path="HistoryDisease" component={KinderStatsDisease}/>
                            <Route path="HistoryHealth" component={KinderStatsHealth}/>
                            <Route path="HistoryPoison" component={KinderStatsPoison}/>
                            <Route path="HistoryProf" component={KinderStatsProf}/>
                        </Route>
                    </Route>
                    <Route path='/KinderManagement'>
                        <IndexRedirect to="Staff"/>
                        <Route component={App}>
                            <Route path="Staff" component={KinderMgtStaff}/>
                            <Route path="Department" component={KinderMgtDept}/>
                        </Route>
                    </Route>
                    <Route path='/KindergartenManagement'>
                        <IndexRedirect to="KindergartenList"/>
                        <Route component={App}>
                            <Route path="KindergartenList" component={KindergartenList}/>
                        </Route>
                    </Route>
                    <Route path='/dictionary'>
                        <IndexRedirect to="dictionaryTypeList"/>
                        <Route component={App}>
                            <Route path="dictionaryTypeList" component={DictionaryTypeList}/>
                            <Route path="dictionaryList" component={DictionaryList}/>
                        </Route>
                    </Route>
                    <Route path='/level2'>
                        <IndexRedirect to="level4"/>
                        <Route component={App}>
                            <Route path="level4" component={level4}/>
                            <Route path="level32" component={level32}/>
                        </Route>
                    </Route>
                    <Route path='/level22'>
                        <IndexRedirect to="level3"/>
                        <Route component={App}>
                            <Route path="level3" component={level3}/>
                        </Route>
                    </Route>
                </Route>
            </Router>
        </div>
    </Provider>,
    document.getElementById('root')
);
