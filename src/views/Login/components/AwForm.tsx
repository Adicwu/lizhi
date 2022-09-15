import React, { ReactNode, useCallback, useMemo, useRef } from "react";

type Keyword = string;
type RulesMap = Map<AwFormRule["keyword"], Omit<AwFormRule, "keyword">>;

export interface AwFormRule {
  keyword: Keyword;
  reg: RegExp;
  errorMsg?: string;
}

export const FormCtx = React.createContext<{
  check: (keyword: Keyword, v: string) => void;
  readonly rulesMap: RulesMap;
} | null>(null);

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
      props.rules.reduce<RulesMap>((totol, item) => {
        totol.set(item.keyword, {
          reg: item.reg,
          errorMsg: item.errorMsg,
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
  const provide = useMemo(
    () => ({
      check,
      rulesMap,
    }),
    []
  );

  return <FormCtx.Provider value={provide}>{props.children}</FormCtx.Provider>;
};

export default React.memo(AwForm, () => true);
