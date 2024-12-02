import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import HomeButton from '../components/HomeButton';
import { UserAvatar } from '../components/UserAvatar';
import { ThemeContext } from '../context/ThemeContext';
import { AvatarContext } from '../context/AvatarContext';

type ProfileField = {
  label: string;
  value: string;
  type?: string;
  masked?: boolean;
  key: 'username' | 'password' | 'email';
};

type User = {
  email: string;
  username: string;
  avatar: string | null;
  currentStreak: number;
  maxStreak: number;
};

const API_BASE_URL = 'http://localhost:3001';

const ProfilePage: React.FC = () => {
  const tempUser: User = {
    email: "johnnyappleseed@nightly.com",
    username: "temp",
    avatar: null,
    currentStreak: 0,
    maxStreak: 0
  };

  const initialFields: ProfileField[] = [
    { label: 'Username', value: tempUser.username, key: 'username' },
    { label: 'Password', value: '••••••••••••••', type: 'password', masked: true, key: 'password' },
    { label: 'Email', value: tempUser.email, key: 'email' }
  ];

  const [user, setUser] = useState<User>(tempUser);
  const [profileFields, setProfileFields] = useState<ProfileField[]>(initialFields);
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number>(-1);
  const [editValue, setEditValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const {theme} = useContext(ThemeContext);
  const {avatar} = useContext(AvatarContext);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        setIsLoading(true);
        setError(null);

        console.log('Attempting to fetch user data...');
        const response = await fetch(`${API_BASE_URL}/users/testuser@example.com`);
        console.log(response);
        console.log('Response status:', response.status);
        const responseText = await response.text();
        console.log('Response text:', responseText);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}, body: ${responseText}`);
        }

        const responseData = JSON.parse(responseText);
        console.log('Parsed response data:', responseData);

        const userData = responseData.data;
        if (!userData) {
          throw new Error('No user data received in response');
        }

        console.log('User data:', userData);

        const defaultUser = {
          email: userData.email,
          username: userData.username,
          avatar: userData.avatar,
          currentStreak: userData.current_streak || 0,
          maxStreak: userData.max_streak || 0
        };

        console.log('Setting user state with:', defaultUser);
        setUser(defaultUser);

        setProfileFields([
          { label: 'Username', value: defaultUser.username, key: 'username' },
          { label: 'Password', value: '••••••••••••••', type: 'password', masked: true, key: 'password' },
          { label: 'Email', value: defaultUser.email, key: 'email' }
        ]);
      } catch (err) {
        console.error('Detailed error:', err);
        if (err instanceof Error) {
          setError(`Failed to load user data: ${err.message}`);
        } else {
          setError('Failed to load user data. Please refresh the page.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    initializeUser();
  }, []);

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    const field = profileFields[index];
    setEditValue(field.type === 'password' ? '' : field.value);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!editValue.trim() || editingIndex === -1) return;

    const field = profileFields[editingIndex];
    
    try {
      setError(null);

      const response = await fetch(`${API_BASE_URL}/users/${user.email}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [field.key]: editValue
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update user data');
      }

      // Update local state
      setProfileFields(prev => prev.map((f, index) => 
        index === editingIndex 
          ? { ...f, value: field.type === 'password' ? '••••••••••••••' : editValue }
          : f
      ));

      if (field.key === 'username') {
        setUser(prev => ({ ...prev, username: editValue }));
      }
      setShowModal(false);
    } catch (err) {
      console.error('Update error:', err);
      setError('Failed to update user data. Please try again.');
    }
  };

  const getDisplayValue = (field: ProfileField) => {
    if (field.masked && field.type === 'password' && !showPassword) {
      return '••••••••••••••';
    }
    return field.value;
  };

  const renderField = (field: ProfileField, index: number) => {
    return (
      <div
        key={field.label}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderRadius: '12px',
          padding: '1rem 1.5rem',
          marginBottom: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div style={{ 
          color: 'white', 
          fontSize: '1.25rem',
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center',
          flex: 1
        }}>
          <span>{field.label}:</span>
          <span>{getDisplayValue(field)}</span>
          {field.type === 'password' && (
            <Button
              variant="link"
              onClick={() => setShowPassword(!showPassword)}
              style={{ 
                color: 'white', 
                textDecoration: 'none',
                padding: '0.25rem',
                fontSize: '1.25rem'
              }}
            >
              <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
            </Button>
          )}
        </div>
        <Button
          variant="link"
          onClick={() => handleEdit(index)}
          style={{ 
            color: 'white', 
            textDecoration: 'none',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          Edit <i className="bi bi-pencil"></i>
        </Button>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: theme.background, 
      padding: '2rem'
    }}>
      <div style={{
        backgroundColor: theme.foreground,
        borderRadius: '20px',
        padding: '2rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: '2rem',
          alignItems: 'center'
        }}>
          <h1 style={{ 
            color: theme.fontColor, 
            fontSize: '2rem', 
            margin: 0 
          }}>
            Profile
          </h1>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', color: theme.fontColor }}>
              <span>Current Streak: {user.currentStreak} days</span>
              <span>Max Streak: {user.maxStreak} days</span>
            </div>
            <HomeButton></HomeButton>
          </div>
        </div>

        {error && (
          <Alert variant="danger" className="mb-3" onClose={() => setError(null)} dismissible>
            {error}
          </Alert>
        )}

        <div style={{ 
          display: 'flex', 
          gap: '2rem',
          alignItems: 'flex-start'
        }}>
          <div style={{ flex: '1' }}>
            {profileFields.map((field, index) => renderField(field, index))}
          </div>

          <div style={{ 
            width: '300px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <h2 style={{ 
              color: theme.fontColor,
              marginBottom: '1rem',
              fontSize: '1.5rem'
            }}>
              AVATAR
            </h2>
            <div style={{
              width: '200px',
              height: '200px',
              backgroundColor: '#E5E5E5',
              borderRadius: '50%',
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt="User avatar" 
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
              ) : (
                <div style={{
                  width: '160px',
                  height: '160px',
                  backgroundColor: '#A0A0A0',
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <div style={{
                    width: '120px',
                    height: '120px',
                    backgroundColor: '#4A4A4A',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <UserAvatar></UserAvatar>
                  </div>
                </div>
              )}
              <Link to="/avatars">
                <Button
                  variant="link"
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  <i className="bi bi-pencil"></i>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Edit {editingIndex >= 0 ? profileFields[editingIndex].label : ''}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type={profileFields[editingIndex]?.type || 'text'}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              placeholder={`Enter new ${editingIndex >= 0 ? profileFields[editingIndex].label.toLowerCase() : ''}`}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProfilePage;