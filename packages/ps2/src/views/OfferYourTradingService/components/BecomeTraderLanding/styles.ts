import styled from 'styled-components';
import { isMobile, isTablet } from '../../../../util/css';

export const Layout = styled.div`
  padding-top: 120px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 42px;
  padding: 0 42px;
  text-align: center;
`;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 42px;

  ${isTablet(`
    grid-template-columns: 1fr 0.8fr;
    gap: 0px;
  `)}

  ${isMobile(`
    grid-template-columns: 1fr;
    flex-direction: column-reverse;
    gap: 0px;
  `)}
`;

export const Side = styled.div`
  padding: 28px 0;

  ${isMobile(`
    padding: 14px 0;
  `)}
`;

export const SideImage = styled(Side)`
  background: url('/images/service-provider/main-graphic.png') center center
    no-repeat;
  background-size: contain;
`;

export const WrapperList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 22px 16px;
`;

export const WrapperItem = styled.li`
  list-style-type: disc;
`;

export const Margin = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
`;

export const WrapperAction = styled.div`
  margin-top: 22px;
`;

export const InfoBar = styled.div`
  padding: 28px 0;
  margin-bottom: 28px;
  background: #12142b;
`;

export const InfoBarList = styled.ul<{ itemsLength: number }>`
  display: grid;
  align-items: center;
  justify-content: center;
  padding: 28px 0;
  width: 100%;

  ${({ itemsLength }) => `
    grid-template-columns: repeat(${itemsLength}, minmax(0%, 100%));  
  `}

  ${isMobile(`
    grid-template-columns: repeat(1, minmax(0%, 100%));
    gap: 42px;
    padding: 18px 0;
  `)}
`;

export const InfoBarListItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Sections = styled.div`
  display: flex;
  gap: 42px;
  flex-direction: column;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 44px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
`;

export const FeaturesList = styled.ul<{ itemsLength: number }>`
  display: grid;
  padding: 42px 0;
  gap: 52px;

  ${({ itemsLength }) => `
    grid-template-columns: repeat(${itemsLength}, minmax(0%, 100%));
  `}

  ${isMobile(`
      grid-template-columns: repeat(1, minmax(0%, 100%));
  `)}

  ${isTablet(`
      grid-template-columns: repeat(2, minmax(0%, 100%));
  `)}
`;

export const Feature = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 26px;
`;

export const FeatureImage = styled.img`
  width: 80px;
  height: 80px;
`;

export const FeatureData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StepList = styled.ul<{ itemsLength: number }>`
  display: flex;
  padding: 22px 0;

  ${isMobile(`
    flex-direction: column;
  `)}

  overflow: hidden;
`;

export const Step = styled.li`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px;
  background-color: #181b30;
  border-radius: 4px;
  width: 100%;
`;

export const StepImage = styled.img`
  margin: 24px 0;
  width: 100%;
  object-fit: contain;
  height: 120px;
`;

export const Separator = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 14px;

  ${isMobile(`
    transform: rotate(90deg);
    padding: 14px 0;
  `)}
`;

export const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
