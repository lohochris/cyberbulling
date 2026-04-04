import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserSession } from '../types';

interface AppState extends UserSession {
  // Actions
  addChatMessage: (message: { role: 'user' | 'billy'; content: string }) => void;
  clearChatHistory: () => void;
  completeModule: (moduleId: string) => void;
  updateResilienceScore: (score: number) => void;
  toggleSavedResource: (resourceId: string) => void;
  resetProgress: () => void;
}

const initialState: UserSession = {
  shieldProgress: {
    modulesCompleted: [],
    resilienceScore: 5,
    lastAssessment: Date.now(),
  },
  billyChatHistory: [],
  savedResources: [],
};

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      ...initialState,

      addChatMessage: (message) =>
        set((state) => ({
          billyChatHistory: [
            ...state.billyChatHistory,
            {
              id: `msg-${Date.now()}-${Math.random()}`,
              ...message,
              timestamp: Date.now(),
            },
          ],
        })),

      clearChatHistory: () =>
        set(() => ({
          billyChatHistory: [],
        })),

      completeModule: (moduleId) =>
        set((state) => ({
          shieldProgress: {
            ...state.shieldProgress,
            modulesCompleted: state.shieldProgress.modulesCompleted.includes(moduleId)
              ? state.shieldProgress.modulesCompleted
              : [...state.shieldProgress.modulesCompleted, moduleId],
          },
        })),

      updateResilienceScore: (score) =>
        set((state) => ({
          shieldProgress: {
            ...state.shieldProgress,
            resilienceScore: score,
            lastAssessment: Date.now(),
          },
        })),

      toggleSavedResource: (resourceId) =>
        set((state) => ({
          savedResources: state.savedResources.includes(resourceId)
            ? state.savedResources.filter((id) => id !== resourceId)
            : [...state.savedResources, resourceId],
        })),

      resetProgress: () => set(initialState),
    }),
    {
      name: 'cyberbullying-awareness-storage',
    }
  )
);
