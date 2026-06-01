import type { AnswerType } from '../../game/answerValidation';

type AnswerInputProps = {
  value: string;
  answerType?: AnswerType;
  disabled?: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export function AnswerInput({ value, answerType = 'number', disabled = false, onChange, onSubmit }: AnswerInputProps) {
  const inputMode = answerType === 'number' ? 'decimal' : 'text';
  return (
    <div className="answer-input-wrap">
      <input
        className="answer-input"
        value={value}
        disabled={disabled}
        inputMode={inputMode}
        placeholder={answerType === 'comparison' ? '>, < или =' : 'Введи ответ'}
        onChange={(event: any) => onChange(event.target.value)}
        onKeyDown={(event: any) => {
          if (event.key === 'Enter') {
            onSubmit();
          }
        }}
      />
    </div>
  );
}
