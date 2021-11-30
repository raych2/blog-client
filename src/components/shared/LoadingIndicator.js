import styled from 'styled-components';
import Spinner from 'react-spinkit';

const SpinnerContainer = styled.div`
  margin-top: 200px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

const LoadingIndicator = () => {
  return (
    <SpinnerContainer>
      <Spinner name="ball-spin-fade-loader" color="#FCA311" />
    </SpinnerContainer>
  );
};

export default LoadingIndicator;
