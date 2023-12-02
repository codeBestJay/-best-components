import React from "react";
import { useOutlet } from "react-router-dom";
import { Freeze } from "react-freeze";
import { keepContext } from "./KeepProvider";

function useForcedUpdate(): [() => void, number] {
  const [key, setKey] = React.useState(Math.random);
  const forceUpdate = React.useCallback(() => setKey(Math.random), []);
  return [forceUpdate, key];
}

interface IKeepProps {
  includes?: string[];
  max?: number;
}

export function useKeepControl() {
  return React.useContext(keepContext).contextStore;
}

export function useKeepOutlets({ includes = [], max = Infinity }: IKeepProps = {}) {
  const { contextStore, setContextStore } = React.useContext(keepContext);
  const [forcedUpdate] = useForcedUpdate();
  const keepOutlets = React.useRef<any>({});
  const outletRenderKeys = React.useRef<any>({});
  const currentElement = useOutlet();
  const matchedPath = currentElement?.props?.children?.props?.match?.pathname;
  if (matchedPath) {
    keepOutlets.current[matchedPath] = currentElement;
    outletRenderKeys.current[matchedPath] = outletRenderKeys.current[matchedPath] ?? Math.random();
  }

  const drop = React.useCallback((path: string) => {
    delete keepOutlets.current[path];
    outletRenderKeys.current[path] = Math.random();
    if (typeof contextStore?.drop === "function") {
      contextStore?.drop(path);
    }

    forcedUpdate();
  }, []);

  const clear = React.useCallback(() => {
    keepOutlets.current = {};
    outletRenderKeys.current = {};
    if (typeof contextStore?.clear === "function") {
      contextStore?.clear;
    }
    forcedUpdate();
  }, []);

  React.useEffect(() => {
    if (!includes.includes(matchedPath)) {
      return () => drop(matchedPath);
    }
    setContextStore && setContextStore({ ...{ drop, clear } });
  }, [matchedPath]);

  const renderConfigs = Object.entries(keepOutlets.current).slice(-1 * max); // 限制最大渲染数

  keepOutlets.current = {}; // 先清空，目的是应用最大渲染数

  return (
    <>
      {renderConfigs.map(([pathname, element]: any) => {
        keepOutlets.current[pathname] = element; // 恢复幸存内容

        const outletRenderKey = outletRenderKeys.current[pathname];
        const isMatch = currentElement === element;
        return (
          <Freeze key={outletRenderKey} freeze={!isMatch}>
            {element}
          </Freeze>
        );
      })}
    </>
  );
}

export default function KeepOutlets(props: IKeepProps) {
  return <>{useKeepOutlets(props)}</>;
}
