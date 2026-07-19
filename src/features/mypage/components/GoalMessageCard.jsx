import styled from 'styled-components';

function GoalMessageCard({ message }) {
  return (
    <Section>
      <SectionTitle>동기부여 문구</SectionTitle>
      <Card>
        <Message>{message}</Message>
      </Card>
    </Section>
  );
}

const Section = styled.section``;

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const Card = styled.div`
  min-height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(6)};
  background: ${({ theme }) => theme.colors.gray100};
  border-radius: ${({ theme }) => theme.radius.lg};
`;

const Message = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  line-height: 1.6;
`;

export default GoalMessageCard;
