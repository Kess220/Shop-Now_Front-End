import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiExit } from "react-icons/bi";
import { RiShoppingCartLine } from "react-icons/ri";
import { BsInfoCircle } from "react-icons/bs";
import { IoMdCreate } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "/store.png";

export default function UserProfile() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [originalName, setOriginalName] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");
  const [originalProfileImage, setOriginalProfileImage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [logoClicked, setLogoClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleLogoClick = () => {
    setShowOptions(!showOptions);
    setLogoClicked(!logoClicked);
  };

  const handleOutsideClick = () => {
    if (showOptions) {
      setShowOptions(false);
      setLogoClicked(false);
    }
  };

  const profileImageUrl = "https://example.com/default-profile-image.jpg"; // Defina a URL da imagem padrão

  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}profile/${userId}`,
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );
        const { username, email, image } = response.data;
        setUserName(username);
        setEmail(email);
        setProfileImage(image);
        setOriginalName(username);
        setOriginalEmail(email);
        setOriginalProfileImage(image);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      if (!userName || !email) {
        throw new Error("Name and email cannot be empty");
      }

      if (userName !== originalName) {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}profile/update-name/${userId}`,
          { newName: userName },
          { headers: { Authorization: localStorage.getItem("token") } }
        );
        console.log("Name updated:", response.data);
      }

      if (email !== originalEmail) {
        const emailResponse = await axios.put(
          `${import.meta.env.VITE_API_URL}profile/update-email/${userId}`,
          { newEmail: email },
          { headers: { Authorization: localStorage.getItem("token") } }
        );
        console.log("Email updated:", emailResponse.data);
      }

      if (profileImage !== originalProfileImage) {
        const imageResponse = await axios.put(
          `${import.meta.env.VITE_API_URL}profile/update-image/${userId}`,
          { newImage: profileImage },
          { headers: { Authorization: localStorage.getItem("token") } }
        );
        console.log("Image updated:", imageResponse.data);
      }

      setIsEditing(false);
      setOriginalName(userName);
      setOriginalEmail(email);
      setOriginalProfileImage(profileImage);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setUserName(originalName);
    setEmail(originalEmail);
  };

  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleProfileImageChange = (event) => {
    setProfileImage(event.target.value);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <HomeContainer>
      <Header>
        <h1>Show Now</h1>
        <LogoContainer onClick={handleLogoClick} logoClicked={logoClicked}>
          <LogoImage src={Logo} alt="Logo" />
        </LogoContainer>
      </Header>

      <CardContainer>
        <AvatarContainer
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          isHovered={isHovered}
          onClick={handleEditClick}
        >
          <AvatarImage src={profileImage} alt="Profile" />
          <EditIconContainer isHovered={isHovered}>
            <EditIcon>
              <IoMdCreate />
            </EditIcon>
          </EditIconContainer>
        </AvatarContainer>
        <ProfileInfo>
          <Name>{userName}</Name>
          <Email>{email}</Email>
          {isEditing ? (
            <>
              <Input
                type="text"
                value={userName}
                onChange={handleNameChange}
                placeholder="Enter your name"
              />
              <Input
                type="text"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
              />
              <Input
                type="text"
                value={profileImage}
                onChange={handleProfileImageChange}
                placeholder="Enter image URL"
              />
            </>
          ) : (
            <>
              <Button onClick={handleEditClick}>Edit</Button>
            </>
          )}
          {isEditing && (
            <ButtonGroup>
              <SaveButton onClick={handleSaveClick}>Save</SaveButton>
              <CancelButton onClick={handleCancelClick}>Cancel</CancelButton>
            </ButtonGroup>
          )}
        </ProfileInfo>
      </CardContainer>

      {showOptions && <Overlay onClick={handleOutsideClick} />}

      <OptionsContainer show={showOptions}>
        <ProfileContainer style={{ marginBottom: "16px" }}>
          <ProfileImageContainer>
            <Link to="/home">
              <ProfileImage src={profileImage} alt="Profile" />
            </Link>
          </ProfileImageContainer>
        </ProfileContainer>
        <OptionIconContainer>
          <Link to="/cart">
            <OptionIcon>
              <RiShoppingCartLine />
            </OptionIcon>
          </Link>
        </OptionIconContainer>

        <OptionIconContainer onClick={handleLogout}>
          <OptionIcon>
            <BiExit />
          </OptionIcon>
        </OptionIconContainer>
        <OptionIconContainer>
          <OptionIcon>
            <BsInfoCircle />
          </OptionIcon>
        </OptionIconContainer>
      </OptionsContainer>
    </HomeContainer>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 2;
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
  overflow: auto;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.795);
    opacity: ${(props) => (props.showOptions ? 1 : 0)};
    pointer-events: ${(props) => (props.showOptions ? "auto" : "none")};
    transition: opacity 0.3s ease;
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`;

const LogoContainer = styled.div`
  cursor: pointer;
  transform: ${(props) => (props.logoClicked ? "scale(1.1)" : "none")};
  transition: transform 0.3s ease;

  &:active {
    transform: scale(1.2);
  }
`;

const LogoImage = styled.img`
  width: 80px;
  height: 80px;
  &:hover {
    transform: scale(1.1);
  }
`;

const OptionsContainer = styled.div`
  position: fixed;
  top: 0;
  left: ${(props) => (props.show ? "0" : "-100%")};
  height: 100vh;
  width: 60px;
  background-color: #432682;
  border-radius: 0 4px 4px 0;
  padding: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: left 0.3s ease, background-color 0.3s ease;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OptionIconContainer = styled.div`
  margin-bottom: 26px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const OptionIcon = styled.span`
  color: white;
  font-size: 24px;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const AvatarContainer = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 20px;
  opacity: ${(props) => (props.isHovered ? 0.8 : 1)};
  transition: opacity 0.3s ease;
  cursor: pointer;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const EditIconContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  cursor: pointer;
  opacity: ${(props) => (props.isHovered ? 1 : 0)};
  transition: opacity 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 1);
  }
`;

const EditIcon = styled.span`
  color: #000;
  font-size: 18px;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Name = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Email = styled.p`
  font-size: 16px;
  color: #888;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 200px;
  height: 32px;
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 10px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SaveButton = styled(Button)`
  background-color: #28a745;
  margin-right: 10px;
`;

const CancelButton = styled(Button)`
  background-color: #dc3545;
`;

const ProfileImageContainer = styled.div`
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 50%;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
