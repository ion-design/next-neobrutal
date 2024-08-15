
// A form component to set your profile picture, display name, email address, and country. You should be able to select if your account is public or private. The form should include a submit button and validation.


import React, { useState } from 'react';
import { User, Mail, Globe, Lock, Upload } from 'lucide-react';
import Input from './ui/Input';
import Button from './ui/Button';
import Select from './ui/Select';
import { AspectRatio } from './ui/aspect-ratio';

const ProfileForm = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [profilePicture, setProfilePicture] = useState(null);
  const [errors, setErrors] = useState({});

  const countries = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Japan'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!displayName.trim()) newErrors.displayName = 'Display name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!country) newErrors.country = 'Country is required';

    if (Object.keys(newErrors).length === 0) {
      // Submit form data
      console.log('Form submitted:', { displayName, email, country, isPublic, profilePicture });
    } else {
      setErrors(newErrors);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  return (
    <div className="w-[400px] max-w-md mx-auto mt-10 p-6 border-2 border-border dark:border-darkBorder rounded-base bg-bg dark:bg-darkBg shadow-light dark:shadow-dark">
      <h2 className="text-2xl font-heading mb-6 text-text dark:text-darkText">Profile Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <div className="w-32 h-32 mx-auto">
            <div className="relative h-full">
              {profilePicture ? (
                <img src={profilePicture} alt="Profile" className="w-full h-full object-cover rounded-full" />
              ) : (
                <div className="w-full h-full bg-main rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-text dark:text-darkText" />
                </div>
              )}
              <label htmlFor="profile-picture" className="absolute bottom-0 right-0 bg-main p-2 rounded-full cursor-pointer">
                <Upload className="w-4 h-4 text-text dark:text-darkText" />
              </label>
              <input
                id="profile-picture"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="display-name" className="block mb-2 font-base text-text dark:text-darkText">Display Name</label>
          <Input
            className="w-full"
            value={displayName}
            setValue={setDisplayName}
            placeholder="Enter your display name"
          />
          {errors.displayName && <p className="text-red-500 text-sm mt-1">{errors.displayName}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-base text-text dark:text-darkText">Email Address</label>
          <Input
            className="w-full"
            value={email}
            setValue={setEmail}
            placeholder="Enter your email address"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="country" className="block mb-2 font-base text-text dark:text-darkText">Country</label>
          <Select
            items={countries}
            onChange={(selectedCountry) => setCountry(selectedCountry)}
            value={country}
          />
          {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
        </div>
        <div className="mb-6">
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={isPublic}
                onChange={() => setIsPublic(!isPublic)}
              />
              <div className={`block w-14 h-8 rounded-full ${isPublic ? 'bg-main' : 'bg-gray-600'}`}></div>
              <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${isPublic ? 'transform translate-x-6' : ''}`}></div>
            </div>
            <div className="ml-3 text-text dark:text-darkText font-base">
              {isPublic ? 'Public Account' : 'Private Account'}
            </div>
          </label>
        </div>
        <Button
          onClick={handleSubmit}
          className="w-full justify-center"
        >
          Save Profile
        </Button>
      </form>
    </div>
  );
};

export default ProfileForm;
