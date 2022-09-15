import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import "./aw-input.less";
import { FormCtx } from "./AwForm";

export interface AwInputExport {
  getValue(): string;
}

/** input原生属性 */
interface InputProps {
  defaultValue?: string;
  placeholder: string;
  type: React.HTMLInputTypeAttribute;
  maxLength: number;
  onChange?: (e: string) => void;
}

const AwInput = React.forwardRef<
  AwInputExport,
  InputProps & {
    icon?: ReactNode;
    keyword: string;
  }
>((props, ref) => {
  const inputEl = useRef<HTMLInputElement>(null);
  const injectCtx = useContext(FormCtx);
  const rule = useMemo(() => injectCtx?.rulesMap.get(props.keyword), []);
  const [errorMsg, setErrorMsg] = useState("");

  const onChange = useCallback((v: string) => {
    injectCtx?.check(props.keyword, v);
  }, []);
  const onBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement, Element>) => {
      if (!rule) return;
      const error = rule.reg.test(e.target.value);
      setErrorMsg(!error ? rule.errorMsg! : "");
    },
    []
  );

  useEffect(() => {
    injectCtx?.check(props.keyword, inputEl.current?.value || "");
  }, []);

  useImperativeHandle(ref, () => ({
    getValue() {
      return inputEl.current!.value;
    },
  }));

  return (
    <div className={["aw-input", errorMsg ? "error" : ""].join(" ")}>
      <div className="aw-input__icon">{props.icon}</div>
      <input
        className="aw-input__control"
        type={props.type}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        ref={inputEl}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        maxLength={props.maxLength}
      />
      <div
        className="aw-input__error"
        style={{
          opacity: errorMsg ? 1 : 0,
        }}
      >
        {errorMsg}
      </div>
    </div>
  );
});

export default React.memo(AwInput, () => true);
