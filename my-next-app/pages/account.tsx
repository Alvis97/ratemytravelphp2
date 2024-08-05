
// components/UserProfile.tsx
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import UpdatePassword from '../components/UpdatePasswordForm';
import DeleteAccountButton from '../components/DeleteAccountButton';
import UserComments from '../components/UserComment';
import UserPosts from '../components/UserPosts';

//Styles
import accountStyles from '../styles/pages/account.module.scss';
import formStyle from '../styles/pages/forms.module.scss';


interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  pronounce: string;
  Image: string;
}

interface Errors {
  firstName?: string;
  lastName?: string;
  age?: string;
  gender?: string;
  pronounce?: string;
  email?: string;
  form?: string;
}

const Account = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const { data: session, status } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    pronounce: '',
    email: '',
    avatar: '',
  });

  const [selectedAvatar, setSelectedAvatar] = useState<string>('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/fetchUser');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data: User = await response.json();
        setUser(data);
        setFormData({
          id: data.id,
          firstName: data.firstName,
          lastName: data.lastName,
          age: data.age.toString(),
          gender: data.gender,
          pronounce: data.pronounce,
          email: data.email,
          avatar: data.Image,
        });
        setSelectedAvatar(data.Image);
      } catch (error) {
        if (error instanceof Error) setError(error.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const avatar = e.target.value;
    setSelectedAvatar(avatar);
    setFormData((prevData) => ({
      ...prevData,
      avatar,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Example validation (you can customize this)
    const validationErrors: Errors = {};
    if (!formData.firstName) validationErrors.firstName = 'First name is required';
    if (!formData.lastName) validationErrors.lastName = 'Last name is required';
    if (!formData.age || isNaN(Number(formData.age))) validationErrors.age = 'Valid age is required';
    if (!formData.email) validationErrors.email = 'Email is required';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch('/api/updateUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          id: formData.id, // Include the ID in the payload
          email: formData.email,
          firstName: formData.firstName, // Use the field names as per your API
          lastName: formData.lastName,
          age: parseInt(formData.age, 10), // Convert age to number
          gender: formData.gender,
          pronounce: formData.pronounce,
          Image: formData.avatar, // Assuming `avatar` is being used as `Image` in API
       // Ensure age is sent as a number
        }),
      });

      if (response.ok) {
        setShowModal(false);
        // Handle successful update (e.g., show a success message or refresh data)
      } else {
        throw new Error('Update user failed');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      setErrors({ ...errors, form: 'An unexpected error occurred. Please try again' });
    }
  };

  useEffect(() => {
    // Redirect to login page if the session is not available
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Return null or a loading indicator while redirecting
  if (status === 'loading' || status === 'unauthenticated') {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <div className={accountStyles.parent}>
      <h1 className={accountStyles.h1}>User Profile:</h1>
      <div className={accountStyles.sibling}> 
        <div className={accountStyles.section1}>
            <div>
              <img className={accountStyles.s1Image} src={`/images/${formData.avatar}`} alt="Profile" />
            </div>
            <div className={accountStyles.Child2}>
            <p className={accountStyles.p}><strong className={accountStyles.strong}>ID:</strong> {formData.id}</p>
            <p className={accountStyles.p}><strong className={accountStyles.strong}>Email:</strong> {formData.email}</p>
            <p className={accountStyles.p}><strong className={accountStyles.strong}>First Name:</strong> {formData.firstName}</p>
            <p className={accountStyles.p}><strong className={accountStyles.strong}>Last Name:</strong> {formData.lastName}</p>
            <p className={accountStyles.p}><strong className={accountStyles.strong}>Age:</strong> {formData.age}</p>
            <p className={accountStyles.p}><strong className={accountStyles.strong}>Gender:</strong> {formData.gender}</p>
            <p className={accountStyles.p}><strong className={accountStyles.strong}>Pronouns:</strong> {formData.pronounce}</p>
            <button
             className={accountStyles.CFAButton}
             onClick={() => setShowModal(true)}>
              Update user
            </button>
          </div>
        </div>

        {showModal && (
          <div className={accountStyles.modal}>
            <div className={accountStyles.modalContent}>
              <button
                className={accountStyles.closeButton}
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
              <form onSubmit={handleSubmit}> 
                <div className={accountStyles.fetchArea2}>
                <input
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    placeholder="id"
                  />
                  <br />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                  />
                  <br />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                  />
                  <br />
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Age"
                  />
                  <br />
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={accountStyles.select2}
                  >
                    <option value="">Gender</option>
                    <option value="Cis Woman">Cis Woman</option>
                    <option value="Transgender (MF)">Transgender (MF)</option>
                    <option value="Transgender (FM)">Transgender (FM)</option>
                    <option value="Queer">Queer</option>
                    <option value="Non binary">Non binary</option>
                    <option value="Other">Other</option>
                  </select>
                  <select
                    name="pronounce"
                    value={formData.pronounce}
                    onChange={handleChange}
                    className={accountStyles.select2}
                  >
                    <option value="">Pronounce</option>
                    <option value="She/Her">She/Her</option>
                    <option value="He/Him">He/Him</option>
                    <option value="They/Them">They/Them</option>
                    <option value="Zir/Zer">Zir/Zer</option>
                  </select>
                  <br />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                  <br />

                  <label className={accountStyles.avatarP} htmlFor="avatar">
                    Choose an Avatar
                  </label>
                  <br />
                  <div className={formStyle.avatarDiv}>
                    <label className={formStyle.avatarLabel}>
                      <input
                        type="radio"
                        name="avatar"
                        value="avatar1.jpg"
                        checked={selectedAvatar === 'avatar1.jpg'}
                        onChange={handleAvatarChange}
                      />
                      <img src="/images/avatar1.jpg" alt="Avatar 1" />
                    </label>
                    <label className={formStyle.avatarLabel}>
                      <input
                        type="radio"
                        name="avatar"
                        value="avatar2.jpg"
                        checked={selectedAvatar === 'avatar2.jpg'}
                        onChange={handleAvatarChange}
                      />
                      <img src="/images/avatar2.jpg" alt="Avatar 2" />
                    </label>
                    <label className={formStyle.avatarLabel}>
                      <input
                        type="radio"
                        name="avatar"
                        value="avatar3.jpg"
                        checked={selectedAvatar === 'avatar3.jpg'}
                        onChange={handleAvatarChange}
                      />
                      <img src="/images/avatar3.jpg" alt="Avatar 3" />
                    </label>
                    <label className={formStyle.avatarLabel}>
                      <input
                        type="radio"
                        name="avatar"
                        value="avatar4.jpg"
                        checked={selectedAvatar === 'avatar4.jpg'}
                        onChange={handleAvatarChange}
                      />
                      <img src="/images/avatar4.jpg" alt="Avatar 4" />
                    </label>
                    <label className={formStyle.avatarLabel}>
                      <input
                        type="radio"
                        name="avatar"
                        value="avatar5.jpg"
                        checked={selectedAvatar === 'avatar5.jpg'}
                        onChange={handleAvatarChange}
                      />
                      <img src="/images/avatar5.jpg" alt="Avatar 5" />
                    </label>
                   </div>
                  <button className={accountStyles.CFAButton} type="submit">
                    Update User Information
                  </button>
                  {errors.form && <p className={accountStyles.error}>{errors.form}</p>}
                </div>
              </form>
            </div> 
            
           
           

          </div>
        )}
 <UpdatePassword/>
 <DeleteAccountButton/>
 <UserPosts/>
 <UserComments/>
    </div>
    </div>
    </main>
  );
};


export default Account;


{/**
// components/UserProfile.tsx
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';


//Styles
import accountStyles from '../styles/pages/account.module.scss';
import formStyle from '../styles/pages/forms.module.scss';


interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  pronounce: string;
  Image: string;
}

interface Errors {
  firstName?: string;
  lastName?: string;
  age?: string;
  gender?: string;
  pronounce?: string;
  email?: string;
  form?: string;
}

const Account = () => {
  const [user, setUser] = useState<User | null>(null); // Specify the type for user
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const [formData, setFormData] = useState({
    fName: '',
    lName: '',
    age: '',
    gender: '',
    pronounce: '',
    email: '',
    avatar: '', // Image field
  });

  const [selectedAvatar, setSelectedAvatar] = useState<string>('');

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/fetchUser'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data: User = await response.json();
        setUser(data);
        setFormData({
          fName: data.firstName,
          lName: data.lastName,
          age: data.age.toString(),
          gender: data.gender,
          pronounce: data.pronounce,
          email: data.email,
          avatar: data.Image,
        });
        setSelectedAvatar(data.Image);
      } catch (error: unknown) {
        if (error instanceof Error)
          setError(error.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  //Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //Handle avatar selected and change
  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const avatar = e.target.value;
    setSelectedAvatar(avatar);
    setFormData({
      ...formData,
      avatar,
    });
  };

  // Function to handle updating the user
  const handleUpdateUser = async () => {
    // Validate form data (implement your validation logic)
    const validationErrors = {}; // Assume no validation errors
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log('Submitting form data', formData);

    //Send form data to server
    try {
      const response = await fetch('/api/updateUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful update
        console.log('User updated successfully');
        setShowModal(false);
      } else {
        throw new Error('Failed to update user');
      }
    } catch (error) {
      console.log('Error updating user:', error);
      setErrors({ ...errors, form: 'An unexpected error occurred. Please try again' });
    }
  };

  //Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleUpdateUser();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user data available</div>;

  return (
    <main>
      <div className={accountStyles.parent}> 
         <h1 className={accountStyles.h1}>User Profile</h1>
        <div className={accountStyles.section1}>
            <div>
              <img className={accountStyles.s1Image} src={`/images/${user.Image}`} alt="Profile" />
            </div>
            <div className={accountStyles.Child2}>
            <p className={accountStyles.p}><strong className={accountStyles.strong}>ID:</strong> {user.id}</p>
            <p className={accountStyles.p}><strong className={accountStyles.strong}>Email:</strong> {user.email}</p>
            <p className={accountStyles.p}><strong className={accountStyles.strong}>First Name:</strong> {user.firstName}</p>
            <p className={accountStyles.p}><strong className={accountStyles.strong}>Last Name:</strong> {user.lastName}</p>
            <p className={accountStyles.p}><strong className={accountStyles.strong}>Age:</strong> {user.age}</p>
            <p className={accountStyles.p}><strong className={accountStyles.strong}>Gender:</strong> {user.gender}</p>
            <p className={accountStyles.p}><strong className={accountStyles.strong}>Pronouns:</strong> {user.pronounce}</p>
            <button
             className={accountStyles.CFAButton}
             onClick={() => setShowModal(true)}>
              Update user
            </button>
          </div>
        </div>

        {showModal && (
          <div className={accountStyles.modal}>
            <div className={accountStyles.modalContent}>
              <button
                className={accountStyles.closeButton}
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
              <form onSubmit={handleSubmit}> 
                <div className={accountStyles.fetchArea2}>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={user.firstName}
                    onChange={(e) =>
                      setUser({ ...user, firstName: e.target.value })
                    }
                    placeholder="First Name"
                  />
                  <br />
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={user.lastName}
                    onChange={(e) =>
                      setUser({ ...user, lastName: e.target.value })
                    }
                    placeholder="Last Name"
                  />
                  <br />
                  <input
                    type="number"
                    name="age"
                    id="age"
                    value={user.age}
                    onChange={(e) =>
                      setUser({ ...user, age: parseInt(e.target.value, 10) })
                    }
                    placeholder="Age"
                  />
                  <br />
                  <select
                    name="gender"
                    id="gender"
                    value={user.gender}
                    onChange={(e) =>
                      setUser({ ...user, gender: e.target.value })
                    }
                    className={accountStyles.select2}
                  >
                    <option value="">Gender</option>
                    <option value="Cis Woman">Cis Woman</option>
                    <option value="Transgender (MF)">Transgender (MF)</option>
                    <option value="Transgender (FM)">Transgender (FM)</option>
                    <option value="Queer">Queer</option>
                    <option value="Non binary">Non binary</option>
                    <option value="Other">Other</option>
                  </select>
                  <select
                    name="pronounce"
                    id="pronounce"
                    value={user.pronounce}
                    onChange={(e) =>
                      setUser({ ...user, pronounce: e.target.value })
                    }
                    className={accountStyles.select2}
                  >
                    <option value="">Pronounce</option>
                    <option value="She/Her">She/Her</option>
                    <option value="He/Him">He/Him</option>
                    <option value="They/Them">They/Them</option>
                    <option value="Zir/Zer">Zir/Zer</option>
                  </select>
                  <br />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    placeholder="Email"
                  />
                  <br />

                  <label className={accountStyles.avatarP} htmlFor="avatar">
                    Choose an Avatar
                  </label>
                  <br />
                  <div className={formStyle.avatarDiv}>
                    <label className={formStyle.avatarLabel}>
                      <input
                        type="radio"
                        name="avatar"
                        value="avatar1.jpg"
                        checked={selectedAvatar === 'avatar1.jpg'}
                        onChange={handleAvatarChange}
                      />
                      <img src="/images/avatar1.jpg" alt="Avatar 1" />
                    </label>
                    <label className={formStyle.avatarLabel}>
                      <input
                        type="radio"
                        name="avatar"
                        value="avatar2.jpg"
                        checked={selectedAvatar === 'avatar2.jpg'}
                        onChange={handleAvatarChange}
                      />
                      <img src="/images/avatar2.jpg" alt="Avatar 2" />
                    </label>
                    <label className={formStyle.avatarLabel}>
                      <input
                        type="radio"
                        name="avatar"
                        value="avatar3.jpg"
                        checked={selectedAvatar === 'avatar3.jpg'}
                        onChange={handleAvatarChange}
                      />
                      <img src="/images/avatar3.jpg" alt="Avatar 3" />
                    </label>
                    <label className={formStyle.avatarLabel}>
                      <input
                        type="radio"
                        name="avatar"
                        value="avatar4.jpg"
                        checked={selectedAvatar === 'avatar4.jpg'}
                        onChange={handleAvatarChange}
                      />
                      <img src="/images/avatar4.jpg" alt="Avatar 4" />
                    </label>
                    <label className={formStyle.avatarLabel}>
                      <input
                        type="radio"
                        name="avatar"
                        value="avatar5.jpg"
                        checked={selectedAvatar === 'avatar5.jpg'}
                        onChange={handleAvatarChange}
                      />
                      <img src="/images/avatar5.jpg" alt="Avatar 5" />
                    </label>
                   </div>
                  <button className={accountStyles.CFAButton} type="submit">
                    Update User Information
                  </button>
                  {errors.form && <p className={accountStyles.error}>{errors.form}</p>}
                </div>
              </form>
            </div>
          </div>
        )}

    </div>
    </main>
  );
};


export default Account;
*/}



