import { useNavigate } from 'react-router-dom';
import RecordListView from '@/features/ai/components/RecordListView';

function HistoryPage() {
  const navigate = useNavigate();

  const handleItemOpen = (tab, item) => {
    if (tab === 'interview') {
      navigate('/ai/interview/result', { state: { sessionId: item.id } });
    }
  };

  return <RecordListView title="과거 기록" type="history" onItemOpen={handleItemOpen} />;
}

export default HistoryPage;
