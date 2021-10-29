import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Navbar = styled.nav`
  height: 10vh;
  display: flex;
  align-items: center;
  background-color: #14213d;
`;
const NavLink = styled(Link)`
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  color: #ffffff;
`;
const Title = styled.div`
  margin: 1rem;
  font-size: 2em;
  font-weight: 400;
  color: #ffffff;
`;

const Header = () => {
  return (
    <Navbar>
      <NavLink to="/">
        <Title>TOP Blog</Title>
      </NavLink>
    </Navbar>
  );
};

export default Header;
