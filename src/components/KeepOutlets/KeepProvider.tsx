import type { Dispatch, FC, ReactNode, SetStateAction } from "react";

import { createContext, useState } from "react";

export type ContextType = {
  drop: (path: string) => void;
  clear: () => void;
};

interface IKeepCtx {
  contextStore: ContextType;
  setContextStore?: Dispatch<SetStateAction<ContextType>>;
}

const INIT_CONTEXT_STATE: ContextType = {
  drop: () => undefined,
  clear: () => undefined,
};

export const keepContext = createContext<IKeepCtx>({
  contextStore: INIT_CONTEXT_STATE,
});

const { Provider } = keepContext;

type Props = {
  children: string | JSX.Element | JSX.Element[] 
}

const KeepProvider:FC<Props> = (props) => {

  const [contextStore, setContextStore] = useState<ContextType>(INIT_CONTEXT_STATE);

  return (
    <Provider
      value={{
        contextStore,
        setContextStore,
      }}
    >
      {props.children}
    </Provider>
  );
};

export default KeepProvider;
