import { useNavigate } from 'react-router-dom';
import RecordListView from '@/features/ai/components/RecordListView';

function SavedPage() {
  const navigate = useNavigate();

  const handleItemOpen = (tab, item) => {
    if (tab === 'interview') {
      navigate('/ai/interview/result', { state: { sessionId: item.id } });
    }
  };

  return <RecordListView title="저장 목록" type="saved" onItemOpen={handleItemOpen} />;
}

export default SavedPage;
