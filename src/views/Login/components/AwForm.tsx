import React, {
  ReactNode,
  useCallback,
  useMemo,
  useRef
} from "react";

export const FormCtx = React.createContext<{
  check: (keyword: Keyword, v: string) => void;
} | null>(null);

type Keyword = string;

export interface AwFormRule {
  keyword: Keyword;
  reg: RegExp;
}

const AwForm = (props: {
  rules: AwFormRule[];
  onCheck?: (e: boolean) => void;
  children?: ReactNode;
}) => {
  const resultTemp = useMemo(
    () =>
      props.rules.reduce<Record<string, boolean>>((totol, item) => {
        totol[item.keyword] = false;
        return totol;
      }, {}),
    [props.rules]
  );
  const rulesMap = useMemo(
    () =>
      props.rules.reduce<
        Map<
          AwFormRule["keyword"],
          {
            reg: AwFormRule["reg"];
          }
        >
      >((totol, item) => {
        totol.set(item.keyword, {
          reg: item.reg,
        });
        return totol;
      }, new Map()),
    [props.rules]
  );
  const result = useRef(resultTemp);
  const check = useCallback(
    (keyword: Keyword, v: string) => {
      if (!props.onCheck || typeof result.current[keyword] === "undefined")
        return;
      const rule = rulesMap.get(keyword);
      if (!rule) return;

      result.current[keyword] = rule.reg.test(v);
      const isAllPass = Object.values(result.current).every((item) => item);
      props.onCheck!(isAllPass);
    },
    [props.onCheck, result]
  );
  return (
    <FormCtx.Provider value={{ check }}>{props.children}</FormCtx.Provider>
  );
};

export default React.memo(AwForm, () => true);
