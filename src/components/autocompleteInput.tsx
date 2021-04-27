import { useEffect, useState } from 'react';
import { fruitList } from '../constants/words';

const AutocompleteInput = () => {
  const [results, setResults] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  useEffect(() => {
    if (inputValue) {
      const newResults = fruitList.filter((item) => item.toLowerCase().startsWith(inputValue.toLowerCase())) || [];
      setResults(newResults);
      return;
    }
    setResults([]);
  }, [inputValue])

  const handleElementSelection = (event: any) => {
    event.preventDefault();
    const text = event.target.textContent;
    setInputValue(text);
  };

  return (
    <div>
      <label>Search:
        <input data-testid='input' onInput={handleInput} value={inputValue} />
      </label>

      <ol>
        {results && results.map((item, index) => (
          <li key={index} onClick={handleElementSelection}>{item}</li>
        ))}
      </ol>
    </div>
  );
};

export default AutocompleteInput;