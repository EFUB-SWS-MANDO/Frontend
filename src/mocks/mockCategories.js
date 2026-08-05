import { POST_CATEGORIES } from '@/constants/postCategories';

export const MOCK_CATEGORIES = POST_CATEGORIES.map(({ code, label }) => ({
  id: code,
  name: label,
}));
