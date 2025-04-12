// ------------------ NEXT - REACT ------------------
import React, { useEffect, useState, useRef } from 'react';

import ReactToPrint from 'react-to-print';

import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Router from 'next/router';

// ------------------ TYPESCRIPT ------------------
import { Resume } from '../../../lib/types';

// ----------------- FLOWBITE -----------------
import { Card, Flowbite, Spinner } from 'flowbite-react';

// ------------------ CUSTOM COMPS ------------------
import { Progress } from '../../../components/resumeCreator/cvBuilder/progress/Progress';

import { BuilderLayout } from '../../../components/resumeCreator/cvBuilder/layout/CvBuilderLayout';

// --------------- TABS COMPONENTS ---------------
import { TabPanel, useTabs } from 'react-headless-tabs';
import { TabSelector } from '../../../components/resumeCreator/cvBuilder/Tabs/TabSelector';

// ------------------ FORMIK ------------------
import { useFormik, FormikProvider, FieldArray } from 'formik';
import * as Yup from 'yup';

// ------------------ REDUX ------------------
import { useSelector, useDispatch } from 'react-redux';
import {
  addResume,
  selectAllResumes,
  updateResume,
} from '../../../slices/resumeActions/resumeActionSlice';

// ------------------ ICONS ------------------
import { FiTrash2 } from 'react-icons/fi';

// --------------- TEMPLATE COMPONENTS ---------------
import TemplateOne from '../../../components/resumeCreator/cvBuilder/templates/TemplateOne';
import TemplateTwo from '../../../components/resumeCreator/cvBuilder/templates/TemplateTwo';
import TemplateThree from '../../../components/resumeCreator/cvBuilder/templates/TemplateThree';

// TODO => Add placeholder for each input
// TODO => Add validation for each input
// TODO => fix bug => focus color on input
// TODO => Make a resume download section
// TODO => Make three resume templates
// TODO => Add X button
// TODO => KENDİNDEN BAHSET İNPUTU
// TODO => Hidden scroll bar

// ** => Replace color picker in template screen => download screen
// ** => Resumee preview color changable
// ** => Add dynamic progress bar
// ** => Add Projects Section
// ** => Make a resume Template section
// ** => Add Skills Section
// ** => Add Languages Section
// ** => Add Social Media Links section

const App: NextPage = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const resumes = useSelector(selectAllResumes);

  const selectedResumeArr = resumes.filter(
    (resume: Resume) => resume.id === router.query.id
  );

  const formSchema = Yup.object().shape({
    mainInfo: Yup.object().shape({
      name: Yup.string().required('Please enter your name'),
      phone: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      city: Yup.string(),
      jobTitle: Yup.string(),
    }),
    educationInfo: Yup.object().shape({
      sectionName: Yup.string(),
      schoolName: Yup.string(),
    }),
  });

  const formik = useFormik<Resume>({
    initialValues: selectedResumeArr[0],
    validationSchema: formSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      dispatch(updateResume(values));
    },
  });

  const allTabs = [
    'Basic Info',
    'Education Info',
    'Experience Info',
    'Social Media',
    'Skills&Languages',
    'Projects',
    'Template',
    'Download',
  ];
  const tabPercentRate = 100 / allTabs.length;
  const [currTab, setCurrTab] = useState(0);
  const [progress, setProgress] = useState(tabPercentRate);

  const [selectedTab, setSelectedTab] = useTabs(allTabs);

  const validator = (func: () => void) => {
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        func();
      } else {
        formik.setTouched({
          mainInfo: {
            name: true,
            email: true,
            phone: true,
          },
        });
      }
    });
  };
  
  const incrementTab = () => {
    // Control the fields before incrementing
    // If the fields are not valid, do not increment
    // If the fields are valid, increment
    if (currTab < allTabs.length - 1) {
      validator(() => {
        setCurrTab((prev) => prev + 1);
      });
    }
  };

  const decrementTab = () => {
    if (currTab > 0) {
      setCurrTab((prev) => prev - 1);
    }
  };

  useEffect(() => {
    setSelectedTab(allTabs[currTab]);
    setProgress((prev) => (currTab + 1) * tabPercentRate);
  }, [currTab]);

  let componentRef = useRef(null);

  return (
    <>
      {formik.values?.mainInfo?.name === undefined ? (
        <div className='h-full w-full flex items-center justify-center'>
          <Spinner color='warning' size='xl' />
        </div>
      ) : (
        <BuilderLayout>
          <div className='pt-10 md:pt-14 lg:pt-28 pb-3'>
            <Progress progress={progress} />
            <h1 className='text-4xl md:text-5xl lg:text-6xl my-6 md:my-9 lg:my-12 text-center font-bold font-sans'>
              Tell us a little about yourself
            </h1>

            <Card>
              <FormikProvider value={formik}>
                <form
                  className='flex-1 h-full flex flex-col justify-between min-h-[384px]'
                  onSubmit={formik.handleSubmit}
                >
                  <div className='w-full border-b-[1px] border-gray-200 flex overflow-x-hidden mb-4 flex-wrap justify-center items-center'>
                    {allTabs.map((e, index) => (
                      <TabSelector
                        key={index}
                        isActive={selectedTab === e}
                        onClick={() => {
                          validator(() => {
                            setSelectedTab(e);
                            setCurrTab(index);
                          });
                        }}
                      >
                        {e}
                      </TabSelector>
                    ))}
                  </div>
                  <TabPanel
                    className='flex-1'
                    hidden={selectedTab != 'Basic Info'}
                  >
                    <div className='flex-1 grid gap-6 md:grid-cols-2 justify-items-stretch'>
                      <div className='row-start-2 row-end-3 md:row-start-1 md:row-end-2'>
                        <label
                          className='text-md font-semibold text-gray-900'
                          htmlFor='name'
                        >
                          Full Name
                        </label>
                        <input
                          className={
                            formik.errors.mainInfo?.name &&
                            formik.touched.mainInfo?.name
                              ? 'input-error'
                              : 'input-normal'
                          }
                          id='name'
                          name='mainInfo.name'
                          type='text'
                          placeholder='John Doe'
                          onChange={formik.handleChange}
                          value={formik.values.mainInfo.name}
                        />
                        <div>
                          {formik.errors.mainInfo?.name &&
                          formik.touched.mainInfo?.name ? (
                            <p className='text-sm text-red-600'>
                              {formik.errors.mainInfo?.name}
                            </p>
                          ) : null}
                        </div>
                      </div>
                      <div className='md:row-span-2 flex items-center justify-center'>
                        <div className='flex items-center text-center cursor-pointer justify-center bg-primaryClick rounded-full h-32 w-32'>
                          <p className='text-xs text-white'>
                            Add Photo <br /> (coming soon)
                          </p>
                        </div>
                      </div>
                      <div>
                        <label
                          className='text-md font-semibold text-gray-900'
                          htmlFor='jobTitle'
                        >
                          Job Title
                        </label>
                        <input
                          className='input-normal'
                          id='jobTitle'
                          name='mainInfo.jobTitle'
                          type='text'
                          placeholder='Frontend Developer'
                          onChange={formik.handleChange}
                          value={formik.values.mainInfo.jobTitle}
                        />
                      </div>
                      <div className='grid gap-6 md:grid-cols-2'>
                        <div>
                          <label
                            className='text-md font-semibold text-gray-900'
                            htmlFor='email'
                          >
                            Email
                          </label>
                          <input
                            className={
                              formik.errors.mainInfo?.email &&
                              formik.touched.mainInfo?.email
                                ? 'input-error'
                                : 'input-normal'
                            }
                            id='email'
                            name='mainInfo.email'
                            type='text'
                            placeholder='johndoe@resumee.com'
                            onChange={formik.handleChange}
                            value={formik.values.mainInfo.email}
                          />
                          <div>
                            {formik.errors.mainInfo?.email &&
                            formik.touched.mainInfo?.email ? (
                              <p className='text-sm text-red-600'>
                                {formik.errors.mainInfo?.email}
                              </p>
                            ) : null}
                          </div>
                        </div>
                        <div>
                          <label
                            className='text-md font-semibold text-gray-900'
                            htmlFor='city'
                          >
                            City
                          </label>
                          <input
                            className='input-normal'
                            id='city'
                            name='mainInfo.city'
                            type='text'
                            placeholder='Istanbul'
                            onChange={formik.handleChange}
                            value={formik.values.mainInfo.city}
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          className='text-md font-semibold text-gray-900'
                          htmlFor='phone'
                        >
                          Phone
                        </label>
                        <input
                          className={
                            formik.errors.mainInfo?.email &&
                            formik.touched.mainInfo?.email
                              ? 'input-error'
                              : 'input-normal'
                          }
                          id='phone'
                          name='mainInfo.phone'
                          type='text'
                          placeholder='555 555 55 55'
                          onChange={formik.handleChange}
                          value={formik.values.mainInfo.phone}
                        />
                        <div>
                          {formik.errors.mainInfo?.phone &&
                          formik.touched.mainInfo?.phone ? (
                            <p className='text-sm text-red-600'>
                              {formik.errors.mainInfo?.phone}
                            </p>
                          ) : null}
                        </div>
                      </div>
                      <div className='md:justify-self-end md:col-start-2 md:col-end-3'></div>
                    </div>
                  </TabPanel>
                  <TabPanel
                    className='flex-1'
                    hidden={selectedTab != 'Education Info'}
                  >
                    <div className='flex-1 grid gap-6 md:grid-cols-2 justify-items-stretch'>
                      <div>
                        <label
                          className='text-md font-semibold text-gray-900'
                          htmlFor='schoolName'
                        >
                          School Name
                        </label>
                        <input
                          className='input-normal'
                          id='schoolName'
                          name='educationInfo.schoolName'
                          onChange={formik.handleChange}
                          value={formik.values.educationInfo?.schoolName}
                        />
                      </div>
                      <div>
                        <label
                          className='text-md font-semibold text-gray-900'
                          htmlFor='schoolCountry'
                        >
                          School Country
                        </label>
                        <input
                          className='input-normal'
                          id='schoolCountry'
                          name='educationInfo.schoolCountry'
                          onChange={formik.handleChange}
                          value={formik.values.educationInfo?.schoolCountry}
                        />
                      </div>
                      <div className='grid gap-6 md:grid-cols-3 justify-items-stretch'>
                        <p className='text-xl font-semibold col-span-3'>
                          Start Date
                        </p>
                        <div>
                          <label
                            className='text-md font-semibold text-gray-900'
                            htmlFor='schoolStartDay'
                          >
                            Day
                          </label>
                          <select
                            className='input-normal'
                            id='schoolStartDay'
                            name='educationInfo.startDate.day'
                            onChange={formik.handleChange}
                            value={formik.values.educationInfo?.startDate?.day}
                          >
                            {Array.from({ length: 31 }, (v, k) => k + 1).map(
                              (day) => (
                                <option key={day} value={day}>
                                  {day}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                        <div>
                          <label
                            className='text-md font-semibold text-gray-900'
                            htmlFor='schoolStartMonth'
                          >
                            Month
                          </label>
                          <select
                            className='input-normal'
                            id='schoolStartMonth'
                            name='educationInfo.startDate.month'
                            onChange={formik.handleChange}
                            value={
                              formik.values.educationInfo?.startDate?.month
                            }
                          >
                            {Array.from({ length: 12 }, (v, k) => k + 1).map(
                              (month) => (
                                <option key={month} value={month}>
                                  {month}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                        <div>
                          <label
                            className='text-md font-semibold text-gray-900'
                            htmlFor='schoolStartYear'
                          >
                            Year
                          </label>
                          <select
                            className='input-normal'
                            id='schoolStartYear'
                            name='educationInfo.startDate.year'
                            onChange={formik.handleChange}
                            value={formik.values.educationInfo?.startDate?.year}
                          >
                            {Array.from({ length: 50 }, (v, k) => k + 1980).map(
                              (year) => (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </div>
                      <div className='grid gap-6 md:grid-cols-3 justify-items-stretch mb-3 md:mb-0'>
                        <p className='text-xl font-semibold col-span-3'>
                          End Date
                        </p>
                        <div>
                          <label
                            className='text-md font-semibold text-gray-900'
                            htmlFor='schoolEndDay'
                          >
                            Day
                          </label>
                          <select
                            className='input-normal'
                            id='schoolEndDay'
                            name='educationInfo.endDate.day'
                            onChange={formik.handleChange}
                            value={formik.values.educationInfo?.endDate?.day}
                          >
                            {Array.from({ length: 31 }, (v, k) => k + 1).map(
                              (day) => (
                                <option key={day} value={day}>
                                  {day}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                        <div>
                          <label
                            className='text-md font-semibold text-gray-900'
                            htmlFor='schoolEndMonth'
                          >
                            Month
                          </label>
                          <select
                            className='input-normal'
                            id='schoolEndMonth'
                            name='educationInfo.endDate.month'
                            onChange={formik.handleChange}
                            value={formik.values.educationInfo?.endDate?.month}
                          >
                            {Array.from({ length: 12 }, (v, k) => k + 1).map(
                              (month) => (
                                <option key={month} value={month}>
                                  {month}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                        <div>
                          <label
                            className='text-md font-semibold text-gray-900'
                            htmlFor='schoolEndYear'
                          >
                            Year
                          </label>
                          <select
                            className='input-normal'
                            id='schoolEndYear'
                            name='educationInfo.endDate.year'
                            onChange={formik.handleChange}
                            value={formik.values.educationInfo?.endDate?.year}
                          >
                            {Array.from({ length: 50 }, (v, k) => k + 1980).map(
                              (year) => (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel
                    className='flex-1'
                    hidden={selectedTab != 'Experience Info'}
                  >
                    <div className='flex-1 grid gap-6 md:grid-cols-2 justify-items-stretch'>
                      <div>
                        <label
                          className='text-md font-semibold text-gray-900'
                          htmlFor='schoolName'
                        >
                          Company Name
                        </label>
                        <input
                          className='input-normal'
                          id='companyName'
                          name='ExperienceInfo.companyName'
                          onChange={formik.handleChange}
                          value={formik.values.ExperienceInfo?.companyName}
                        />
                      </div>
                      <div>
                        <label
                          className='text-md font-semibold text-gray-900'
                          htmlFor='experiencePosition'
                        >
                          Job Position
                        </label>
                        <input
                          className='input-normal'
                          id='experiencePosition'
                          name='ExperienceInfo.position'
                          onChange={formik.handleChange}
                          value={formik.values.ExperienceInfo?.position}
                        />
                      </div>
                      <div className='grid gap-6 md:grid-cols-3 justify-items-stretch'>
                        <p className='text-xl font-semibold col-span-3'>
                          Start Date
                        </p>
                        <div>
                          <label
                            className='text-md font-semibold text-gray-900'
                            htmlFor='jobStartDay'
                          >
                            Day
                          </label>
                          <select
                            className='input-normal'
                            id='jobStartDay'
                            name='ExperienceInfo.startDate.day'
                            onChange={formik.handleChange}
                            value={formik.values.ExperienceInfo?.startDate?.day}
                          >
                            {Array.from({ length: 31 }, (v, k) => k + 1).map(
                              (day) => (
                                <option key={day} value={day}>
                                  {day}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                        <div>
                          <label
                            className='text-md font-semibold text-gray-900'
                            htmlFor='jobStartMonth'
                          >
                            Month
                          </label>
                          <select
                            className='input-normal'
                            id='jobStartMonth'
                            name='ExperienceInfo.startDate.month'
                            onChange={formik.handleChange}
                            value={
                              formik.values.ExperienceInfo?.startDate?.month
                            }
                          >
                            {Array.from({ length: 12 }, (v, k) => k + 1).map(
                              (month) => (
                                <option key={month} value={month}>
                                  {month}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                        <div>
                          <label
                            className='text-md font-semibold text-gray-900'
                            htmlFor='jobStartYear'
                          >
                            Year
                          </label>
                          <select
                            className='input-normal'
                            id='jobStartYear'
                            name='ExperienceInfo.startDate.year'
                            onChange={formik.handleChange}
                            value={
                              formik.values.ExperienceInfo?.startDate?.year
                            }
                          >
                            {Array.from({ length: 50 }, (v, k) => k + 1980).map(
                              (year) => (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </div>
                      <div className='grid gap-6 md:grid-cols-3 justify-items-stretch mb-3 md:mb-0'>
                        <p className='text-xl font-semibold col-span-3'>
                          End Date
                        </p>
                        <div>
                          <label
                            className='text-md font-semibold text-gray-900'
                            htmlFor='jobEndDay'
                          >
                            Day
                          </label>
                          <select
                            className='input-normal'
                            id='jobEndDay'
                            name='ExperienceInfo.endDate.day'
                            onChange={formik.handleChange}
                            value={formik.values.ExperienceInfo?.endDate?.day}
                          >
                            {Array.from({ length: 31 }, (v, k) => k + 1).map(
                              (day) => (
                                <option key={day} value={day}>
                                  {day}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                        <div>
                          <label
                            className='text-md font-semibold text-gray-900'
                            htmlFor='jobEndMonth'
                          >
                            Month
                          </label>
                          <select
                            className='input-normal'
                            id='jobEndMonth'
                            name='ExperienceInfo.endDate.month'
                            onChange={formik.handleChange}
                            value={formik.values.ExperienceInfo?.endDate?.month}
                          >
                            {Array.from({ length: 12 }, (v, k) => k + 1).map(
                              (month) => (
                                <option key={month} value={month}>
                                  {month}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                        <div>
                          <label
                            className='text-md font-semibold text-gray-900'
                            htmlFor='jobEndYear'
                          >
                            Year
                          </label>
                          <select
                            className='input-normal'
                            id='jobEndYear'
                            name='ExperienceInfo.endDate.year'
                            onChange={formik.handleChange}
                            value={formik.values.ExperienceInfo?.endDate?.year}
                          >
                            {Array.from({ length: 50 }, (v, k) => k + 1980).map(
                              (year) => (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </div>
                      <div className='md:col-span-2 justify-items-stretch mb-3'>
                        <label
                          htmlFor='jobDesc'
                          className='text-md font-semibold text-gray-900'
                        >
                          Job Description
                        </label>
                        <textarea
                          className='input-normal'
                          id='jobDesc'
                          name='ExperienceInfo.jobDescription'
                          onChange={formik.handleChange}
                          value={formik.values.ExperienceInfo?.jobDescription}
                        />
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel
                    className='flex-1'
                    hidden={selectedTab != 'Social Media'}
                  >
                    <FieldArray
                      name='mainInfo.links'
                      render={(arrayHelpers) => (
                        <div>
                          {formik.values.mainInfo.links.map((link, index) => (
                            <div
                              className='grid sm:grid-cols-5 md:grid-cols-9 gap-6 mb-6'
                              key={index}
                            >
                              <div className='sm:col-span-2 md:col-span-4'>
                                <label
                                  className='text-md font-semibold text-gray-900'
                                  htmlFor={`linkName${index}`}
                                >
                                  Link Name
                                </label>
                                <input
                                  className='input-normal'
                                  id={`linkName${index}`}
                                  name={`mainInfo.links[${index}].name`}
                                  onChange={formik.handleChange}
                                  value={
                                    formik.values.mainInfo.links[index].name
                                  }
                                  type='text'
                                />
                              </div>
                              <div className='sm:col-span-2 md:col-span-4'>
                                <label
                                  className='text-md font-semibold text-gray-900'
                                  htmlFor={`linkUrl${index}`}
                                >
                                  Link Url
                                </label>
                                <input
                                  className='input-normal'
                                  id={`linkUrl${index}`}
                                  name={`mainInfo.links[${index}].url`}
                                  onChange={formik.handleChange}
                                  value={
                                    formik.values.mainInfo.links[index].url
                                  }
                                  type='text'
                                />
                              </div>
                              <button
                                className='bg-red-600 h-[42px] w-full sm:w-12 hover:bg-red-700 active:bg-red-800 rounded-md flex items-center justify-center self-end justify-self-center'
                                type='button'
                                disabled={
                                  formik.values.mainInfo.links.length < 2
                                }
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                <FiTrash2 stroke='#fff' size={24} />
                              </button>
                            </div>
                          ))}
                          <button
                            className='secondary-btn mb-4'
                            type='button'
                            onClick={() => {
                              arrayHelpers.push({ name: '', url: '' });
                            }}
                          >
                            EKLE
                          </button>
                        </div>
                      )}
                    />
                  </TabPanel>
                  <TabPanel
                    className='flex-1'
                    hidden={selectedTab != 'Skills&Languages'}
                  >
                    <div className='flex-1 grid gap-6 md:grid-cols-2 justify-items-stretch'>
                      <FieldArray
                        name='Skills.skills'
                        render={(arrayHelpers) => (
                          <div>
                            <p className='text-2xl font-semibold text-gray-900 mb-3'>
                              Skills
                            </p>
                            {formik.values.Skills?.skills.map(
                              (skill, index) => (
                                <div
                                  className='grid sm:grid-cols-5 md:grid-cols-9 gap-6 mb-6'
                                  key={index}
                                >
                                  <div className='sm:col-span-2 md:col-span-4'>
                                    <label
                                      className='text-md font-semibold text-gray-900'
                                      htmlFor={`skillName${index}`}
                                    >
                                      Skill Name
                                    </label>
                                    <input
                                      className='input-normal'
                                      id={`skillName${index}`}
                                      name={`Skills.skills[${index}].skillName`}
                                      onChange={formik.handleChange}
                                      value={
                                        formik.values.Skills?.skills[index]
                                          .skillName
                                      }
                                      type='text'
                                    />
                                  </div>
                                  <div className='sm:col-span-2 md:col-span-4'>
                                    <label
                                      className='text-md font-semibold text-gray-900'
                                      htmlFor={`skillLevel${index}`}
                                    >
                                      Skill Level
                                    </label>
                                    <select
                                      className='input-normal'
                                      id={`skillLevel${index}`}
                                      name={`Skills.skills[${index}].skillLevel`}
                                      onChange={formik.handleChange}
                                      value={
                                        formik.values.Skills?.skills[index]
                                          .skillLevel
                                      }
                                    >
                                      <option value='-'>
                                        I don&apos;t want to choose
                                      </option>
                                      <option value='1'>Beginner</option>
                                      <option value='2'>Intermediate</option>
                                      <option value='3'>Advanced</option>
                                      <option value='4'>Expert</option>
                                    </select>
                                  </div>
                                  <button
                                    className='bg-red-600 h-[42px] w-full sm:w-12 hover:bg-red-700 active:bg-red-800 rounded-md flex items-center justify-center self-end justify-self-center'
                                    type='button'
                                    disabled={
                                      formik.values.Skills?.skills.length < 2
                                    }
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    <FiTrash2 stroke='#fff' size={24} />
                                  </button>
                                </div>
                              )
                            )}
                            <button
                              className='secondary-btn mb-4'
                              type='button'
                              onClick={() => {
                                arrayHelpers.push({
                                  skillName: '',
                                  SkillLevel: '',
                                });
                              }}
                            >
                              EKLE
                            </button>
                          </div>
                        )}
                      />
                      <FieldArray
                        name='Languages.languages'
                        render={(arrayHelpers) => (
                          <div>
                            <p className='text-2xl font-semibold text-gray-900 mb-3'>
                              Languages
                            </p>
                            {formik.values.Languages.languages.map(
                              (link, index) => (
                                <div
                                  className='grid sm:grid-cols-5 md:grid-cols-9 gap-6 mb-6'
                                  key={index}
                                >
                                  <div className='sm:col-span-2 md:col-span-4'>
                                    <label
                                      className='text-md font-semibold text-gray-900'
                                      htmlFor={`languageName${index}`}
                                    >
                                      Language Name
                                    </label>
                                    <input
                                      className='input-normal'
                                      id={`languageName${index}`}
                                      name={`Languages.languages[${index}].languageName`}
                                      onChange={formik.handleChange}
                                      value={
                                        formik.values.Languages.languages[index]
                                          .languageName
                                      }
                                      type='text'
                                    />
                                  </div>
                                  <div className='sm:col-span-2 md:col-span-4'>
                                    <label
                                      className='text-md font-semibold text-gray-900'
                                      htmlFor={`langLevel${index}`}
                                    >
                                      Language Level
                                    </label>
                                    <select
                                      className='input-normal'
                                      id={`langLevel${index}`}
                                      name={`Languages.languages[${index}].languageLevel`}
                                      onChange={formik.handleChange}
                                      value={
                                        formik.values.Languages.languages[index]
                                          .languageLevel
                                      }
                                    >
                                      <option value='-'>
                                        I don&apos;t want to choose
                                      </option>
                                      <option value='1'>Beginner</option>
                                      <option value='2'>Intermediate</option>
                                      <option value='3'>Advanced</option>
                                      <option value='4'>Native</option>
                                    </select>
                                  </div>
                                  <button
                                    className='bg-red-600 h-[42px] w-full sm:w-12 hover:bg-red-700 active:bg-red-800 rounded-md flex items-center justify-center self-end justify-self-center'
                                    type='button'
                                    disabled={
                                      formik.values.Languages.languages.length <
                                      2
                                    }
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    <FiTrash2 stroke='#fff' size={24} />
                                  </button>
                                </div>
                              )
                            )}
                            <button
                              className='secondary-btn mb-4'
                              type='button'
                              onClick={() => {
                                arrayHelpers.push({
                                  languageName: '',
                                  languageLevel: '',
                                });
                              }}
                            >
                              EKLE
                            </button>
                          </div>
                        )}
                      />
                    </div>
                  </TabPanel>
                  <TabPanel
                    className='flex-1'
                    hidden={selectedTab != 'Projects'}
                  >
                    <div className='flex-1'>
                      <FieldArray
                        name='Projects.projects'
                        render={(arrayHelpers) => (
                          <div>
                            {formik.values.Projects.projects.map(
                              (project, index) => (
                                <div
                                  className='grid sm:grid-cols-5 md:grid-cols-9 gap-6 mb-6'
                                  key={index}
                                >
                                  <div className='sm:col-span-2 md:col-span-4'>
                                    <label
                                      className='text-md font-semibold text-gray-900'
                                      htmlFor={`projectName${index}`}
                                    >
                                      Project Name
                                    </label>
                                    <input
                                      className='input-normal'
                                      id={`projectName${index}`}
                                      name={`Projects.projects[${index}].projectName`}
                                      onChange={formik.handleChange}
                                      value={
                                        formik.values.Projects.projects[index]
                                          .projectName
                                      }
                                      type='text'
                                    />
                                  </div>
                                  <div className='sm:col-span-2 md:col-span-4'>
                                    <label
                                      className='text-md font-semibold text-gray-900'
                                      htmlFor={`projectLink${index}`}
                                    >
                                      Project Link
                                    </label>
                                    <input
                                      className='input-normal'
                                      id={`projectLink${index}`}
                                      name={`Projects.projects[${index}].projectLink`}
                                      onChange={formik.handleChange}
                                      value={
                                        formik.values.Projects.projects[index]
                                          .projectLink
                                      }
                                      type='text'
                                    />
                                  </div>
                                  <button
                                    className='bg-red-600 h-[42px] w-full sm:w-12 hover:bg-red-700 active:bg-red-800 rounded-md flex items-center justify-center self-end justify-self-center'
                                    type='button'
                                    disabled={
                                      formik.values.Projects.projects.length < 2
                                    }
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    <FiTrash2 stroke='#fff' size={24} />
                                  </button>
                                  <div className='sm:col-span-2 md:col-span-9'>
                                    <label
                                      className='text-md font-semibold text-gray-900'
                                      htmlFor={`projectDescription${index}`}
                                    >
                                      Project Description
                                    </label>
                                    <textarea
                                      className='input-normal'
                                      id={`projectDescription${index}`}
                                      name={`Projects.projects[${index}].projectDescription`}
                                      onChange={formik.handleChange}
                                      value={
                                        formik.values.Projects.projects[index]
                                          .projectDescription
                                      }
                                    />
                                  </div>
                                </div>
                              )
                            )}
                            <button
                              className='secondary-btn mb-4'
                              type='button'
                              onClick={() => {
                                console.log('hello world');
                                arrayHelpers.push({
                                  projectName: '',
                                  projectDescription: '',
                                  projectLink: '',
                                });
                              }}
                            >
                              EKLE
                            </button>
                          </div>
                        )}
                      />
                    </div>
                  </TabPanel>
                  <TabPanel
                    className='flex-1'
                    hidden={selectedTab != 'Template'}
                  >
                    <p className='text-2xl mb-3 col-span-3 font-semibold text-gray-900'>
                      Select Your Resume Template
                    </p>
                    <div className='flex-1 flex flex-col md:flex-row items-start justify-center gap-4 '>
                      {[
                        {
                          templateName: 'Template 1',
                          templateTitle: 'Clear and Simple',
                          templateDescription:
                            "If you want to keep it simple, this is the template for you. It's clean and easy to read.",
                        },
                        {
                          templateName: 'Template 2',
                          templateTitle: 'Modern and Minimalist',
                          templateDescription:
                            'If you want a modern and minimalist resume, this is the template for you.',
                        },
                      ].map((template, index) => (
                        <label
                          key={index}
                          htmlFor={`templateType${index}`}
                          className='text-md font-semibold text-gray-900 rounded-lg cursor-pointer mb-4'
                        >
                          <input
                            type='radio'
                            className='hidden rounded-lg'
                            name='Templates.templateName'
                            id={`templateType${index}`}
                            value={template.templateName}
                            onChange={formik.handleChange}
                          />
                          <Card>
                            <div className='flex items-center justify-center flex-col h-24 max-h-36'>
                              <h2 className='text-gray-900 mb-2 text-xl'>
                                {template.templateTitle}
                              </h2>
                              <p className='text-gray-700 font-light text-sm'>
                                {template.templateDescription}
                              </p>
                            </div>
                          </Card>
                        </label>
                      ))}
                    </div>
                  </TabPanel>
                  <TabPanel
                    className='flex-1'
                    hidden={selectedTab != 'Download'}
                  >
                    <div className='flex-1'>
                      <div className='p-4 mb-4 flex items-center justify-center flex-col'>
                        <div className='flex items-center justify-center h-12 gap-6'>
                          {[
                            { color: 'red', bgColor: 'bg-red-500' },
                            { color: 'blue', bgColor: 'bg-blue-500' },
                            {
                              color: 'green',
                              bgColor: 'bg-green-500',
                            },
                            {
                              color: 'orange',
                              bgColor: 'bg-orange-500',
                            },
                            {
                              color: 'teal',
                              bgColor: 'bg-teal-500',
                            },
                            {
                              color: 'yellow',
                              bgColor: 'bg-yellow-500',
                            },
                            {
                              color: 'purple',
                              bgColor: 'bg-purple-500',
                            },
                          ].map((theme, index) => (
                            <button
                              type='submit'
                              key={index}
                              onClick={() => {
                                formik.setFieldValue(
                                  'Templates.templateColor',
                                  theme.color
                                );
                              }}
                              className={`h-8 w-8 border-spacing-5 flex items-center justify-center ${
                                formik.values.Templates.templateColor ===
                                theme.color
                                  ? 'border-2 border-primary rounded-full'
                                  : 'rounded-full'
                              }`}
                            >
                              <div
                                className={`${theme.bgColor} p-3 rounded-full`}
                              ></div>
                            </button>
                          ))}
                        </div>
                        <ReactToPrint
                          trigger={() => (
                            <button className='primary-btn my-3' type='button'>
                              DOWNLOAD
                            </button>
                          )}
                          content={() => componentRef.current}
                          pageStyle='@page { size: A3 }'
                        />
                        <div
                          ref={(el: any) => (componentRef.current = el)}
                          className='w-full '
                        >
                          {formik.values.Templates.templateName ===
                          'Template 1' ? (
                            <TemplateOne data={formik.values} />
                          ) : formik.values.Templates.templateName ===
                            'Template 2' ? (
                            <TemplateTwo data={formik.values} />
                          ) : formik.values.Templates.templateName ===
                            'Template 3' ? (
                            <TemplateThree data={formik.values} />
                          ) : (
                            <TemplateOne data={formik.values} />
                          )}
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                  <div className='flex items-center justify-between'>
                    {selectedTab !== 'Basic Info' ? (
                      <button
                        type='button'
                        className='secondary-btn hidden md:inline-block w-full p-5 md:w-auto'
                        onClick={() => {
                          selectedTab === 'Basic Info'
                            ? Router.push('/app/dashboard')
                            : decrementTab();
                        }}
                      >
                        Back
                      </button>
                    ) : (
                      <div></div>
                    )}
                    {selectedTab !== 'Download' ? (
                      <button
                        type='submit'
                        className='primary-btn w-full p-5 md:w-auto '
                        onClick={() => {
                          incrementTab();
                          formik.dirty && formik.isValid
                            ? () => Router.push('/app/dashboard')
                            : () => console.log('not ready');
                        }}
                      >
                        Next
                      </button>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </form>
              </FormikProvider>
            </Card>
          </div>
        </BuilderLayout>
      )}
    </>
  );
};

export default App;
