import styled from '@emotion/styled';
export const ContainerBox = styled.div`
  position: relative;
  top: 90px;
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-bottom: 80px;
  text-align: justify;
`;

export const HowItWorksList = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  @media (max-width: 800px) {
    flex-wrap: wrap;
  }
`;

export const BulletPointItem = styled.li`
  max-width: 600px;
  margin-right: 25px;
`;
