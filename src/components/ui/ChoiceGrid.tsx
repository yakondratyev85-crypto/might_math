type ChoiceGridProps = {
  options: Array<string | number>;
  disabled?: boolean;
  onChoose: (value: string | number) => void;
};

export function ChoiceGrid({ options, disabled = false, onChoose }: ChoiceGridProps) {
  return (
    <div className="choice-grid">
      {options.map((option) => (
        <button className="choice-button" type="button" disabled={disabled} key={String(option)} onClick={() => onChoose(option)}>
          {option}
        </button>
      ))}
    </div>
  );
}
