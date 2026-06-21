import { buyerService } from './service';
import { buyerMockService } from './mockService';

const useMock = import.meta.env.VITE_USE_MOCK !== 'false';

export const svc = useMock ? buyerMockService : buyerService;
