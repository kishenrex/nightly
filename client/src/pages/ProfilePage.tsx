import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

type ProfileField = {
  label: string;
  value: string;
  type?: string;
  masked?: boolean;
};

const ProfilePage: React.FC = () => {
  const [profileFields, setProfileFields] = useState<ProfileField[]>([
    { label: 'Display Name', value: 'johnsmith123' },
    { label: 'Username', value: 'JohnMachine222' },
    { label: 'Password', value: 'mySecurePassword123', type: 'password', masked: true },
    { label: 'Email', value: 'johnnyappleseed@nightly.com' },
    { label: 'Phone Number', value: '1112223333' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number>(-1);
  const [editValue, setEditValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditValue(profileFields[index].value);
    setShowModal(true);
  };

  const handleSave = () => {
    if (editValue.trim()) {
      setProfileFields(prev => prev.map((field, index) => 
        index === editingIndex ? { ...field, value: editValue } : field
      ));
      setShowModal(false);
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

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#553C9A', 
      padding: '2rem'
    }}>
      {/* White Background Container */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '2rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Header with Home Button */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: '2rem',
          alignItems: 'center'
        }}>
          <h1 style={{ 
            color: 'black', 
            fontSize: '2rem', 
            margin: 0 
          }}>
            Profile
          </h1>
          <Link to="/calendar">
            <Button 
              variant="dark" 
              style={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                border: 'none',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <i className="bi bi-house-fill" style={{ fontSize: '1.5rem' }}></i>
            </Button>
          </Link>
        </div>

        {/* Main Content */}
        <div style={{ 
          display: 'flex', 
          gap: '2rem',
          alignItems: 'flex-start'
        }}>
          {/* Profile Fields */}
          <div style={{ flex: '1' }}>
            {profileFields.map((field, index) => renderField(field, index))}
          </div>

          {/* Avatar Section */}
          <div style={{ 
            width: '300px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <h2 style={{ 
              color: 'black',
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
                  <i className="bi bi-person-fill" style={{ 
                    fontSize: '60px',
                    color: '#A0A0A0'
                  }}></i>
                </div>
              </div>
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
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
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