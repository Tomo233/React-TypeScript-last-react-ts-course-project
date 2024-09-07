import { createContext, ReactNode, useContext, useReducer } from "react";

type Session = {
  id: string;
  title: string;
  summary: string;
  date: string;
};

type SessionsState = {
  upcomingSessions: Session[];
};

type SessionContextType = {
  bookSession: (session: Session) => void;
  cancelSession: (sessionId: string) => void;
} & SessionsState;

type BookSessionAction = {
  type: "BOOK_SESSION";
  session: Session;
};
type CancelSessionAction = {
  type: "CANCEL_SESSION";
  sessionId: string;
};

type SessionActions = BookSessionAction | CancelSessionAction;

const SessionContext = createContext<SessionContextType | null>(null);

const initialState: SessionsState = {
  upcomingSessions: [],
};

const reducer = (state: SessionsState, action: SessionActions) => {
  switch (action.type) {
    case "BOOK_SESSION":
      return {
        ...state,
        upcomingSessions: [...state.upcomingSessions, action.session],
      };

    case "CANCEL_SESSION":
      return {
        ...state,
        upcomingSessions: state.upcomingSessions.filter(
          (session) => session.id !== action.sessionId
        ),
      };

    default:
      return state;
  }
};

function SessionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const bookSession = (session: Session) => {
    dispatch({ type: "BOOK_SESSION", session });
  };

  const cancelSession = (sessionId: string) => {
    dispatch({ type: "CANCEL_SESSION", sessionId });
  };

  const ctx: SessionContextType = {
    upcomingSessions: state.upcomingSessions,
    bookSession,
    cancelSession,
  };

  return (
    <SessionContext.Provider value={ctx}>{children}</SessionContext.Provider>
  );
}

export default SessionProvider;

export function useSessionContext() {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error(
      "useSessionsContext must be used within a SessionsContextProvider"
    );
  }
  return context;
}
